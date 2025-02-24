from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os
import assemblyai as aai
from datetime import datetime, timedelta
from ratelimit import limits, sleep_and_retry
from dotenv import load_dotenv
import tempfile
from pytube import YouTube
from flask_migrate import Migrate

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='./client/build', static_url_path='')
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///videoflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Set AssemblyAI API key
aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')

# Download directory
DOWNLOAD_FOLDER = "downloads"
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(100))
    subscription_tier = db.Column(db.String(20), default='free')  # 'free', 'pro', 'enterprise'
    subscription_end_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    downloads = db.relationship('Download', backref='user', lazy=True)
    history = db.relationship('VideoHistory', backref='user', lazy=True)
    stats = db.relationship('UserStats', backref='user', lazy=True)

class Download(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    platform = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class VideoHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(200))
    type = db.Column(db.String(20), nullable=False)  # 'download' or 'transcription'
    status = db.Column(db.String(20), nullable=False)  # 'completed', 'failed', 'processing'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    downloads = db.Column(db.Integer, default=0)
    transcriptions = db.Column(db.Integer, default=0)
    storage = db.Column(db.BigInteger, default=0)  # in bytes
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

# Create tables
with app.app_context():
    db.create_all()

# Rate limiting decorators
@sleep_and_retry
@limits(calls=10, period=60)  # 10 calls per minute for free users
def rate_limit_free():
    pass

@sleep_and_retry
@limits(calls=30, period=60)  # 30 calls per minute for premium users
def rate_limit_premium():
    pass

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "Registration successful"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token}), 200

# Download routes
@app.route('/api/download', methods=['POST'])
@jwt_required()
def download_video():
    current_user_id = get_jwt_identity()
    url = request.json.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
        
    # Check user's download limits
    stats = UserStats.query.filter_by(user_id=current_user_id).first()
    user = User.query.get(current_user_id)
    
    if not stats:
        stats = UserStats(user_id=current_user_id)
        db.session.add(stats)
    
    if user.subscription_tier == 'free' and stats.downloads >= 5:
        return jsonify({'error': 'Daily download limit reached. Please upgrade to Pro.'}), 403
    
    try:
        # Create history entry
        history = VideoHistory(
            user_id=current_user_id,
            url=url,
            type='download',
            status='processing'
        )
        db.session.add(history)
        db.session.commit()
        
        # Download video
        yt = YouTube(url)
        video = yt.streams.get_highest_resolution()
        
        # Update history with video title
        history.title = yt.title
        
        # Download to temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp4')
        video.download(output_path=os.path.dirname(temp_file.name), filename=os.path.basename(temp_file.name))
        
        # Update stats
        stats.downloads += 1
        stats.storage += os.path.getsize(temp_file.name)
        stats.last_updated = datetime.utcnow()
        
        # Update history status
        history.status = 'completed'
        db.session.commit()
        
        # Send file and clean up
        return_data = send_file(temp_file.name, as_attachment=True, download_name=f"{yt.title}.mp4")
        os.unlink(temp_file.name)
        return return_data
        
    except Exception as e:
        if history:
            history.status = 'failed'
            db.session.commit()
        return jsonify({'error': str(e)}), 500

@app.route('/api/transcribe', methods=['POST'])
@jwt_required()
def transcribe_video():
    current_user_id = get_jwt_identity()
    url = request.json.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
        
    # Check user's transcription limits
    stats = UserStats.query.filter_by(user_id=current_user_id).first()
    user = User.query.get(current_user_id)
    
    if not stats:
        stats = UserStats(user_id=current_user_id)
        db.session.add(stats)
    
    if user.subscription_tier == 'free' and stats.transcriptions >= 3:
        return jsonify({'error': 'Monthly transcription limit reached. Please upgrade to Pro.'}), 403
    
    try:
        # Create history entry
        history = VideoHistory(
            user_id=current_user_id,
            url=url,
            type='transcription',
            status='processing'
        )
        db.session.add(history)
        db.session.commit()
        
        # Download video for transcription
        yt = YouTube(url)
        history.title = yt.title
        
        # Get audio stream
        audio = yt.streams.filter(only_audio=True).first()
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
        audio.download(output_path=os.path.dirname(temp_file.name), filename=os.path.basename(temp_file.name))
        
        # Transcribe using AssemblyAI
        aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
        transcript = aai.Transcriber().transcribe(temp_file.name)
        
        # Clean up temp file
        os.unlink(temp_file.name)
        
        # Update stats
        stats.transcriptions += 1
        stats.last_updated = datetime.utcnow()
        
        # Update history status
        history.status = 'completed'
        db.session.commit()
        
        return jsonify({'transcript': transcript.text})
        
    except Exception as e:
        if history:
            history.status = 'failed'
            db.session.commit()
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    current_user_id = get_jwt_identity()
    stats = UserStats.query.filter_by(user_id=current_user_id).first()
    
    if not stats:
        stats = UserStats(user_id=current_user_id)
        db.session.add(stats)
        db.session.commit()
    
    subscription_limits = {
        'free': {'maxDownloads': 5, 'maxTranscriptions': 3},
        'pro': {'maxDownloads': float('inf'), 'maxTranscriptions': 50},
        'enterprise': {'maxDownloads': float('inf'), 'maxTranscriptions': float('inf')}
    }
    
    user = User.query.get(current_user_id)
    limits = subscription_limits.get(user.subscription_tier, subscription_limits['free'])
    
    return jsonify({
        'downloads': stats.downloads,
        'transcriptions': stats.transcriptions,
        'storage': stats.storage,
        'maxDownloads': limits['maxDownloads'],
        'maxTranscriptions': limits['maxTranscriptions'],
        'maxStorage': 10 * 1024 * 1024 * 1024  # 10GB for all users
    })

@app.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    current_user_id = get_jwt_identity()
    history = VideoHistory.query.filter_by(user_id=current_user_id)\
        .order_by(VideoHistory.created_at.desc())\
        .limit(50)\
        .all()
    
    return jsonify([{
        'id': h.id,
        'url': h.url,
        'title': h.title,
        'type': h.type,
        'status': h.status,
        'created_at': h.created_at.isoformat()
    } for h in history])

@app.route('/api/subscription/upgrade', methods=['POST'])
@jwt_required()
def upgrade_subscription():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    data = request.json
    new_tier = data.get('tier')
    
    if new_tier not in ['pro', 'enterprise']:
        return jsonify({'error': 'Invalid subscription tier'}), 400
    
    # Here you would integrate with your payment processor (e.g., Stripe)
    # For now, we'll just update the subscription
    user.subscription_tier = new_tier
    user.subscription_end_date = datetime.utcnow() + timedelta(days=30)
    db.session.commit()
    
    return jsonify({
        'message': f'Successfully upgraded to {new_tier}',
        'subscription': {
            'tier': user.subscription_tier,
            'endDate': user.subscription_end_date.isoformat()
        }
    })

@app.route('/api/subscription/status', methods=['GET'])
@jwt_required()
def subscription_status():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({
        'tier': user.subscription_tier,
        'endDate': user.subscription_end_date.isoformat() if user.subscription_end_date else None
    })

@app.route('/')
def serve():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
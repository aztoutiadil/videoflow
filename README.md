<<<<<<< HEAD
# videoflow
=======
# VideoFlow - Modern Video Processing SaaS Platform

VideoFlow is a powerful SaaS platform that allows users to download and transcribe videos from various platforms including YouTube, Instagram, and TikTok. Built with a modern tech stack including React, Material-UI, Flask, and SQLAlchemy.

## Features

- Multi-Platform Support
  - Download videos from YouTube, Instagram, TikTok
  - High-quality video downloads
  - Custom video formats

- Advanced Transcription
  - Powered by AssemblyAI
  - Multiple language support
  - Searchable transcripts
  - Export to various formats

- Professional Tools
  - Usage analytics and statistics
  - Download history tracking
  - Team management (Enterprise)
  - API access (Enterprise)

- Security & Privacy
  - Secure user authentication
  - JWT token-based authorization
  - Rate limiting protection
  - Data encryption

- Flexible Pricing Plans
  - Free tier with basic features
  - Pro tier for power users
  - Enterprise solutions for teams

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+ and npm
- AssemblyAI API key
- SQLite (included)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd videoflow
```

2. Install Python dependencies:
```bash
python -m pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
FLASK_APP=app.py
FLASK_ENV=development
JWT_SECRET_KEY=your-secret-key-here
ASSEMBLYAI_API_KEY=your-assemblyai-api-key-here
```

4. Initialize the database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

5. Install frontend dependencies:
```bash
cd client
npm install
npm run build
cd ..
```

6. Start the development server:
```bash
flask run
```

The application will be available at `http://localhost:5000`

## Subscription Tiers

### Free Tier
- 5 video downloads per day
- 3 transcriptions per month
- Standard quality downloads
- Basic support

### Pro Tier ($15/month)
- Unlimited video downloads
- 50 transcriptions per month
- High quality downloads
- Priority support
- No watermark
- Custom download formats

### Enterprise Tier ($49/month)
- Unlimited everything
- API access
- Custom integrations
- 24/7 phone & email support
- Team management
- Advanced analytics

## API Documentation

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Video Operations
```http
POST /api/download
POST /api/transcribe
GET /api/history
```

### Subscription Management
```http
GET /api/subscription/status
POST /api/subscription/upgrade
```

### Statistics
```http
GET /api/stats
```

## Usage Tracking

The platform includes comprehensive usage tracking:
- Number of downloads
- Transcription minutes used
- Storage usage
- API calls (Enterprise)

## Rate Limiting

- Free Tier: 5 downloads/day, 3 transcriptions/month
- Pro Tier: Unlimited downloads, 50 transcriptions/month
- Enterprise: Unlimited everything

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
>>>>>>> 08d217f (initial commit)

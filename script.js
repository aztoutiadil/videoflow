// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('Theme toggle element not found!');
        return;
    }

    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';

    // Handle theme toggle
    themeToggle.addEventListener('click', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('Theme changed to:', newTheme); // Debug log
    });
});

// Form elements
const downloadForm = document.getElementById('downloadForm');
const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const transcribeBtn = document.getElementById('transcribeBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const transcriptContainer = document.getElementById('transcriptContainer');
const transcriptText = document.getElementById('transcriptText');

// Helper functions
function showLoading() {
    loadingSpinner.style.display = 'flex';
    downloadBtn.disabled = true;
    transcribeBtn.disabled = true;
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
    downloadBtn.disabled = false;
    transcribeBtn.disabled = false;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Handle video download
async function handleDownload(e) {
    e.preventDefault();
    const url = urlInput.value.trim();
    
    if (!url) {
        showError('Please enter a video URL');
        return;
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        showError('Please enter a valid YouTube URL');
        return;
    }

    showLoading();

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to download video');
        }

        showSuccess('Video downloaded successfully!');
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Handle video transcription
async function handleTranscribe() {
    const url = urlInput.value.trim();
    
    if (!url) {
        showError('Please enter a video URL');
        return;
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        showError('Please enter a valid YouTube URL');
        return;
    }

    showLoading();
    transcriptContainer.style.display = 'none';

    try {
        const response = await fetch('/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to transcribe video');
        }

        transcriptText.textContent = data.transcript;
        transcriptContainer.style.display = 'block';
        showSuccess('Video transcribed successfully!');
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Event listeners
downloadForm.addEventListener('submit', handleDownload);
transcribeBtn.addEventListener('click', handleTranscribe);

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        this.classList.toggle('active');
    });
});

// Auth popup functionality
function openAuthPopup() {
    document.getElementById('auth-popup').classList.remove('hidden');
    showSignInForm();
}

function closeAuthPopup() {
    document.getElementById('auth-popup').classList.add('hidden');
}

function showSignInForm() {
    document.getElementById('auth-title').textContent = 'Sign In';
    document.getElementById('auth-toggle').innerHTML = 'Don\'t have an account? <span onclick="toggleAuthForm()">Sign Up</span>';
    document.getElementById('signin-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
}

function showSignUpForm() {
    document.getElementById('auth-title').textContent = 'Sign Up';
    document.getElementById('auth-toggle').innerHTML = 'Already have an account? <span onclick="toggleAuthForm()">Sign In</span>';
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

function toggleAuthForm() {
    const signInForm = document.getElementById('signin-form');
    if (signInForm.classList.contains('hidden')) {
        showSignInForm();
    } else {
        showSignUpForm();
    }
}

// Handle sign in
document.getElementById('signin-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value.trim();
    
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    showLoading();
    
    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful sign in
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Signed in successfully!');
        closeAuthPopup();
        
        // Update UI to show user is signed in
        document.querySelectorAll('.auth-required').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.auth-hide').forEach(el => el.classList.add('hidden'));
    } catch (error) {
        showError(error.message || 'Failed to sign in');
    } finally {
        hideLoading();
    }
});

// Handle sign up
document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
    
    if (!email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    showLoading();
    
    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful sign up
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Account created successfully!');
        closeAuthPopup();
        
        // Update UI to show user is signed in
        document.querySelectorAll('.auth-required').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.auth-hide').forEach(el => el.classList.add('hidden'));
    } catch (error) {
        showError(error.message || 'Failed to create account');
    } finally {
        hideLoading();
    }
});

// Handle forgot password
function openForgotPassword() {
    const email = prompt('Enter your email to reset your password:');
    if (email) {
        // Here you would typically make an API call to your backend
        // For now, we'll just show a success message
        showSuccess(`Password reset instructions sent to ${email}`);
    }
}

// Function to open the auth popup
function openAuthPopup() {
    document.getElementById('auth-popup').classList.remove('hidden');
    showSignInForm(); // Default to Sign In form
}

// Function to close the auth popup
function closeAuthPopup() {
    document.getElementById('auth-popup').classList.add('hidden');
}

// Function to toggle between Sign In and Sign Up forms
function toggleAuthForm() {
    const signInForm = document.getElementById('signin-form');
    const signUpForm = document.getElementById('signup-form');
    const authTitle = document.getElementById('auth-title');
    const authToggle = document.getElementById('auth-toggle');

    if (signInForm.classList.contains('hidden')) {
        showSignInForm();
    } else {
        showSignUpForm();
    }
}

function showSignInForm() {
    document.getElementById('signin-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('auth-title').textContent = 'Sign In';
    document.getElementById('auth-toggle').innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthForm()">Sign Up</a>';
}

function showSignUpForm() {
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('auth-title').textContent = 'Sign Up';
    document.getElementById('auth-toggle').innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthForm()">Sign In</a>';
}

// Attach event listeners to buttons
document.getElementById('login-btn').addEventListener('click', openAuthPopup);
document.getElementById('register-btn').addEventListener('click', openAuthPopup);

// Close popup when clicking outside
document.querySelector('.popup-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAuthPopup();
    }
});

// Attach event listeners to buttons
document.getElementById('login-btn').addEventListener('click', () => openPopup('signin-popup'));
document.getElementById('register-btn').addEventListener('click', () => openPopup('signup-popup'));

document.querySelector('.download-btn').addEventListener('click', function() {
    const spinner = document.querySelector('.loading-spinner');
    spinner.classList.remove('hidden'); // Show spinner
    setTimeout(() => {
        spinner.classList.add('hidden'); // Hide spinner after 3 seconds (simulate processing)
    }, 3000);
});

document.querySelector('.download-btn').addEventListener('click', function() {
    const urlInput = document.querySelector('.url-input');
    const url = urlInput.value.trim();
    
    if (!url || !isValidUrl(url)) {
        alert('Please enter a valid URL.');
        return;
    }
    
    // Proceed with download logic
});

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
}

//smoth scroll
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// back home
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// succecessful download 
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

document.querySelector('.download-btn').addEventListener('click', function() {
    setTimeout(() => {
        triggerConfetti(); // Trigger confetti after 3 seconds (simulate download completion)
    }, 3000);
});

//validation data in signup
document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value.trim();
    
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate successful sign-in
    alert('Signed in successfully!');
    closeAuthPopup();
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
    
    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    // Simulate successful sign-up
    alert('Signed up successfully!');
    closeAuthPopup();
});

//forgot pass
function openForgotPassword() {
    const email = prompt('Enter your email to reset your password:');
    if (email) {
        alert(`Password reset instructions sent to ${email}.`);
    }
}

function showLoading(form) {
    const spinner = form.querySelector('.loading-spinner');
    spinner.classList.remove('hidden');
}

function hideLoading(form) {
    const spinner = form.querySelector('.loading-spinner');
    spinner.classList.add('hidden');
}

// Simulate fetching download options
function fetchDownloadOptions(url) {
    // Simulate an API call or backend logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                formats: ['mp4', 'mkv'],
                qualities: ['1080p', '720p', '480p']
            });
        }, 1000); // Simulate 1 second delay
    });
}

// Show download options when URL is pasted
document.querySelector('.url-input').addEventListener('input', async function() {
    const url = this.value.trim();
    if (isValidUrl(url)) {
        const downloadOptions = document.getElementById('download-options');
        downloadOptions.classList.add('hidden'); // Hide options while fetching

        // Show loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        downloadOptions.parentElement.appendChild(spinner);

        // Fetch download options
        const options = await fetchDownloadOptions(url);

        // Remove loading spinner
        spinner.remove();

        // Populate format and quality options
        const formatOptions = document.querySelector('.format-options');
        const qualityOptions = document.querySelector('.quality-options');

        formatOptions.innerHTML = options.formats.map(format => `
            <label>
                <input type="radio" name="format" value="${format}" ${format === 'mp4' ? 'checked' : ''}> ${format.toUpperCase()}
            </label>
        `).join('');

        qualityOptions.innerHTML = options.qualities.map(quality => `
            <label>
                <input type="radio" name="quality" value="${quality}" ${quality === '1080p' ? 'checked' : ''}> ${quality}
            </label>
        `).join('');

        // Show download options
        downloadOptions.classList.remove('hidden');
    }
});

document.querySelector('.confirm-download-btn').addEventListener('click', function() {
    const format = document.querySelector('input[name="format"]:checked').value;
    const quality = document.querySelector('input[name="quality"]:checked').value;
    const url = document.querySelector('.url-input').value.trim();

    // Show success animation
    const successAnimation = document.getElementById('success-animation');
    successAnimation.classList.remove('hidden');

    // Trigger confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Hide the animation after 2 seconds
    setTimeout(() => {
        successAnimation.classList.add('hidden');
    }, 2000);

    // Simulate download logic
    console.log(`Downloading ${quality} ${format.toUpperCase()} video from ${url}...`);
});

// URL validation function
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

//download 
document.querySelector('.download-btn').addEventListener('click', async function() {
    const url = document.querySelector('.url-input').value.trim();

    if (!url) {
        alert('Please enter a YouTube URL.');
        return;
    }

    try {
        // Send the URL to the backend
        const response = await fetch('http://127.0.0.1:5000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        if (!response.ok) {
            throw new Error('Failed to download video.');
        }

        // Trigger the download
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
        alert(error.message);
    }
});

// Function to fetch transcript from an API (replace with actual API call)
async function fetchTranscript(videoUrl) {
    // Simulate an API call (replace with actual API endpoint)
    return new Promise((resolve) => {
        setTimeout(() => {
            const transcript = `This is a sample transcript for the video at ${videoUrl}. Replace this with the actual transcript fetched from an API.`;
            resolve(transcript);
        }, 1000); // Simulate a 1-second delay
    });
}

// Event listener for the "Get Transcript" button
document.getElementById('get-transcript-btn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('transcript-url').value;
    if (videoUrl) {
        // Show loading state (optional)
        document.getElementById('get-transcript-btn').textContent = 'Fetching...';

        // Fetch transcript
        const transcript = await fetchTranscript(videoUrl);

        // Display transcript
        document.getElementById('transcript-text').value = transcript;
        document.getElementById('transcript-result').classList.remove('hidden');

        // Reset button text
        document.getElementById('get-transcript-btn').textContent = 'Get Transcript';
    } else {
        alert('Please paste a valid video URL.');
    }
});

// Event listener for the "Download Transcript" button
document.getElementById('download-transcript-btn').addEventListener('click', () => {
    const transcript = document.getElementById('transcript-text').value;
    if (transcript) {
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transcript.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        alert('No transcript available to download.');
    }
});

// Open Transcript Modal
function openTranscriptModal() {
    document.getElementById('transcript-modal').classList.remove('hidden');
}

// Close Transcript Modal
function closeTranscriptModal() {
    document.getElementById('transcript-modal').classList.add('hidden');
}

// Fetch Transcript (Simulated)
async function fetchTranscript(videoUrl) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const transcript = `This is a sample transcript for the video at ${videoUrl}. Replace this with the actual transcript fetched from an API.`;
            resolve(transcript);
        }, 1000); // Simulate a 1-second delay
    });
}

// Event listener for "Get Transcript" button
document.getElementById('get-transcript-btn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('transcript-url').value;
    if (videoUrl) {
        // Show loading state (optional)
        document.getElementById('get-transcript-btn').textContent = 'Fetching...';

        // Fetch transcript
        const transcript = await fetchTranscript(videoUrl);

        // Display transcript
        document.getElementById('transcript-text').value = transcript;
        document.getElementById('transcript-result').classList.remove('hidden');

        // Reset button text
        document.getElementById('get-transcript-btn').textContent = 'Get Transcript';
    } else {
        alert('Please paste a valid video URL.');
    }
});

// Event listener for "Download Transcript" button
document.getElementById('download-transcript-btn').addEventListener('click', () => {
    const transcript = document.getElementById('transcript-text').value;
    if (transcript) {
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transcript.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        alert('No transcript available to download.');
    }
});

//API

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Authentication Modal Management
function openAuthModal(type) {
    document.getElementById(`${type}-modal`).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal(type) {
    document.getElementById(`${type}-modal`).classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchAuthModal(from, to) {
    closeAuthModal(from);
    openAuthModal(to);
}

// Form Handlers
function handleSignIn(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Add your authentication logic here
    console.log('Sign in attempt:', { email });
    
    // For demo purposes, just close the modal
    closeAuthModal('signin');
    showNotification('Successfully signed in!');
}

function handleSignUp(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Add your registration logic here
    console.log('Sign up attempt:', { name, email });
    
    // For demo purposes, just close the modal
    closeAuthModal('signup');
    showNotification('Successfully signed up!');
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            closeAuthModal(e.target.id.replace('-modal', ''));
        }
    });
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollable) * 100;
    scrollProgress.style.width = `${progress}%`;
}

// Scroll Animation Observer
function createScrollObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, options);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth Scroll to Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize scroll-based features
window.addEventListener('scroll', () => {
    updateScrollProgress();
    requestAnimationFrame(() => {
        updateScrollProgress();
    });
});

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createScrollObserver();
    
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('slide-in-left');
        } else {
            section.classList.add('slide-in-right');
        }
    });

    // Initialize scroll progress
    updateScrollProgress();
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            closeAuthModal(e.target.id.replace('-modal', ''));
        }
    });
});

// Video processing functions
async function fetchVideoDetails() {
    const urlInput = document.getElementById('video-url');
    const videoUrl = urlInput.value.trim();
    
    if (!videoUrl) {
        showNotification('Please enter a valid video URL', 'error');
        return;
    }

    try {
        // Show loading state
        showNotification('Analyzing video...', 'info');
        
        // Simulate API call to get video details
        const videoDetails = await simulateVideoDetailsAPI(videoUrl);
        
        // Update UI with video details
        document.getElementById('video-thumbnail').src = videoDetails.thumbnail;
        document.getElementById('video-title').textContent = videoDetails.title;
        document.getElementById('video-duration').textContent = `Duration: ${videoDetails.duration}`;
        document.getElementById('video-author').textContent = `By: ${videoDetails.author}`;
        
        // Show video details section
        document.getElementById('video-details').classList.remove('hidden');
        showNotification('Video analysis complete!', 'success');
    } catch (error) {
        showNotification('Failed to analyze video. Please try again.', 'error');
    }
}

async function startDownload() {
    const videoUrl = document.getElementById('video-url').value.trim();
    const format = document.querySelector('input[name="format"]:checked').value;
    const quality = document.querySelector('input[name="quality"]:checked').value;
    
    if (!videoUrl) {
        showNotification('Please enter a video URL', 'error');
        return;
    }

    try {
        // Show progress section
        const progressSection = document.getElementById('download-progress');
        progressSection.classList.remove('hidden');
        
        // Start download simulation
        await simulateDownload(progressSection);
        
        // Show success message
        showSuccessAnimation();
        showNotification('Download completed successfully!', 'success');
    } catch (error) {
        showNotification('Download failed. Please try again.', 'error');
    }
}

async function downloadTranscript() {
    const videoUrl = document.getElementById('video-url').value.trim();
    
    if (!videoUrl) {
        showNotification('Please enter a video URL', 'error');
        return;
    }

    try {
        showNotification('Generating transcript...', 'info');
        
        // Simulate transcript generation
        const transcript = await simulateTranscriptGeneration();
        
        // Create and download text file
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video-transcript.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Transcript downloaded successfully!', 'success');
    } catch (error) {
        showNotification('Failed to generate transcript. Please try again.', 'error');
    }
}

// Simulation functions (replace with actual API calls)
function simulateVideoDetailsAPI(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                thumbnail: 'https://picsum.photos/200/112', // Placeholder image
                title: 'Sample Video Title',
                duration: '10:30',
                author: 'Sample Channel'
            });
        }, 1500);
    });
}

function simulateDownload(progressSection) {
    return new Promise((resolve) => {
        const progressFill = progressSection.querySelector('.progress-fill');
        const progressText = progressSection.querySelector('#progress-percentage');
        const timeRemaining = progressSection.querySelector('#time-remaining');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 1;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
            
            const remainingSeconds = Math.ceil((100 - progress) * 0.3);
            timeRemaining.textContent = `${remainingSeconds} seconds`;
            
            if (progress >= 100) {
                clearInterval(interval);
                resolve();
            }
        }, 300);
    });
}

function simulateTranscriptGeneration() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Video Transcript
-------------------
00:00 - Introduction
00:15 - Main content begins
01:30 - Key points discussion
03:45 - Summary
04:00 - Conclusion`);
        }, 2000);
    });
}

function showSuccessAnimation() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-animation';
    successDiv.innerHTML = `
        <div class="checkmark">✓</div>
        <h3>Download Complete!</h3>
    `;
    
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.classList.add('show'), 100);
    
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => document.body.removeChild(successDiv), 300);
    }, 2000);
}

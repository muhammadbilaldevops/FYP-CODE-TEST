"""
CONFIGURATION MANAGEMENT - Backend Configuration System

This file manages all configuration settings for the Flask backend application.
It handles different settings for development and production environments.

Student Note: Why separate configuration files?
- Development needs different settings than production
- Security: Production secrets should never be in code
- Flexibility: Easy to switch between environments
- Best Practice: Centralized configuration management

How it works:
1. Checks FLASK_ENV environment variable
2. Loads appropriate config class (Development or Production)
3. Development uses SQLite (simple, no setup needed)
4. Production uses PostgreSQL (more robust, scalable)
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables immediately before configuration is set
load_dotenv()

class Config:
    """
    Base Configuration Class
    
    Student Note: This is the parent class that contains common settings
    used in both development and production. Both DevelopmentConfig and
    ProductionConfig inherit from this class.
    
    Contains:
    - Security settings (secret keys, session management)
    - File upload settings (where to save, size limits, allowed types)
    - CORS settings (which websites can access our API)
    """
    # Secret Key for session encryption
    # Student Note: This encrypts cookies and sessions. In production, this should
    # be set as an environment variable, never hardcoded!
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # SQLAlchemy Settings
    # Student Note: SQLAlchemy is the database toolkit. This setting prevents
    # tracking every change (saves memory and improves performance)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session Lifetime
    # Student Note: How long admin sessions last (24 hours = 86400 seconds)
    # After this time, admin must login again
    PERMANENT_SESSION_LIFETIME = 86400  # 24 hours
    
    # File Upload Settings
    # Student Note: These settings control file uploads (CNIC, documents, etc.)
    
    # Where to save uploaded files
    # Student Note: os.path.join() creates a path: backend/uploads/
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
    
    # Maximum file size (16MB)
    # Student Note: Prevents users from uploading huge files that could crash server
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB = 16 * 1024 * 1024 bytes
    
    # Allowed file extensions
    # Student Note: Only these file types can be uploaded (security measure)
    # Prevents uploading executable files (.exe, .sh) that could be malicious
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'doc', 'docx'}
    
    # CORS (Cross-Origin Resource Sharing) Settings
    # Student Note: CORS allows our React frontend (different port/domain) to access API
    # Without CORS, browser blocks requests from different origins (security feature)
    # These are the allowed frontend URLs that can make API requests
    CORS_ORIGINS = [
        'http://localhost:5173',  # Vite default dev server
        'http://127.0.0.1:5173',   # Alternative localhost
        'http://localhost:5174',   # Alternative port
        'http://127.0.0.1:5174',   # Alternative localhost + port
    ]


class DevelopmentConfig(Config):
    """
    Development Configuration
    
    Student Note: This configuration is used when running the app locally.
    It's simpler and easier to set up than production.
    
    Features:
    - Uses SQLite database (single file, no server needed)
    - DEBUG mode enabled (shows detailed error messages)
    - Database file stored in backend/ folder
    
    When is this used?
    - When FLASK_ENV=development (or not set)
    - When running app.py locally on your computer
    - During development and testing
    """
    # Debug Mode
    # Student Note: DEBUG=True shows detailed error pages with stack traces
    # NEVER enable this in production (security risk - exposes code structure)
    DEBUG = True
    
    # Database Configuration
    # Student Note: By default, development can use either:
    # - A DATABASE_URL environment variable (recommended), OR
    # - A hard-coded Supabase/PostgreSQL URL (for this project setup), OR
    # - Finally fall back to local SQLite if nothing else is configured.
    #
    # This project is configured to talk to a Supabase PostgreSQL instance by
    # default so that quote data is stored in the cloud instead of a local file.
    db_path = os.path.join(os.path.dirname(__file__), 'almuslim_solar.db')

    # 1) Prefer explicit DATABASE_URL from environment (.env file) if present
    _env_db_url = os.environ.get('DATABASE_URL')
    if _env_db_url:
        # Auto-inject pg8000 driver so SQLAlchemy works out of the box with the pure-python driver!
        if _env_db_url.startswith("postgresql://"):
            _env_db_url = _env_db_url.replace("postgresql://", "postgresql+pg8000://", 1)
        SQLALCHEMY_DATABASE_URI = _env_db_url
    else:
        # 2) Fallback to local SQLite database (no Supabase configured yet)
        # To connect to Supabase, set DATABASE_URL in backend/.env
        # See SUPABASE_COMPLETE_GUIDE.md for instructions
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_path}"


class ProductionConfig(Config):
    """
    Production Configuration
    
    Student Note: This configuration is used when the app is deployed to a server.
    It's more secure and robust than development config.
    
    Features:
    - Uses PostgreSQL database (more powerful, scalable)
    - DEBUG mode disabled (security)
    - Environment variables for sensitive data (passwords, keys)
    - Production CORS origins (allows deployed frontend)
    
    When is this used?
    - When FLASK_ENV=production
    - When deployed to Render, Heroku, AWS, etc.
    - In live/production environment
    """
    # Debug Mode - DISABLED for security
    # Student Note: DEBUG=False in production prevents exposing:
    # - Source code structure
    # - Database queries
    # - Internal error details
    # This protects against hackers
    DEBUG = False
    
    # PostgreSQL / Supabase Database Configuration
    # Student Note: In production we normally use PostgreSQL.
    # There are TWO ways to configure it:
    #
    # 1) Recommended (for Supabase and most cloud providers):
    #    - Set DATABASE_URL in the environment to the full connection string
    #      provided by the provider (for Supabase it usually looks like:
    #      postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?sslmode=require)
    #    - If DATABASE_URL is set, we will use it directly.
    #
    # 2) Legacy/manual mode (when DATABASE_URL is NOT set):
    #    - Use individual DB_* environment variables to build the URL.
    #
    database_url = os.environ.get('DATABASE_URL')

    if database_url:
        # Use full connection string from DATABASE_URL (e.g. Supabase)
        SQLALCHEMY_DATABASE_URI = database_url
    else:
        # Fallback: build PostgreSQL URL from separate pieces
        DB_HOST = os.environ.get('DB_HOST', 'localhost')  # Database server address
        DB_PORT = os.environ.get('DB_PORT', '5432')        # PostgreSQL default port
        DB_NAME = os.environ.get('DB_NAME', 'almuslim_solar')  # Database name
        DB_USER = os.environ.get('DB_USER', 'postgres')     # Database username
        DB_PASSWORD = os.environ.get('DB_PASSWORD', '')    # Database password (MUST be set!)

        # Construct PostgreSQL Connection String
        # Format: postgresql://username:password@host:port/database_name
        SQLALCHEMY_DATABASE_URI = (
            f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        )
    
    # Production CORS Origins
    # Student Note: Add production frontend URLs to allowed origins
    # This allows the deployed React app (on Netlify) to access the API
    # Config.CORS_ORIGINS contains development URLs, we add production ones here
    CORS_ORIGINS = Config.CORS_ORIGINS + [
        'https://al-muslim-solar.netlify.app',  # Main production URL
        'https://*.netlify.app',  # Allow all Netlify subdomains (for preview deployments)
    ]


# Configuration Dictionary
# Student Note: Maps environment names to configuration classes
# This makes it easy to switch between different configurations
config = {
    'development': DevelopmentConfig,  # Use DevelopmentConfig for local development
    'production': ProductionConfig,    # Use ProductionConfig for deployed app
    'default': DevelopmentConfig       # Default to development if environment not specified
}


def get_config():
    """
    Get Configuration Based on Environment
    
    Student Note: This function determines which configuration to use.
    
    How it works:
    1. Checks FLASK_ENV environment variable
    2. Looks up the config class in the config dictionary
    3. Returns the appropriate configuration class
    4. Defaults to DevelopmentConfig if environment not set
    
    Usage in app.py:
    ```python
    config = get_config()
    app.config.from_object(config)
    ```
    
    @returns {class} Configuration class (DevelopmentConfig or ProductionConfig)
    
    Example:
    - FLASK_ENV=development → Returns DevelopmentConfig
    - FLASK_ENV=production → Returns ProductionConfig
    - FLASK_ENV not set → Returns DevelopmentConfig (default)
    """
    # Get environment from system variable, default to 'development'
    # Student Note: os.environ.get() reads environment variables
    # If FLASK_ENV is not set, it defaults to 'development'
    env = os.environ.get('FLASK_ENV', 'development')
    
    # Get config class from dictionary, or use default if not found
    # Student Note: config.get(env, config['default']) means:
    # - Try to get config[env] (e.g., config['production'])
    # - If not found, use config['default'] (DevelopmentConfig)
    return config.get(env, config['default'])


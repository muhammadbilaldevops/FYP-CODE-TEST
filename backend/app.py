# pyre-ignore-all-errors
"""
AL-MUSLIM ENGINEERING - SOLAR ENERGY MANAGEMENT SYSTEM
Main Flask Application

This backend provides:
- Quote request management
- Admin authentication
- Real-time tracking
- Client submissions approval/decline
- Database operations
"""

from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import os
from functools import wraps
import json
from dotenv import load_dotenv
from config import get_config
from urllib.parse import urlparse

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Load configuration based on environment
config = get_config()
app.config.from_object(config)


def describe_database_uri(uri: str) -> str:
    """
    Return a masked, human-readable representation of the database URI
    without leaking credentials.
    """
    if not uri:
        return 'unknown database (SQLALCHEMY_DATABASE_URI not set)'
    try:
        parsed = urlparse(uri)
        # Handle SQLite URIs separately so we see the file path
        if parsed.scheme.startswith('sqlite'):
            return uri
        host = parsed.hostname or 'unknown-host'
        port = f":{parsed.port}" if parsed.port else ''
        db_name = parsed.path.lstrip('/') or '(default)'
        return f"{parsed.scheme}://{host}{port}/{db_name}"
    except Exception:
        return 'unreadable database URI'


masked_db_uri = describe_database_uri(app.config.get('SQLALCHEMY_DATABASE_URI'))
print(f"[Al-Muslim Backend] Database target: {masked_db_uri}")

# Get allowed extensions from config
ALLOWED_EXTENSIONS = config.ALLOWED_EXTENSIONS

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize extensions
db = SQLAlchemy(app)

# CORS configuration - uses origins from config
CORS(app, 
     supports_credentials=True, 
     origins=config.CORS_ORIGINS,
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'],
     expose_headers=['Content-Type'])

# ==================== DATABASE MODELS ====================

class Admin(db.Model):
    """Admin user model for authentication"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class QuoteRequest(db.Model):
    """Quote request model for storing client inquiries"""
    id = db.Column(db.Integer, primary_key=True)
    
    # Client Information
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(100))
    address = db.Column(db.Text, nullable=False)
    
    # Project Details
    project_type = db.Column(db.String(50), nullable=False)
    system_size = db.Column(db.Float, nullable=False)
    monthly_bill = db.Column(db.Float)
    roof_area = db.Column(db.Float)
    property_type = db.Column(db.String(50))
    installation_type = db.Column(db.String(50))
    solar_system_type = db.Column(db.String(50))  # ongrid, offgrid, hybrid
    message = db.Column(db.Text)  # Optional message from user
    
    # User link (nullable — guests can also submit quotes)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    # Status and Tracking
    status = db.Column(db.String(20), default='pending')  # pending, approved, declined, contacted
    priority = db.Column(db.String(20), default='normal')  # low, normal, high, urgent
    admin_notes = db.Column(db.Text)
    estimated_cost = db.Column(db.Float)
    
    # File Uploads
    cnic_front_path = db.Column(db.String(500))
    cnic_back_path = db.Column(db.String(500))
    land_registry_path = db.Column(db.String(500))
    electricity_bill_path = db.Column(db.String(500))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    contacted_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'city': self.city,
            'address': self.address,
            'project_type': self.project_type,
            'system_size': self.system_size,
            'monthly_bill': self.monthly_bill,
            'roof_area': self.roof_area,
            'property_type': self.property_type,
            'installation_type': self.installation_type,
            'solar_system_type': self.solar_system_type,
            'message': self.message,
            'user_id': self.user_id,
            'status': self.status,
            'priority': self.priority,
            'admin_notes': self.admin_notes,
            'estimated_cost': self.estimated_cost,
            'cnic_front_path': self.cnic_front_path,
            'cnic_back_path': self.cnic_back_path,
            'land_registry_path': self.land_registry_path,
            'electricity_bill_path': self.electricity_bill_path,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'contacted_at': self.contacted_at.isoformat() if self.contacted_at else None
        }


class ContactMessage(db.Model):
    """Contact form messages"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='unread')  # unread, read, replied
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'subject': self.subject,
            'message': self.message,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Project(db.Model):
    """Completed projects portfolio"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    client_name = db.Column(db.String(100))
    location = db.Column(db.String(200))
    capacity = db.Column(db.Float)
    system_type = db.Column(db.String(50))
    completion_date = db.Column(db.Date)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Quotation(db.Model):
    """Generated quotations"""
    id = db.Column(db.Integer, primary_key=True)
    quote_id = db.Column(db.Integer, db.ForeignKey('quote_request.id'), nullable=False)
    quotation_number = db.Column(db.String(100), unique=True, nullable=False)
    quotation_data = db.Column(db.Text)  # JSON string
    selected_kw = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'quote_id': self.quote_id,
            'quotation_number': self.quotation_number,
            'quotation_data': json.loads(self.quotation_data) if self.quotation_data else None,
            'selected_kw': self.selected_kw,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class User(db.Model):
    """User model for customer authentication"""
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to quotes
    quotes = db.relationship('QuoteRequest', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


# ==================== AUTHENTICATION DECORATORS ====================

def login_required(f):
    """Decorator to protect routes that require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_id' not in session:
            return jsonify({'error': 'Unauthorized', 'message': 'Please login first'}), 401
        return f(*args, **kwargs)
    return decorated_function


def user_login_required(f):
    """Decorator to protect routes that require user authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized', 'message': 'Please login first'}), 401
        return f(*args, **kwargs)
    return decorated_function


# ==================== AUTHENTICATION ROUTES ====================

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Admin login endpoint"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    admin = Admin.query.filter_by(username=username).first()
    
    if admin and admin.check_password(password):
        session['admin_id'] = admin.id
        session['admin_username'] = admin.username
        session.permanent = True
        
        admin.last_login = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Login successful',
            'admin': {
                'id': admin.id,
                'username': admin.username,
                'email': admin.email,
                'full_name': admin.full_name
            }
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/api/admin/logout', methods=['POST'])
@login_required
def admin_logout():
    """Admin logout endpoint"""
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200


@app.route('/api/admin/check', methods=['GET'])
def check_admin():
    """Check if admin is logged in"""
    if 'admin_id' in session:
        admin = Admin.query.get(session['admin_id'])
        if admin:
            return jsonify({
                'authenticated': True,
                'admin': {
                    'id': admin.id,
                    'username': admin.username,
                    'email': admin.email,
                    'full_name': admin.full_name
                }
            }), 200
    
    return jsonify({'authenticated': False}), 200


# ==================== QUOTE REQUEST ROUTES ====================

@app.route('/api/quotes', methods=['POST'])
def create_quote():
    """Create a new quote request with optional file uploads"""
    try:
        print("=" * 50)
        print("QUOTE REQUEST RECEIVED")
        print("=" * 50)
        print(f"Content-Type: {request.content_type}")
        print(f"Method: {request.method}")
        print(f"Has files: {len(request.files)}")
        print(f"Has form data: {len(request.form)}")
        print(f"Is JSON: {request.is_json}")
        
        # Check if request is multipart/form-data (FormData) or JSON
        # When FormData is sent, browser sets Content-Type to multipart/form-data
        content_type = (request.content_type or '').lower()
        is_multipart = 'multipart/form-data' in content_type
        has_files = len(request.files) > 0
        has_form_data = len(request.form) > 0
        
        print(f"is_multipart: {is_multipart}, has_files: {has_files}, has_form_data: {has_form_data}")
        
        # Handle multipart/form-data (FormData from frontend)
        # Always prefer form data if it exists and request is not JSON
        if is_multipart or has_files or (has_form_data and not request.is_json):
            # Handle form data (with or without files)
            data = request.form
            
            print("Processing as form data (multipart)")
            print(f"Form data keys: {list(data.keys())}")
            print(f"Form data values: {dict(data)}")
            
            # Validate only truly required fields
            required_fields = ['name', 'phone']
            missing_fields = [field for field in required_fields if field not in data or not data[field]]
            
            if missing_fields:
                print(f"ERROR: Missing required fields: {missing_fields}")
                return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
            
            # Create new quote request - use defaults for optional fields
            quote = QuoteRequest(  # type: ignore
                name=data['name'],
                email=data.get('email', 'notprovided@example.com'),
                phone=data['phone'],
                city=data.get('city'),
                address=data.get('address', 'Not provided'),
                project_type=data.get('project_type', 'Residential'),
                system_size=float(data.get('system_size', 5.0)),
                monthly_bill=float(data['monthly_bill']) if data.get('monthly_bill') else None,
                roof_area=float(data['roof_area']) if data.get('roof_area') else None,
                property_type=data.get('property_type'),
                installation_type=data.get('installation_type'),
                solar_system_type=data.get('solar_system_type'),
                message=data.get('message')
            )
            
            # Add city if provided
            if data.get('city'):
                quote.city = data['city']
            
            db.session.add(quote)
            db.session.flush()  # Get quote ID before commit
            
            # Handle file uploads
            file_fields = {
                'cnicFront': 'cnic_front_path',
                'cnicBack': 'cnic_back_path',
                'landRegistry': 'land_registry_path',
                'electricityBill': 'electricity_bill_path'
            }
            
            for field_name, db_field in file_fields.items():
                if field_name in request.files:
                    file = request.files[field_name]
                    if file and file.filename:
                        if allowed_file(file.filename):
                            try:
                                filename = secure_filename(f"{quote.id}_{field_name}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{file.filename}")
                                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                                file.save(filepath)
                                setattr(quote, db_field, filename)
                                print(f"File saved: {field_name} -> {filename}")  # Debug logging
                            except Exception as file_error:
                                print(f"Error saving file {field_name}: {str(file_error)}")
                                # Continue with other files even if one fails
                        else:
                            print(f"File {field_name} has invalid extension: {file.filename}")
            
            db.session.commit()
            print(f"SUCCESS: Quote created with ID: {quote.id}")
            print(f"Files: cnic_front={quote.cnic_front_path}, cnic_back={quote.cnic_back_path}, land_registry={quote.land_registry_path}, electricity_bill={quote.electricity_bill_path}")
            print("=" * 50)
            
        else:
            print("Processing as JSON or other format...")
            print(f"Content-Type: {request.content_type}")
            
            # Try form data first (even if content-type doesn't say multipart)
            if request.form and len(request.form) > 0:
                print("Found form data in request.form, using that")
                data = request.form
                # Process same as multipart above
                required_fields = ['name', 'email', 'phone', 'address', 'project_type', 'system_size']
                missing_fields = [field for field in required_fields if field not in data or not data[field]]
                
                if missing_fields:
                    print(f"ERROR: Missing required fields: {missing_fields}")
                    return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
                
                quote = QuoteRequest(
                    name=data['name'],
                    email=data['email'],
                    phone=data['phone'],
                    address=data['address'],
                    project_type=data['project_type'],
                    system_size=float(data['system_size']),
                    monthly_bill=float(data['monthly_bill']) if data.get('monthly_bill') else None,
                    roof_area=float(data['roof_area']) if data.get('roof_area') else None,
                    property_type=data.get('property_type'),
                    installation_type=data.get('installation_type')
                )
                
                db.session.add(quote)
                db.session.flush()
                
                # Handle files if any
                file_fields = {
                    'cnicFront': 'cnic_front_path',
                    'cnicBack': 'cnic_back_path',
                    'landRegistry': 'land_registry_path',
                    'electricityBill': 'electricity_bill_path'
                }
                
                for field_name, db_field in file_fields.items():
                    if field_name in request.files:
                        file = request.files[field_name]
                        if file and file.filename:
                            if allowed_file(file.filename):
                                try:
                                    filename = secure_filename(f"{quote.id}_{field_name}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{file.filename}")
                                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                                    file.save(filepath)
                                    setattr(quote, db_field, filename)
                                    print(f"File saved: {field_name} -> {filename}")
                                except Exception as file_error:
                                    print(f"Error saving file {field_name}: {str(file_error)}")
                            else:
                                print(f"File {field_name} has invalid extension: {file.filename}")
                
                db.session.commit()
                print(f"SUCCESS: Quote created with ID: {quote.id}")
                print("=" * 50)
            # Handle JSON data (backward compatibility)
            elif request.is_json:
                data = request.get_json()
            
            if not data:
                return jsonify({'error': 'No data provided'}), 400
            
            # Validate required fields
            required_fields = ['name', 'email', 'phone', 'address', 'project_type', 'system_size']
            missing_fields = [field for field in required_fields if field not in data or not data[field]]
            
            if missing_fields:
                return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
            
            # Create new quote request
            quote = QuoteRequest(  # type: ignore
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                address=data['address'],
                project_type=data['project_type'],
                system_size=float(data['system_size']),
                monthly_bill=float(data['monthly_bill']) if data.get('monthly_bill') else None,
                roof_area=float(data['roof_area']) if data.get('roof_area') else None,
                property_type=data.get('property_type'),
                installation_type=data.get('installation_type')
            )
            
            db.session.add(quote)
            db.session.commit()
        
        # Build response with file information for debugging
        response_data = {
            'message': 'Quote request submitted successfully',
            'quote_id': quote.id,
            'files_uploaded': {
                'cnic_front': quote.cnic_front_path is not None,
                'cnic_back': quote.cnic_back_path is not None,
                'land_registry': quote.land_registry_path is not None,
                'electricity_bill': quote.electricity_bill_path is not None
            }
        }
        
        print(f"Returning success response with quote_id: {quote.id}")
        return jsonify(response_data), 201
        
    except ValueError as e:
        db.session.rollback()
        print(f"VALUE ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Invalid data format: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        print(f"EXCEPTION: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Failed to create quote request: {str(e)}'}), 500


@app.route('/api/admin/quotes', methods=['GET'])
@login_required
def get_all_quotes():
    """Get all quote requests (Admin only)"""
    status = request.args.get('status')
    
    query = QuoteRequest.query
    if status:
        query = query.filter_by(status=status)
    
    quotes = query.order_by(QuoteRequest.created_at.desc()).all()
    
    return jsonify({
        'quotes': [quote.to_dict() for quote in quotes],
        'total': len(quotes)
    }), 200


@app.route('/api/admin/quotes/<int:quote_id>', methods=['GET'])
@login_required
def get_quote(quote_id):
    """Get single quote request details"""
    quote = QuoteRequest.query.get_or_404(quote_id)
    return jsonify({'quote': quote.to_dict()}), 200


@app.route('/api/admin/quotes/<int:quote_id>/status', methods=['PUT'])
@login_required
def update_quote_status(quote_id):
    """Update quote request status (approve/decline)"""
    quote = QuoteRequest.query.get_or_404(quote_id)
    data = request.get_json()
    
    if 'status' in data:
        quote.status = data['status']
    if 'priority' in data:
        quote.priority = data['priority']
    if 'admin_notes' in data:
        quote.admin_notes = data['admin_notes']
    if 'estimated_cost' in data:
        quote.estimated_cost = data['estimated_cost']
    
    if data.get('status') == 'contacted':
        quote.contacted_at = datetime.utcnow()
    
    quote.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        'message': 'Quote updated successfully',
        'quote': quote.to_dict()
    }), 200


@app.route('/api/admin/quotes/<int:quote_id>', methods=['DELETE'])
@login_required
def delete_quote(quote_id):
    """Delete quote request"""
    quote = QuoteRequest.query.get_or_404(quote_id)
    db.session.delete(quote)
    db.session.commit()
    
    return jsonify({'message': 'Quote deleted successfully'}), 200


# ==================== CONTACT MESSAGE ROUTES ====================

@app.route('/api/contact', methods=['POST'])
def create_contact_message():
    """Create contact form submission"""
    try:
        data = request.get_json()
        
        message = ContactMessage(  # type: ignore
            name=data['name'],
            email=data['email'],
            phone=data.get('phone'),
            subject=data.get('subject'),
            message=data['message']
        )
        
        db.session.add(message)
        db.session.commit()
        
        return jsonify({
            'message': 'Message sent successfully',
            'id': message.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/messages', methods=['GET'])
@login_required
def get_contact_messages():
    """Get all contact messages (Admin only)"""
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({
        'messages': [msg.to_dict() for msg in messages],
        'total': len(messages)
    }), 200


# ==================== DASHBOARD STATISTICS ====================

@app.route('/api/admin/stats', methods=['GET'])
@login_required
def get_dashboard_stats():
    """Get dashboard statistics"""
    total_quotes = QuoteRequest.query.count()
    pending_quotes = QuoteRequest.query.filter_by(status='pending').count()
    approved_quotes = QuoteRequest.query.filter_by(status='approved').count()
    declined_quotes = QuoteRequest.query.filter_by(status='declined').count()
    
    unread_messages = ContactMessage.query.filter_by(status='unread').count()
    
    # Recent quotes (last 7 days)
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_quotes = QuoteRequest.query.filter(
        QuoteRequest.created_at >= seven_days_ago
    ).count()
    
    return jsonify({
        'stats': {
            'total_quotes': total_quotes,
            'pending_quotes': pending_quotes,
            'approved_quotes': approved_quotes,
            'declined_quotes': declined_quotes,
            'unread_messages': unread_messages,
            'recent_quotes': recent_quotes
        }
    }), 200


# ==================== REAL-TIME TRACKING ====================

@app.route('/api/admin/recent-activity', methods=['GET'])
@login_required
def get_recent_activity():
    """Get recent activity for real-time tracking"""
    limit = request.args.get('limit', 10, type=int)
    
    # Get recent quotes
    recent_quotes = QuoteRequest.query.order_by(
        QuoteRequest.created_at.desc()
    ).limit(limit).all()
    
    # Get recent messages
    recent_messages = ContactMessage.query.order_by(
        ContactMessage.created_at.desc()
    ).limit(limit).all()
    
    return jsonify({
        'recent_quotes': [q.to_dict() for q in recent_quotes],
        'recent_messages': [m.to_dict() for m in recent_messages]
    }), 200


# ==================== FILE UPLOAD HELPERS ====================

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/admin/quotes/upload-files', methods=['POST'])
@login_required
def upload_quote_files():
    """Upload files for a quote (CNIC, land registry, electricity bill)"""
    try:
        quote_id = request.form.get('quoteId')
        if not quote_id:
            return jsonify({'error': 'Quote ID is required'}), 400
        
        quote = QuoteRequest.query.get_or_404(quote_id)
        
        file_fields = {
            'cnicFront': 'cnic_front_path',
            'cnicBack': 'cnic_back_path',
            'landRegistry': 'land_registry_path',
            'electricityBill': 'electricity_bill_path'
        }
        
        uploaded_files = []
        for field_name, db_field in file_fields.items():
            if field_name in request.files:
                file = request.files[field_name]
                if file and file.filename and allowed_file(file.filename):
                    filename = secure_filename(f"{quote_id}_{field_name}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{file.filename}")
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    setattr(quote, db_field, filename)
                    uploaded_files.append(field_name)
        
        if uploaded_files:
            db.session.commit()
            return jsonify({
                'message': 'Files uploaded successfully',
                'uploaded_files': uploaded_files
            }), 200
        else:
            return jsonify({'error': 'No valid files uploaded'}), 400
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/quotes/<int:quote_id>/files/<file_type>', methods=['GET'])
@login_required
def get_quote_file(quote_id, file_type):
    """Get uploaded file for a quote"""
    try:
        quote = QuoteRequest.query.get_or_404(quote_id)
        
        file_mapping = {
            'cnic-front': quote.cnic_front_path,
            'cnic-back': quote.cnic_back_path,
            'land-registry': quote.land_registry_path,
            'electricity-bill': quote.electricity_bill_path
        }
        
        filename = file_mapping.get(file_type)
        if not filename:
            return jsonify({'error': 'File not found'}), 404
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'File does not exist'}), 404
        
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/quotes/save-quotation', methods=['POST'])
@login_required
def save_quotation():
    """Save generated quotation"""
    try:
        data = request.json
        quote_id = data.get('quoteId')
        quotation_data = data.get('quotationData')
        
        if not quote_id or not quotation_data:
            return jsonify({'error': 'Quote ID and quotation data are required'}), 400
        
        quote = QuoteRequest.query.get_or_404(quote_id)
        
        # Check if quotation already exists
        existing_quotation = Quotation.query.filter_by(quote_id=quote_id).first()
        
        if existing_quotation:
            # Update existing quotation
            existing_quotation.quotation_data = json.dumps(quotation_data)
            existing_quotation.selected_kw = quotation_data.get('selectedKW')
            existing_quotation.updated_at = datetime.utcnow()
        else:
            # Create new quotation
            quotation_number = quotation_data.get('quotationNumber', f"QT-{quote_id}-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}")
            new_quotation = Quotation(
                quote_id=quote_id,
                quotation_number=quotation_number,
                quotation_data=json.dumps(quotation_data),
                selected_kw=quotation_data.get('selectedKW')
            )
            db.session.add(new_quotation)
        
        # Update quote estimated cost if available
        if quotation_data.get('total'):
            quote.estimated_cost = quotation_data.get('total')
        
        db.session.commit()
        
        return jsonify({
            'message': 'Quotation saved successfully',
            'quotation_number': existing_quotation.quotation_number if existing_quotation else quotation_number
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/quotes/<int:quote_id>/quotation', methods=['GET'])
@login_required
def get_quotation(quote_id):
    """Get saved quotation for a quote"""
    try:
        quotation = Quotation.query.filter_by(quote_id=quote_id).first()
        if not quotation:
            return jsonify({'error': 'Quotation not found'}), 404
        
        return jsonify({
            'quotation': quotation.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ==================== USER AUTHENTICATION ROUTES ====================

@app.route('/api/user/signup', methods=['POST'])
def user_signup():
    """User signup endpoint"""
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    
    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required'}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'An account with this email already exists'}), 409
    
    # Create new user
    user = User(name=name, email=email, phone=phone)  # type: ignore
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    # Auto-login after signup
    session['user_id'] = user.id
    session['user_email'] = user.email
    session.permanent = True
    
    return jsonify({
        'message': 'Account created successfully',
        'user': user.to_dict()
    }), 201


@app.route('/api/user/login', methods=['POST'])
def user_login():
    """User login endpoint"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        session['user_id'] = user.id
        session['user_email'] = user.email
        session.permanent = True
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict()
        }), 200
    
    return jsonify({'error': 'Invalid email or password'}), 401


@app.route('/api/user/logout', methods=['POST'])
def user_logout():
    """User logout endpoint"""
    session.pop('user_id', None)
    session.pop('user_email', None)
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/api/user/check', methods=['GET'])
def user_check():
    """Check if user is authenticated"""
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            return jsonify({'authenticated': True, 'user': user.to_dict()}), 200
    return jsonify({'authenticated': False}), 200


@app.route('/api/user/profile', methods=['GET'])
@user_login_required
def user_profile():
    """Get user profile with their quotes and status tracking"""
    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get all quotes linked to this user
    quotes = QuoteRequest.query.filter_by(user_id=user.id).order_by(QuoteRequest.created_at.desc()).all()
    
    # Also try to find quotes by matching email (for quotes submitted before signup)
    email_quotes = QuoteRequest.query.filter_by(email=user.email, user_id=None).order_by(QuoteRequest.created_at.desc()).all()
    
    # Link orphan quotes to user
    for q in email_quotes:
        q.user_id = user.id
    if email_quotes:
        db.session.commit()
        quotes = QuoteRequest.query.filter_by(user_id=user.id).order_by(QuoteRequest.created_at.desc()).all()
    
    return jsonify({
        'user': user.to_dict(),
        'quotes': [q.to_dict() for q in quotes]
    }), 200


@app.route('/api/user/quotes/<int:quote_id>/documents', methods=['POST'])
@user_login_required
def upload_user_documents(quote_id):
    """Upload documents to an existing quote (user must own the quote)"""
    user_id = session['user_id']
    quote = QuoteRequest.query.get_or_404(quote_id)
    
    # Verify ownership
    if quote.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    file_fields = {
        'cnicFront': 'cnic_front_path',
        'cnicBack': 'cnic_back_path',
        'landRegistry': 'land_registry_path',
        'electricityBill': 'electricity_bill_path'
    }
    
    uploaded = []
    for field_name, db_field in file_fields.items():
        if field_name in request.files:
            file = request.files[field_name]
            if file and file.filename:
                if allowed_file(file.filename):
                    try:
                        filename = secure_filename(f"{quote.id}_{field_name}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{file.filename}")
                        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                        file.save(filepath)
                        setattr(quote, db_field, filename)
                        uploaded.append(field_name)
                    except Exception as e:
                        print(f"Error saving file {field_name}: {str(e)}")
    
    quote.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        'message': f'{len(uploaded)} document(s) uploaded successfully',
        'uploaded': uploaded,
        'quote': quote.to_dict()
    }), 200


# ==================== INITIALIZATION ====================

def init_db():
    """Initialize database and create default admin"""
    with app.app_context():
        # Create all tables (works with both SQLite and PostgreSQL/Supabase)
        db.create_all()
        print("[Init DB] All tables created / verified via SQLAlchemy.")
        
        # Create default admin if not exists
        if not Admin.query.filter_by(username='admin').first():
            admin = Admin(  # type: ignore
                username='admin',
                email='admin@almuslimengineering.com',
                full_name='Administrator'
            )
            admin.set_password('admin123')  # Change this in production!
            db.session.add(admin)
            db.session.commit()
            print("Default admin created: username='admin', password='admin123'")


# ==================== RUN APPLICATION ====================

if __name__ == '__main__':
    try:
        init_db()
        print("=" * 50)
        print("AL-MUSLIM ENGINEERING - BACKEND SERVER")
        print("=" * 50)
        print("Server running on http://localhost:5000")
        print("Default Admin Credentials:")
        print("  Username: admin")
        print("  Password: admin123")
        print("=" * 50)
        print("Press Ctrl+C to stop the server")
        print("=" * 50)
        app.run(debug=True, port=5000, host='0.0.0.0', use_reloader=False)
    except Exception as e:
        print(f"Error starting server: {e}")
        import traceback
        traceback.print_exc()


from app import app, db, Admin
from config import ProductionConfig
import os

def fix_admin():
    # Force the app to use the ProductionConfig so it connects to Supabase 
    app.config.from_object(ProductionConfig)
    
    # Manually fix the URI to use pg8000
    uri = app.config['SQLALCHEMY_DATABASE_URI']
    if uri.startswith("postgresql://"):
        app.config['SQLALCHEMY_DATABASE_URI'] = uri.replace("postgresql://", "postgresql+pg8000://", 1)

    # Disable SSL requirement for pooler or ensure pg8000 handles it by appending sslmode if needed
    # Actually pg8000 usually handles it, but let's see.
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'connect_args': {'ssl_context': True}}
    
    with app.app_context():
        print("Connecting to DB:", app.config['SQLALCHEMY_DATABASE_URI'])
        
        # Check if admin exists
        admin = Admin.query.filter_by(username='admin').first()
        if not admin:
            print("Admin not found. Creating...")
            admin = Admin(username='admin', email='admin@example.com', full_name='System Admin')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print("Created admin successfully.")
        else:
            print("Admin exists. Updating password...")
            admin.set_password('admin123')
            db.session.commit()
            print("Updated admin password successfully.")

if __name__ == '__main__':
    fix_admin()

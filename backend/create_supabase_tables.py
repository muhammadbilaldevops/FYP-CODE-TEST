"""
Utility script to create all database tables on the currently configured
SQLAlchemy database (e.g., your Supabase Postgres instance).

Usage:
    cd backend
    python create_supabase_tables.py
"""

from app import app, db, describe_database_uri  # type: ignore


def main():
    masked_uri = describe_database_uri(app.config.get('SQLALCHEMY_DATABASE_URI'))
    print(f"[Create Tables] Target database: {masked_uri}")
    with app.app_context():
        db.create_all()
        print("[Create Tables] All SQLAlchemy models have been created.")


if __name__ == '__main__':
    main()



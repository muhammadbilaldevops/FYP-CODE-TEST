-- SQL schema for Supabase Postgres (matches backend SQLAlchemy models)
-- Run inside the Supabase SQL Editor if you ever need to create the tables manually.

CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS quote_request (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100),
    address TEXT NOT NULL,
    project_type VARCHAR(50) NOT NULL,
    system_size DOUBLE PRECISION NOT NULL,
    monthly_bill DOUBLE PRECISION,
    roof_area DOUBLE PRECISION,
    property_type VARCHAR(50),
    installation_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'normal',
    admin_notes TEXT,
    estimated_cost DOUBLE PRECISION,
    cnic_front_path VARCHAR(500),
    cnic_back_path VARCHAR(500),
    land_registry_path VARCHAR(500),
    electricity_bill_path VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    contacted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS contact_message (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    client_name VARCHAR(100),
    location VARCHAR(200),
    capacity DOUBLE PRECISION,
    system_type VARCHAR(50),
    completion_date DATE,
    description TEXT,
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotation (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL REFERENCES quote_request(id) ON DELETE CASCADE,
    quotation_number VARCHAR(100) UNIQUE NOT NULL,
    quotation_data TEXT,
    selected_kw VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);



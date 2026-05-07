content = r"""

---

# SECTION 20: 20 IN-DEPTH BACKEND QUESTIONS

---

### BE-Q1: What is Flask and why was it chosen?

**What Flask is:** Flask is a Python web framework. A framework is a set of pre-built tools that let you build a web server quickly. Flask is called a "micro-framework" because it gives you only the essentials (handle URLs, receive data, send responses) and lets you add extras as needed.

**Why Flask was chosen over others:**
- It is lightweight and easy to learn compared to Django (which comes with built-in admin panels we don't need)
- Python has excellent libraries for security (Werkzeug) and databases (SQLAlchemy)
- Flask lets us design every part of the system ourselves, giving full control

**File:** `backend/app.py` (1065 lines - the entire backend)

**To make a change:** All backend logic is in `app.py`. If you want to add a new feature, add a new route function in this file.

---

### BE-Q2: How does Flask receive data from React?

**Simple explanation:** When a user submits a form or clicks a button on the website, React sends an HTTP request to Flask. Think of it like sending a letter - the address is the API URL, the stamp is the method (GET, POST, PUT, DELETE), and the content is the data.

**Two types of data Flask receives:**
1. **JSON data** (for simple text like login credentials) - Flask reads it with `request.get_json()`
2. **FormData** (for text + file uploads like the quote form) - Flask reads text with `request.form.get()` and files with `request.files.get()`

**The key detail:** Every request from React includes `credentials: 'include'`, which tells the browser to send the session cookie. Without this, Flask wouldn't know who is making the request.

**File:** `backend/app.py` - every `@app.route()` function

**To make a change:** To accept a new field, add `new_field = data.get('new_field')` inside the route function.

---

### BE-Q3: What is a route in Flask?

**Simple explanation:** A route is like a door with a sign on it. The sign says what type of requests are welcome and what will happen when you come through.

**Example from the project:**
The door at `/api/quotes` with a POST sign says: "If you bring me form data, I will save a new quote request."
The door at `/api/admin/stats` with a GET sign says: "If you are an admin, I will give you the dashboard numbers."

**How routes are defined:** Every route has a decorator (`@app.route('/api/...')`) above a Python function. The decorator tells Flask which URL and which HTTP method trigger this function.

**File:** `backend/app.py`

**To add a new route:**
1. Write a function with `@app.route('/api/your-url', methods=['GET'])` above it
2. Inside, process data and return `jsonify({'result': 'ok'}), 200`

---

### BE-Q4: How does Flask know if someone is logged in?

**Simple explanation:** Flask uses sessions - think of it like a wristband at a theme park. When you log in, Flask gives your browser an encrypted cookie (the wristband). Every time your browser makes a request, it automatically shows this wristband. Flask reads it and knows who you are.

**Two decorators protect routes:**
- `@login_required` - checks for `admin_id` in the session (admin routes)
- `@user_login_required` - checks for `user_id` in the session (user routes)

If the session doesn't have the required ID, Flask immediately returns a 401 Unauthorized error - the data is never sent.

**File:** `backend/app.py` (lines 263-280 for decorators)

**To protect a new route:** Simply add `@login_required` above your route function.

---

### BE-Q5: How does password hashing work in this project?

**Simple explanation:** When a user creates an account with password "hello123", Flask does NOT store "hello123" in the database. Instead, it runs the password through a mathematical scrambling process (Werkzeug's PBKDF2-SHA256 algorithm) that produces something like `pbkdf2:sha256:260000$abc$xyz...`

This scrambling is one-way - you cannot reverse it to get the original password. When the user logs in next time, Flask scrambles their input again and checks if the result matches the stored scramble. If yes, login succeeds.

**Why this matters:** Even if hackers steal the database, they only get scrambled hashes, not actual passwords. Each hash also includes a random "salt" so two users with the same password get different hashes.

**File:** `backend/app.py` - `set_password()` and `check_password()` methods on the Admin and User models

**To change password requirements:** Add a length check in the signup route: `if len(password) < 8: return error`

---

### BE-Q6: How does file upload security work?

**Simple explanation:** When customers upload their CNIC or electricity bill, Flask runs two safety checks before saving:

**Check 1 - Extension filter:** Only `.jpg`, `.jpeg`, `.png`, `.gif`, `.pdf` files are accepted. If someone tries to upload a dangerous `.exe` or `.php` file, it's rejected immediately.

**Check 2 - Filename cleaning:** A library called `secure_filename()` strips dangerous characters from filenames. If someone names their file `../../etc/passwords.jpg` (trying to save outside the uploads folder), the function removes all the `../` parts.

**Unique filenames:** Each file is renamed to include the quote ID, field name, and timestamp: `5_cnicFront_20240507_original.jpg` - this prevents two customers from overwriting each other's files.

**File:** `backend/app.py` - `create_quote()` function and `allowed_file()` helper

**To allow a new file type:** Add the extension to `ALLOWED_EXTENSIONS` in `backend/config.py`

---

### BE-Q7: What is CORS and why does the backend need it?

**Simple explanation:** CORS (Cross-Origin Resource Sharing) is a browser security rule. When React runs on `localhost:5173` and tries to call Flask on `localhost:5000`, the browser blocks it because they are on different "origins" (different port numbers count as different).

Flask uses the `Flask-CORS` library to add a permission header to every response: "I allow requests from localhost:5173." The browser sees this and stops blocking.

**Critical setting:** `supports_credentials=True` - without this, the browser won't send cookies, and sessions (login) won't work at all.

**File:** `backend/config.py` for the list of allowed origins, `backend/app.py` line ~71 for the CORS setup

**To add a new frontend domain:** Add the URL to `CORS_ORIGINS` list in `backend/config.py`

---

### BE-Q8: How does the admin stats endpoint calculate numbers?

**Simple explanation:** The `/api/admin/stats` endpoint counts records in the database using different filters:

- Total quotes = count all rows in quote_request table
- Pending = count rows where status is 'pending'
- Approved = count rows where status is 'approved'
- Declined = count rows where status is 'declined'
- Unread messages = count rows in contact_message where status is 'unread'
- Recent = count quotes created in the last 7 days

Each of these is a simple database query that counts matching records. SQLAlchemy translates the Python code into SQL `SELECT COUNT(*)` queries automatically.

**File:** `backend/app.py` - `get_dashboard_stats()` function

**To add a new statistic:** Add another count query and include it in the returned JSON dictionary.

---

### BE-Q9: How does the quote status update (approve/decline) work?

**Step by step:**
1. Admin clicks "Approve" on a quote in the dashboard
2. React sends a PUT request to Flask with `{ status: 'approved' }`
3. Flask finds the quote by its ID in the database
4. Flask updates the `status` field to 'approved'
5. Flask also sets `updated_at` to the current time
6. If the status is 'contacted', Flask additionally saves the `contacted_at` timestamp
7. Flask commits the change to the database
8. Flask returns "success" to React
9. React refreshes the dashboard data to show the updated status badge

**File:** `backend/app.py` - the PUT endpoint for quote status

**To add a new status option:** Simply use any new string value (e.g., 'in_progress'). The status field accepts any text. You'd also add a new badge color in `AdminDashboardPage.jsx` on the frontend.

---

### BE-Q10: How does the quotation save and retrieve work?

**Saving flow:**
1. Admin creates a quotation in the QuotationGenerator component
2. React sends the full quotation data (panels, prices, client info) as JSON to Flask
3. Flask checks if a quotation already exists for this quote - if yes, it updates it; if no, it creates a new one
4. The entire quotation data is converted to a JSON string and stored in one text column
5. Flask also updates the estimated cost on the original quote record

**Retrieving flow:**
1. Admin opens a quote that has a saved quotation
2. React requests the quotation from Flask
3. Flask reads the JSON string from the database, converts it back to a data object, and sends it to React
4. The QuotationGenerator pre-fills with all the saved data - no need to re-enter anything

**File:** `backend/app.py` - `save_quotation()` and `get_quotation()` functions

**To change what's saved:** Modify the quotation data structure in `QuotationGenerator.jsx` (frontend) and the data will automatically be saved as JSON.

---

### BE-Q11: How does the orphan quote linking work in the user profile endpoint?

**The scenario:** Ali submits a quote as a guest (no account) using email `ali@gmail.com`. A week later, Ali creates an account with the same email.

**What Flask does automatically:**
1. When Ali loads his dashboard, Flask runs `GET /api/user/profile`
2. Flask first gets all quotes already linked to Ali's user ID
3. Then Flask searches for any quotes with email `ali@gmail.com` that have NO user ID (orphans)
4. It sets their `user_id` to Ali's ID and saves the change
5. Now Ali sees all his old and new quotes in his dashboard

**Why this is smart:** No data is ever lost. Even if the customer didn't have an account when they submitted, their quotes appear automatically once they sign up with the same email.

**File:** `backend/app.py` - `user_profile()` function

**To change the matching logic:** Currently it matches by email. You could also match by phone number by adding another query.

---

### BE-Q12: How does the database initialization work on server startup?

**What happens when the server starts:**
1. The `init_db()` function runs at the bottom of `app.py` (outside any route, so it runs on import)
2. `db.create_all()` checks all model classes and creates any tables that don't exist yet. If tables already exist, it does nothing (safe to run repeatedly)
3. Flask checks if a default admin user exists. If not, it creates one with username 'admin' and password 'admin123'
4. This runs on every startup whether you use `python app.py` locally or Gunicorn in production

**File:** `backend/app.py` - `init_db()` function at lines 1016-1033

**To change the default admin credentials:** Edit the username and password in `init_db()` before the first deployment. After that, changes must be made directly in the database.

---

### BE-Q13: How does Flask serve uploaded files back to the admin?

**The problem:** Files are stored in the `backend/uploads/` folder. The admin dashboard needs to display CNIC images and download electricity bills.

**The solution:** Flask has a route `GET /api/admin/quotes/<id>/files/<type>` that:
1. Looks up the quote by ID
2. Reads the filename stored in the database (e.g., `5_cnicFront_20240507_ali.jpg`)
3. Uses `send_from_directory()` to serve the file from the uploads folder
4. The browser receives the file and either displays it (images) or downloads it (PDFs)

**Security:** The `@login_required` decorator ensures only authenticated admins can access uploaded documents. Regular users cannot download other users' files.

**File:** `backend/app.py` - the file serving route

**To change the uploads folder location:** Edit `UPLOAD_FOLDER` in `backend/config.py`

---

### BE-Q14: How does the contact message endpoint work?

**When a customer sends a message:**
1. They fill the Contact form with name, email, phone, subject, and message
2. React sends this as JSON to `POST /api/contact`
3. Flask creates a new `ContactMessage` record with status set to 'unread'
4. Flask commits to the database and returns success

**When admin views messages:**
1. Admin dashboard calls `GET /api/admin/messages`
2. Flask fetches all contact messages ordered by newest first
3. Returns them as a JSON list
4. The dashboard shows unread ones with a red badge

**File:** `backend/app.py` - contact message routes

**To add an email notification when a message arrives:** You would import `Flask-Mail`, configure SMTP settings in `config.py`, and add `mail.send()` after the `db.session.commit()` in the contact route.

---

### BE-Q15: How does the admin delete a quote?

**Step by step:**
1. Admin clicks the Delete button on a quote
2. React shows a confirmation popup ("Are you sure?")
3. If confirmed, React sends `DELETE /api/admin/quotes/<id>` to Flask
4. Flask finds the quote by ID
5. Flask deletes the record from the database
6. Flask commits the change
7. Returns success
8. React refreshes the dashboard

**Important:** The file uploads associated with that quote are NOT automatically deleted from the filesystem. They remain in the `uploads/` folder. This is a known limitation - a future improvement would be to also delete the associated files.

**File:** `backend/app.py` - the DELETE endpoint for quotes

---

### BE-Q16: How does the config.py file work?

**What it does:** `config.py` keeps all settings in one place so they are easy to find and change. It reads sensitive values from environment variables (`.env` file) so passwords are never hardcoded in the code.

**Key settings:**
- `SECRET_KEY` - used to encrypt session cookies (must be kept secret)
- `DATABASE_URL` - connection string for SQLite (local) or PostgreSQL (production)
- `CORS_ORIGINS` - list of frontend URLs allowed to call the API
- `UPLOAD_FOLDER` - path where uploaded files are saved
- `ALLOWED_EXTENSIONS` - which file types can be uploaded
- `PERMANENT_SESSION_LIFETIME` - how long sessions last before expiring

**File:** `backend/config.py`

**To change any setting:** Edit `config.py` or set the corresponding environment variable in `.env`. Environment variables take priority over hardcoded defaults.

---

### BE-Q17: What is jsonify and why is it used everywhere?

**Simple explanation:** `jsonify()` is a Flask function that converts Python dictionaries and lists into JSON format and creates an HTTP response with the correct headers (Content-Type: application/json).

**Why it's needed:** React's `fetch()` expects JSON responses. If Flask returned plain text or raw Python objects, React wouldn't be able to parse them properly.

**The pattern used everywhere:**
- Success: `return jsonify({'message': 'Quote submitted', 'quote': data}), 201`
- Error: `return jsonify({'error': 'Email already exists'}), 409`

The second number is the HTTP status code. React checks this to determine if the request succeeded or failed.

**File:** Used in every route function in `backend/app.py`

---

### BE-Q18: How does the to_dict() method work on database models?

**The problem:** Flask's `jsonify()` cannot directly convert SQLAlchemy model objects into JSON. A QuoteRequest object is a complex Python class - JSON only understands simple types (strings, numbers, lists, dictionaries).

**The solution:** Every model has a `to_dict()` method that manually builds a simple dictionary from the object's fields.

**Important details:**
- `password_hash` is intentionally excluded - it never appears in API responses
- `datetime` fields are converted to ISO 8601 string format using `.isoformat()` so JavaScript can parse them with `new Date()`
- Only relevant fields are included, keeping responses clean and secure

**File:** `backend/app.py` - inside each model class (User, QuoteRequest, ContactMessage, Quotation)

**To add a new field to API responses:** Add it to the return dictionary in `to_dict()`.

---

### BE-Q19: How does error handling work in the backend?

**Overview:** All route functions use try-catch blocks to handle unexpected errors gracefully.

**The pattern:**
1. The route function wraps its logic in `try:`
2. If anything fails, the `except` block catches the error
3. If a database operation failed, `db.session.rollback()` undoes any partial changes
4. Flask returns a JSON error response: `{'error': str(e)}` with status code 500

**Specific error handling:**
- Missing required fields: returns 400 (Bad Request) with a message saying which field is missing
- Duplicate email on signup: returns 409 (Conflict)
- Wrong password on login: returns 401 (Unauthorized) - intentionally vague ("Invalid email or password") to prevent email enumeration
- Record not found: `query.get_or_404(id)` automatically returns 404 if the ID doesn't exist

**File:** Every route in `backend/app.py`

---

### BE-Q20: How does the project handle the database connection in both development and production?

**Development (local):**
- `DATABASE_URL` in `.env` is set to `sqlite:///./almuslim_solar.db`
- SQLite stores everything in one file in the `backend/` folder
- No separate database server needed - perfect for development

**Production (deployed):**
- `DATABASE_URL` in `.env` is set to `postgresql://user:password@host:port/dbname` (Supabase URL)
- Flask connects to a cloud database over the internet
- Same Python code works with both - SQLAlchemy translates commands into the correct SQL dialect

**The only change needed:** Swap the `DATABASE_URL` value in `.env`. No Python code changes required.

**File:** `backend/config.py` reads `os.getenv('DATABASE_URL')` and passes it to SQLAlchemy

**To switch databases:** Simply change the `DATABASE_URL` environment variable. Run `init_db()` once to create tables in the new database.

"""

with open('d:/Coding/Cursor Code/Practice/FYP_Q&A.md', 'ab') as f:
    f.write(content.encode('utf-8'))
print("Backend questions appended successfully")

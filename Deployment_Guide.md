# Ultimate Deployment Guide (For Beginners)

npm run dev

# Navigate to the backend directory
cd backend

# Activate your virtual environment and start the Flask server
..\.venv\Scripts\Activate.ps1
python app.py


> **Important Note about Vercel:** 
> Vercel is the best platform in the world for **Frontend (React/Vite)**. However, it is **NOT** built for Python Backends that save uploaded files or use SQLite matching your project perfectly. Vercel uses "Serverless Functions" which means the server deletes itself after every single request. If a customer uploaded their CNIC or if we saved data to `almuslim_solar.db`, it would be completely erased in 10 seconds! 
> 
> Therefore, the industry-standard way to deploy a Full-Stack application like yours is:
> 1. **Database:** Supabase (Free Cloud PostgreSQL)
> 2. **Backend (Python):** Render.com (Keeps your server running and saves files)
> 3. **Frontend (React):** Vercel (Super fast website hosting)

Follow this step-by-step guide to get everything online for free!

---

## Step 1: Upload Your Code to GitHub (Required for everything)

Before deploying, your code needs to be on GitHub. Both Vercel and Render will pull the code directly from there.

1. Create a free account on [GitHub](https://github.com/signup).
2. Download and install [GitHub Desktop](https://desktop.github.com/).
3. Open GitHub Desktop → File → "Add Local Repository" → Select your `Practice` folder.
4. It will ask if you want to create a repository. Click **"create a repository"**.
5. Name it `al-muslim-solar`.
6. At the bottom left, type "Initial Commit" and click **Commit to main**.
7. Click **"Publish repository"** at the top right. (Keep "Keep this code private" unchecked if you want it public, or checked to keep it hidden).

*Your code is now safely backed up on GitHub!*

---

## Step 2: Setup the Database (Supabase)

We need a real database that won't delete itself. Supabase gives you a free PostgreSQL database.

1. Go to [Supabase.com](https://supabase.com/) and sign in with GitHub.
2. Click **"New Project"**.
3. Select your organization, name it `al-muslim-solar`, and set a strong database password (save this password somewhere safe!).
4. Choose the region closest to you (e.g., Mumbai or Singapore for Asia).
5. Click **"Create new project"** (it will take a few minutes to setup).
6. Once ready, click on **Settings** (gear icon on the bottom left) → **Database**.
7. Under "Connection string", look for the **URI** section. It will look like this:
   `postgresql://postgres.xxx:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`
8. Copy this URI and replace `[YOUR-PASSWORD]` with the actual password you created in Step 3. **Change the `postgresql://` part at the very beginning to `postgresql+pg8000://`**. 
   *(This is the URL your Python backend will use to connect).*

---

## Step 3: Deploy the Backend (Render.com)

1. Go to [Render.com](https://render.com/) and sign in with GitHub.
2. Click **"New"** and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and click Next.
4. Connect your GitHub account and select your `al-muslim-solar` repository.
5. Fill out the form:
   - **Name:** `al-muslim-solar-backend`
   - **Root Directory:** Type `backend` (very important!)
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app` *(Note: you will need to add gunicorn to your `requirements.txt` file first by running `pip install gunicorn` and `pip freeze > requirements.txt` before pushing to GitHub).*
6. Scroll down to **Environment Variables** and click "Add Environment Variable":
   - **Key 1:** `FLASK_ENV` | **Value 1:** `production`
   - **Key 2:** `DATABASE_URL` | **Value 2:** *(Paste the Supabase URI from Step 2 here)*
   - **Key 3:** `SECRET_KEY` | **Value 3:** `any-random-long-password-here`
7. Click **"Create Web Service"**.
8. It will take a few minutes to build. Once done, you will see a green "Live" badge and a URL at the top left (e.g., `https://al-muslim-solar-backend.onrender.com`).
9. **Save this Backend URL.**

---

## Step 4: Deploy the Frontend (Vercel)

Now we connect your React website to the backend we just launched. Before doing this, you must tell your frontend where the live backend is!

1. In your code editor, open `src/config/api.js` (or whichever file holds your API URL).
2. Change the API URL from `http://localhost:5000` to the Render URL you saved in Step 3 (`https://al-muslim-solar-backend.onrender.com`).
3. Open GitHub Desktop and commit + push these changes to GitHub.

**Now deploy to Vercel:**
1. Go to [Vercel.com](https://vercel.com/) and sign up with GitHub.
2. Click **"Add New..."** → **"Project"**.
3. Import your `al-muslim-solar` GitHub repository.
4. In the configuration page:
   - **Framework Preset:** Vercel should auto-detect **Vite**.
   - **Root Directory:** Leave it as `./`
   - **Build Command:** Leave as default (`npm run build`)
5. Click **"Deploy"**.
6. Wait 1-2 minutes. Vercel will build your website and give you a live `.vercel.app` link. 

---

## Step 5: CORS Security (Final Link)

Right now, your Backend on Render is blocking requests from Vercel for security. We need to tell the Backend that Vercel is "safe".

1. Copy your new Vercel frontend URL (e.g., `https://al-muslim-solar.vercel.app`).
2. Go back to your Python code.
3. In `backend/config.py`, find the `CORS_ORIGINS` list.
4. Add your Vercel URL to the list:
   ```python
   CORS_ORIGINS = [
       'http://localhost:5173',
       'https://al-muslim-solar.vercel.app'  # <-- Add this!
   ]
   ```
5. Save the file, open GitHub Desktop, and Commit + Push to GitHub.
6. **Render will automatically detect the change and restart your backend!**

---

### Congratulations! 🎉

Your complete application is now live on the internet! 
- Your customers can visit the **Vercel** link to view the website.
- The website talks to the **Render** backend to process quotes.
- The backend saves the quotes safely in the **Supabase** database.

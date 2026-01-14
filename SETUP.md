# Listen to Learn - Setup Guide

Complete step-by-step instructions to get Listen to Learn running on your machine.

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v14+) - Download from [nodejs.org](https://nodejs.org)
- **Git** - Download from [git-scm.com](https://git-scm.com)
- **A Google Account** - For Firebase
- **A web browser** (Chrome, Firefox, Safari, Edge)

## Step 1: Get the Code

```bash
cd "Listen to Learn"
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs Firebase CLI and other necessary packages.

## Step 3: Set Up Firebase

### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `listen-to-learn-project`
4. Follow the setup wizard
5. Select your region (usually your location)
6. Complete project creation

### 3.2 Enable Firebase Services

1. **Authentication:**
   - In Firebase Console, go to "Authentication"
   - Click "Get started"
   - Enable "Google"
   - Enable "Email/Password"
   - Copy your Web API Key (you'll need this later)

2. **Firestore Database:**
   - Go to "Firestore Database"
   - Click "Create database"
   - Choose location (use default recommended)
   - Start in **Test mode** for development
   - Click "Create"

3. **Cloud Storage:**
   - Go to "Storage"
   - Click "Get started"
   - Use default bucket name
   - Choose location (same as Firestore)
   - Click "Done"

### 3.3 Get Your Firebase Credentials

1. In Firebase Console, click the gear icon ⚙️ → Project Settings
2. Scroll to "Your apps" section
3. Look for the web app (or create one by clicking `</>`):
   - App nickname: `listen-to-learn-web`
   - Check "Also set up Firebase Hosting"
   - Continue

4. Copy the Firebase configuration:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Configure the App

### 4.1 Update Firebase Configuration

1. Open `public/js/firebase-config.js`
2. Replace the `firebaseConfig` object with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...", // Your API Key
  authDomain: "listen-to-learn-project.firebaseapp.com",
  projectId: "listen-to-learn-project",
  storageBucket: "listen-to-learn-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

3. Save the file

### 4.2 Update Firestore Rules

1. In Firebase Console, go to "Firestore Database" → "Rules"
2. The current rules should already be in `firestore.rules`
3. Click "Publish" to deploy the security rules
4. Confirm the update

## Step 5: Set Up Firebase CLI

### 5.1 Login with Firebase CLI

```bash
firebase login
```

This opens a browser to authenticate with your Google account.

### 5.2 Initialize Your Project

```bash
firebase init
```

Follow the prompts:
- **Which Firebase features do you want?** - Select:
  - Hosting: Configure and deploy Firebase Hosting sites
  - Firestore: Configure security rules and indexes
  - Storage: Configure rules for Cloud Storage

- **Select a default Firebase project** → Choose your `listen-to-learn-project`

- **What do you want to use as your public directory?** → Type: `public`

- **Configure as single-page app?** → Type: `Y` (yes)

- **Set up automatic builds and deploys with GitHub?** → Type: `N` (no for now)

- **File public/index.html already exists. Overwrite?** → Type: `N` (no)

This creates the necessary Firebase configuration files.

## Step 6: Verify Setup

```bash
firebase status
```

You should see your project name and confirmation that it's connected.

## Step 7: Run Locally

### Option A: Using Firebase Emulator

```bash
firebase emulators:start
```

This runs the app locally with Firebase emulation. Open `http://localhost:5000`

### Option B: Using Python Server

```bash
python -m http.server 8000 --directory public
```

Then open `http://localhost:8000`

### Option C: Using Node HTTP Server

```bash
npx http-server public -p 8000
```

Then open `http://localhost:8000`

## Step 8: Test the App

1. **Sign Up:**
   - Click "Sign Up" in the navbar
   - Use the email/password form OR sign in with Google
   - Complete the onboarding

2. **Create a Subject:**
   - Click "+ Add Subject"
   - Add "Biology" (or your choice)

3. **Record a Lecture:**
   - Click "+ New Lecture"
   - Select "Record" tab
   - Enter title: "Test Lecture"
   - Select the subject
   - Click "Start Recording"
   - Say something for 10 seconds
   - Click "Stop"
   - Click "Create Lecture"

4. **View Lecture:**
   - Click on your new lecture
   - Add some notes
   - Add key ideas
   - Test the study tools

## Step 9: Deploy to Firebase Hosting

Once everything works locally:

```bash
firebase deploy
```

This deploys your app to:
`https://listen-to-learn-project.web.app`

The deployment includes:
- Static hosting (HTML, CSS, JS)
- Firestore database
- Storage bucket
- Authentication

## Troubleshooting

### Firebase Credentials Not Working?

1. Check your `firebaseConfig` object is exactly as provided
2. Verify Project ID is correct (not project number)
3. Ensure all Firebase services are enabled

### Microphone Permission Denied?

1. Check browser permissions (usually top-left/right of address bar)
2. Grant permission to access microphone
3. Try incognito/private mode
4. Try a different browser

### Firestore Rules Error?

1. Go to Firebase Console → Firestore Database → Rules
2. Click "Publish" to deploy `firestore.rules`

### Firebase CLI Not Found?

```bash
npm install -g firebase-tools
firebase login
```

### CORS Errors?

- This typically means Firebase configuration is incorrect
- Double-check all values in `firebaseConfig`

### Storage Upload Fails?

1. Check Storage is enabled in Firebase
2. Verify rules allow uploads
3. Check file size (should be < 100MB)

## Customization

### Change App Title

Edit `public/index.html`:
```html
<title>My Learning App - Turn Lectures into Learning</title>
```

### Change Colors

Edit `public/css/global.css`:
```css
:root {
  --primary: #4F46E5; /* Change this color */
  --secondary: #EC4899;
  ...
}
```

### Add Your Logo

1. Place your image in `public/assets/`
2. Update HTML to use your image:
```html
<span class="logo-text">
  <img src="assets/logo.png" alt="Logo" style="height: 30px;">
  Listen to Learn
</span>
```

## Next Steps

1. **Customize the app** - Change colors, fonts, and branding
2. **Add more features** - Check the roadmap in README.md
3. **Invite friends** - Share the URL and have them sign up
4. **Collect feedback** - See what students find most useful

## Database Backup

To backup your Firestore data:

```bash
firebase firestore:export backup/
```

To restore:

```bash
firebase firestore:import backup/
```

## Monitoring

Check your Firebase usage:
1. Go to Firebase Console
2. Check "Storage" for file sizes
3. Check "Firestore" for database usage
4. Check "Authentication" for user count

Free tier includes:
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1GB storage

## Getting Help

If you get stuck:
1. Check the [Firebase Docs](https://firebase.google.com/docs)
2. Review the [README.md](README.md)
3. Check console for error messages (F12 → Console)
4. Search for the error message online

---

**You're all set!** Your Listen to Learn app is ready to help students learn better. 🎧📘

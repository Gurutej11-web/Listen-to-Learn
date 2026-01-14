# 🎧📘 Listen to Learn

**A student-first lecture companion built entirely with Firebase**

Turn lectures into clean, structured learning materials. Record or upload lectures, organize them automatically, highlight key concepts, create flashcards, and study smarter.

## ✨ Features

### Core Features
- 🎤 **Record Lectures** - Use your browser's microphone to record lectures directly
- 📁 **Upload Audio** - Upload MP3, WAV, M4A, or OGG files from Zoom, Teams, or anywhere
- 📝 **Structured Notes** - Automatically organized notes with topics, subtopics, and bullet points
- 💡 **Key Ideas** - Extract and highlight the concepts that matter most
- 🔬 **Deep Dives** - Expand topics with simplified explanations and examples
- 📚 **Vocabulary** - Build a glossary of important terms linked to your notes
- 🎯 **Study Tools** - Highlighting, flashcards, and quick-review mode
- 🏫 **Organization** - Create subjects, organize lectures, and search across all notes
- 🌙 **Dark Mode** - Easy on the eyes, designed for focus

### Technical Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Authentication**: Firebase Authentication (Google Sign-In, Email/Password)
- **Database**: Firestore Database
- **Storage**: Firebase Cloud Storage
- **Hosting**: Firebase Hosting
- **APIs**: Web Audio API, File API, Firestore API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Firebase project (free tier)
- A Google account for Firebase setup

### Installation

1. **Clone the repository**
   ```bash
   cd "Listen to Learn"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable the following services:
     - Authentication (Google Sign-In, Email/Password)
     - Firestore Database
     - Cloud Storage

4. **Configure Firebase**
   - In the Firebase console, go to Project Settings
   - Copy your Firebase configuration
   - Update the `firebaseConfig` in `public/js/firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_ID",
     appId: "YOUR_APP_ID"
   };
   ```

5. **Setup Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
   ```
   - Select Hosting, Firestore, and Storage
   - Use `public` as your public directory
   - Configure as a single-page app

6. **Run Locally**
   ```bash
   firebase serve
   ```
   Or use Python's simple server:
   ```bash
   python -m http.server 8000 --directory public
   ```
   Open `http://localhost:8000` in your browser

### Deploy to Firebase Hosting

1. **Build (no build step needed for vanilla JS)**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   firebase deploy
   ```

3. Your app will be live at `https://YOUR_PROJECT.web.app`

## 📖 Usage Guide

### For Students

**Recording a Lecture:**
1. Click "+ New Lecture" on the dashboard
2. Click the "Record" tab
3. Enter the lecture title and select your subject
4. Click "Start Recording" to begin
5. Click "Stop" when done
6. Click "Create Lecture" to save

**Uploading a Lecture:**
1. Click "+ New Lecture" on the dashboard
2. Click the "Upload" tab
3. Select your audio file (MP3, WAV, M4A, OGG)
4. Click "Create Lecture"

**Taking Notes:**
1. Open a lecture from your dashboard
2. Click "Edit" to enter note-taking mode
3. Write your notes in the editor
4. Click "View" to save and display formatted notes

**Adding Key Ideas:**
1. In the lecture workspace, find the "Key Ideas" panel
2. Type an idea and click "+"
3. Your ideas appear in the sidebar and can be converted to flashcards

**Creating Flashcards:**
1. Add key ideas to your lecture first
2. Click "Flashcards" in the study tools
3. Click each card to reveal answers
4. Use for last-minute review

**Deep Dives:**
1. Click "+ Add Deep Dive" in the right sidebar
2. Enter the topic and your explanation
3. Great for expanding complex concepts

**Quick Review:**
1. Click "Quick Review" to see just the bullet points
2. Perfect for last-minute studying before exams

### Organization

**Create Subjects:**
1. Go to your dashboard
2. Click "+ Add Subject"
3. Name your subject (Biology, History, Calculus, etc.)
4. All your lectures will be organized by subject

**Search:**
- Use the search bar (coming soon) to find lectures by title, subject, or content

## 🏗️ Project Structure

```
Listen to Learn/
├── public/
│   ├── index.html          # Main HTML file
│   ├── js/
│   │   ├── firebase-config.js    # Firebase setup
│   │   ├── app.js                # Core app logic
│   │   ├── auth.js               # Authentication handlers
│   │   ├── dashboard.js          # Dashboard functionality
│   │   ├── lecture.js            # Lecture workspace
│   │   ├── audio-recorder.js     # Recording functionality
│   │   └── theme.js              # Dark mode
│   └── css/
│       ├── global.css            # Global styles
│       ├── pages.css             # Page layouts
│       ├── dashboard.css         # Dashboard styles
│       ├── home.css              # Homepage styles
│       └── lecture.css           # Lecture workspace styles
├── firebase.json           # Firebase config
├── firestore.rules         # Firestore security rules
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔒 Data Structure

### Firestore Collections

**users/**
```
{
  uid: string
  email: string
  displayName: string
  photoURL: string (optional)
  schoolLevel: string (optional)
  subjects: array
  createdAt: timestamp
  updatedAt: timestamp
}
```

**lectures/**
```
{
  userId: string
  title: string
  subject: string
  audioUrl: string
  duration: number (seconds)
  notes: string
  keyIdeas: array
  vocabularyList: array
  deepDives: array
  createdAt: timestamp
}
```

## 🛡️ Security

The app uses Firestore Security Rules to ensure:
- Users can only access their own data
- Lectures are only visible to their creator
- All child collections (notes, highlights) are protected
- Public access is limited to the homepage

See `firestore.rules` for full security implementation.

## 🚧 Roadmap

### Version 1.0 (Current)
- ✅ Audio recording and upload
- ✅ Note organization and editing
- ✅ Key ideas and flashcards
- ✅ Deep dives and vocabulary
- ✅ Subject organization
- ✅ Dark mode
- ✅ Responsive design

### Version 1.1 (Planned)
- 🔄 Live transcription (basic)
- 🔄 AI-powered note summarization
- 🔄 Search across all notes
- 🔄 Collaborative sharing (read-only)
- 🔄 Study streak gamification

### Version 2.0 (Future)
- AI-generated questions and quizzes
- Smart scheduling for spaced repetition
- Peer study groups
- Integration with calendar apps
- PDF export
- Mobile app

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips for Success

1. **Create subjects first** - Organize your classes before recording lectures
2. **Take clear notes** - The better your initial notes, the better your study material
3. **Use key ideas strategically** - Focus on exam-relevant concepts
4. **Review regularly** - Use flashcards for spaced repetition
5. **Organize as you go** - Don't wait until end-of-semester to organize notes

## 🐛 Troubleshooting

### Microphone not working?
- Check that your browser has permission to access the microphone
- Try a different browser
- Ensure no other app is using the microphone

### Audio file not uploading?
- Check file format (must be MP3, WAV, M4A, or OGG)
- Verify file size is under 100MB
- Check internet connection

### Firebase errors?
- Verify your Firebase configuration is correct
- Check that all Firebase services are enabled
- Ensure Firestore rules are properly deployed

### Dark mode not working?
- Clear browser cache and localStorage
- Check that JavaScript is enabled
- Try incognito/private mode

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the FAQ (coming soon)

## 🙏 Acknowledgments

- Built with [Firebase](https://firebase.google.com/)
- Inspired by student learning needs
- Thanks to the open-source community

---

**Listen to Learn** - Because the best way to learn is to listen, organize, and understand. 🎧📘

Made with ❤️ for students everywhere.

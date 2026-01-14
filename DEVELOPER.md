# Listen to Learn - Developer Guide

For developers wanting to understand, extend, or contribute to Listen to Learn.

## Architecture Overview

### Tech Stack
- **Frontend Framework:** Vanilla JavaScript (no dependencies)
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Hosting:** Firebase Hosting
- **UI Framework:** Custom CSS with CSS variables
- **Build Tool:** None (static files, deployed as-is)

### Design Philosophy
1. **Zero Build Step** - Files deployed directly
2. **Minimal Dependencies** - Firebase SDK only
3. **Vanilla JavaScript** - Maximum compatibility
4. **Progressive Enhancement** - Works without all features
5. **Student-First** - Designed for end-users first

---

## Project Structure

```
public/
├── index.html           # Single-page app shell
├── js/                  # JavaScript modules
│   ├── firebase-config.js      # Firebase initialization
│   ├── app.js                  # Core routing & utilities
│   ├── auth.js                 # Authentication UI handlers
│   ├── dashboard.js            # Dashboard functionality
│   ├── lecture.js              # Lecture workspace
│   ├── audio-recorder.js       # Web Audio API
│   └── theme.js                # Dark mode
└── css/                 # Stylesheets
    ├── global.css              # Global styles & variables
    ├── pages.css               # Page layouts (Auth, Nav, Modal)
    ├── dashboard.css           # Dashboard specific
    ├── home.css                # Homepage specific
    └── lecture.css             # Lecture workspace
```

### File Purposes

#### firebase-config.js
```javascript
// Firebase initialization & authentication
- firebaseConfig object
- Firebase service initialization
- Auth state listener
- User profile loading
- Sign-in/sign-up functions
```

#### app.js
```javascript
// Core application logic
- Page routing (navigateTo)
- Message display (showError, showSuccess)
- Utility functions (formatDate, formatDuration)
- Global state management
```

#### auth.js
```javascript
// Authentication UI
- Email sign in/up handlers
- UI state updates based on auth
- Form validation
```

#### dashboard.js
```javascript
// Dashboard features
- Load recent lectures
- Load subjects
- Create lecture card elements
- Manage subjects (create, remove)
- Delete lectures
- Update statistics
```

#### lecture.js
```javascript
// Lecture workspace features
- Initialize lecture from database
- Notes CRUD
- Key ideas CRUD
- Vocabulary CRUD
- Deep dives CRUD
- Study tools (highlight, flashcards, review)
- Export notes
```

#### audio-recorder.js
```javascript
// Web Audio API wrapper
- Start/stop recording
- Audio chunk collection
- Convert to Blob
- Duration tracking
```

#### theme.js
```javascript
// Dark mode
- Initialize from localStorage or system preference
- Toggle dark mode
- Persist preference
- Listen for system changes
```

---

## Core Patterns

### 1. Navigation Pattern

```javascript
// Simple page routing
function navigateTo(page) {
  Object.values(pages).forEach(p => p.style.display = 'none');
  if (pages[page]) {
    pages[page].style.display = 'block';
    // Call page-specific init
  }
}
```

### 2. Firebase Operations Pattern

```javascript
// Standard async/await pattern
async function loadData() {
  try {
    const snapshot = await db.collection('...').get();
    const data = snapshot.docs.map(doc => doc.data());
    updateUI(data);
    showSuccess('Loaded successfully');
  } catch (error) {
    console.error('Error:', error);
    showError('Failed to load');
  }
}
```

### 3. DOM Manipulation Pattern

```javascript
// Create and append elements
function createLectureCard(id, data) {
  const card = document.createElement('div');
  card.className = 'lecture-card';
  card.innerHTML = `<h3>${data.title}</h3>...`;
  return card;
}

container.appendChild(createLectureCard(id, data));
```

### 4. UI State Pattern

```javascript
// Show/hide patterns with conditions
isEditMode = !isEditMode;
if (isEditMode) {
  editor.style.display = 'block';
  viewBtn.style.display = 'none';
} else {
  editor.style.display = 'none';
  viewBtn.style.display = 'block';
}
```

---

## Data Models

### User
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string (optional),
  schoolLevel: string (optional),
  subjects: [{name, description}],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Lecture
```javascript
{
  userId: string,
  title: string,
  subject: string,
  audioUrl: string,
  duration: number (seconds),
  notes: string (markdown),
  keyIdeas: [string],
  vocabularyList: [{term, definition}],
  deepDives: [{topic, content, examples}],
  highlights: [{text, color, timestamp}],
  flashcards: [{question, answer}],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## API Reference

### Core App Functions

```javascript
// Navigation
navigateTo(page)  // 'home', 'login', 'dashboard', 'lecture'

// Messages
showError(message)
showSuccess(message)

// Utilities
formatDate(date)           // Returns "Jan 15, 2024"
formatDuration(seconds)    // Returns "1:23"
```

### Authentication

```javascript
// Google Sign-in
signInWithGoogle()

// Email Auth
signInWithEmail(email, password)
signUpWithEmail(email, password, displayName)
signOut()

// User Profile
loadUserProfile()      // Loads currentUser profile
createUserProfile()    // Creates default profile
```

### Dashboard

```javascript
// Lectures
loadRecentLectures()
uploadLecture(title, subject, blob, duration)
deleteLecture(lectureId)
openLecture(lectureId)

// Subjects
loadSubjects()
createSubject()
removeSubject(subjectName)

// Stats
updateStats()
```

### Lecture Workspace

```javascript
// Initialization
initLectureWorkspace()

// Notes
loadNotes()
toggleEditMode()
saveNotes()

// Key Ideas
loadKeyIdeas()
addKeyIdea()
removeKeyIdea(index)

// Vocabulary
loadVocabulary()
addVocabTerm()
removeVocabTerm(index)

// Deep Dives
loadDeepDives()
addDeepDive(topic, content)
removeDeepDive(index)

// Study Tools
toggleHighlightMode()
showFlashcards()
toggleQuickReview()
downloadNotes()
```

### Audio Recording

```javascript
startRecording()      // Request mic, start recording
stopRecording()       // Stop and save to window.recordedBlob
```

---

## Extending the App

### Adding a New Feature

1. **Design the UI**
   - Add HTML in `index.html`
   - Add CSS in appropriate `css/` file
   - Consider responsive design

2. **Add JavaScript Logic**
   - Create or modify `.js` file
   - Follow existing patterns
   - Use async/await for Firebase calls

3. **Connect to Database**
   - Define data model
   - Add Firestore read/write operations
   - Update security rules if needed

4. **Test**
   - Test in browser (F12 dev tools)
   - Test on mobile
   - Test with dark mode
   - Check console for errors

### Example: Adding a Tag System

```javascript
// 1. Add to HTML
<input id="lectureTag" placeholder="Add tags...">
<button onclick="addTag()">+ Tag</button>

// 2. Add to data model (lecture)
tags: [string]

// 3. Add JavaScript
async function addTag() {
  const tag = document.getElementById('lectureTag').value;
  const tags = currentLectureData.tags || [];
  tags.push(tag);
  
  await db.collection('lectures')
    .doc(currentLectureData.id)
    .update({ tags });
  
  currentLectureData.tags = tags;
}

// 4. Add CSS styling
.tag {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  margin: 4px;
}
```

### Common Modifications

#### Change Colors
Edit `:root` in `public/css/global.css`:
```css
:root {
  --primary: #4F46E5;        /* Main brand color */
  --secondary: #EC4899;      /* Accent color */
  --success: #10B981;        /* Success state */
  --danger: #EF4444;         /* Error state */
}
```

#### Add New Page
1. Add HTML section with `id="newpage-page"`
2. Add to `pages` object in `app.js`
3. Add CSS styling
4. Call `navigateTo('newpage')`

#### Modify Authentication
Edit `firebase-config.js`:
```javascript
// Add provider
const provider = new firebase.auth.FacebookAuthProvider();

// Use in sign-in
auth.signInWithPopup(provider)
```

#### Add Analytics
```javascript
// In firebase-config.js
const analytics = firebase.analytics();

// Track events
analytics.logEvent('lecture_created', {
  title: title,
  subject: subject
});
```

---

## Performance Optimization

### Current Performance

- Lightweight (~50KB JS)
- No build step (instant deployment)
- Minimal Firebase SDK usage
- Efficient DOM updates

### Optimization Ideas

1. **Lazy Load Images**
```javascript
<img loading="lazy" src="image.jpg">
```

2. **Cache Firestore Data**
```javascript
// In JavaScript
const cache = {};

async function getCachedLecture(id) {
  if (cache[id]) return cache[id];
  const doc = await db.collection('lectures').doc(id).get();
  cache[id] = doc.data();
  return cache[id];
}
```

3. **Pagination for Large Lists**
```javascript
let lastVisible = null;
async function loadMoreLectures() {
  let query = db.collection('lectures')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt', 'desc')
    .limit(10);
  
  if (lastVisible) {
    query = query.startAfter(lastVisible);
  }
  
  const snapshot = await query.get();
  lastVisible = snapshot.docs[snapshot.docs.length - 1];
}
```

---

## Testing

### Manual Testing Checklist

- [ ] Sign up and verify email
- [ ] Sign in with Google
- [ ] Complete onboarding
- [ ] Create subject
- [ ] Record lecture (test browser permissions)
- [ ] Upload audio file
- [ ] Add notes
- [ ] Add key ideas
- [ ] Create flashcard
- [ ] Download notes
- [ ] Delete lecture
- [ ] Dark mode toggle
- [ ] Test on mobile
- [ ] Test on different browsers

### Firebase Console Testing

1. Go to Firebase Console
2. Check Firestore data created
3. Check Storage files uploaded
4. Verify authentication users
5. Check Firestore rules

---

## Debugging

### Common Issues

#### Console Errors
```javascript
// Press F12 to open DevTools
// Check Console tab for errors
// Red text = errors
// Yellow text = warnings
```

#### Firebase Not Initializing
```javascript
// Check firebaseConfig in firebase-config.js
// Verify all values are correct
// Check browser console for Firebase errors
```

#### Firestore Rules Issues
```javascript
// Go to Firebase Console
// Firestore → Rules → Check rules tab
// Common: rules block access (start in Test mode)
```

#### Audio Recording Fails
```javascript
// Check browser permissions
// Try incognito mode
// Check browser console for navigator.mediaDevices error
```

### Development Tips

1. **Use Browser DevTools**
   - F12 opens developer tools
   - Console tab for errors
   - Network tab for API calls
   - Application tab to view localStorage

2. **Firebase Emulator**
   - Run `firebase emulators:start`
   - Test without hitting production
   - Data doesn't persist

3. **Console Logging**
```javascript
console.log('Debug:', variable);
console.table(arrayOfObjects);
console.error('Error:', error);
```

---

## Deployment

### Pre-Deploy Checklist

- [ ] Test all features locally
- [ ] Check for console errors
- [ ] Verify Firebase config
- [ ] Update version in package.json
- [ ] Run firebase login to ensure auth
- [ ] Check firestore.rules are updated

### Deploy Command

```bash
firebase deploy
```

### Post-Deploy

1. Open `https://YOUR_PROJECT.web.app`
2. Test key features
3. Check browser console for errors
4. Monitor Firebase console for issues

---

## Contributing

### Code Style

- Use 2-space indentation
- Use camelCase for variables/functions
- Use UPPER_CASE for constants
- Comment complex logic
- Keep functions focused and small

### Commit Messages

```
feat: Add feature name
fix: Fix bug description
docs: Update documentation
style: Format code
refactor: Reorganize code
```

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes with commits
4. Test thoroughly
5. Submit pull request with description

---

## Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

Happy coding! 🚀

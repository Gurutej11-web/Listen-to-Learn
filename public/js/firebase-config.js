// Firebase Configuration
// Replace these with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBVaELLYwYXnZEOSZOdN5FBcwJ-zryubvA",
  authDomain: "listen-to-learn-3e9a7.firebaseapp.com",
  projectId: "listen-to-learn-3e9a7",
  storageBucket: "listen-to-learn-3e9a7.firebasestorage.app",
  messagingSenderId: "256100916578",
  appId: "1:256100916578:web:f7370319ffd379067ca03b",
  measurementId: "G-BXBC1GPX6F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Current user state
let currentUser = null;

// Listen for authentication state changes
auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  if (user) {
    // User is signed in
    await loadUserProfile();
    navigateTo('dashboard');
  } else {
    // User is signed out
    navigateTo('home');
  }
});

// Load user profile from Firestore
async function loadUserProfile() {
  if (!currentUser) return;
  try {
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    if (userDoc.exists) {
      window.userProfile = userDoc.data();
    } else {
      // Create default profile
      await createUserProfile();
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
  }
}

// Create new user profile
async function createUserProfile() {
  if (!currentUser) return;
  try {
    await db.collection('users').doc(currentUser.uid).set({
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName || 'Student',
      photoURL: currentUser.photoURL || null,
      schoolLevel: null,
      subjects: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await loadUserProfile();
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
}

// Sign in with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(error => {
    console.error('Google sign-in error:', error);
    showError('Failed to sign in with Google');
  });
}

// Sign in with email/password
async function signInWithEmail(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Email sign-in error:', error);
    showError(error.message);
  }
}

// Sign up with email/password
async function signUpWithEmail(email, password, displayName) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName });
    await createUserProfile();
  } catch (error) {
    console.error('Email sign-up error:', error);
    showError(error.message);
  }
}

// Sign out
function signOut() {
  auth.signOut().catch(error => {
    console.error('Sign-out error:', error);
  });
}

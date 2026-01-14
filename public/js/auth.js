// Authentication UI handlers

function showSignInForm() {
  document.getElementById('loginBox').style.display = 'block';
  document.getElementById('signupBox').style.display = 'none';
}

function showSignUpForm() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('signupBox').style.display = 'block';
}

function handleEmailSignIn() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showError('Please enter email and password');
    return;
  }
  
  signInWithEmail(email, password);
}

function handleEmailSignUp() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  if (!name || !email || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  if (password.length < 6) {
    showError('Password must be at least 6 characters');
    return;
  }
  
  signUpWithEmail(email, password, name);
}

// Update UI based on auth state
auth.onAuthStateChanged((user) => {
  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  
  if (user) {
    // User is signed in
    signInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    signOutBtn.style.display = 'inline-block';
    
    // Update greeting
    const greeting = document.getElementById('userGreeting');
    if (greeting) {
      greeting.textContent = user.displayName || 'Student';
    }
  } else {
    // User is signed out
    signInBtn.style.display = 'inline-block';
    signUpBtn.style.display = 'inline-block';
    signOutBtn.style.display = 'none';
  }
});

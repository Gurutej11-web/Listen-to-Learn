// Core routing and navigation
const pages = {
  home: document.getElementById('home-page'),
  login: document.getElementById('login-page'),
  onboarding: document.getElementById('onboarding-page'),
  dashboard: document.getElementById('dashboard-page'),
  lecture: document.getElementById('lecture-page')
};

function navigateTo(page) {
  // Hide all pages
  Object.values(pages).forEach(p => p.style.display = 'none');
  
  // Show requested page
  if (pages[page]) {
    pages[page].style.display = 'block';
    
    // Call page-specific initialization
    if (page === 'dashboard') {
      initDashboard();
    } else if (page === 'lecture') {
      initLectureWorkspace();
    }
  }
}

// Helper function to show error messages
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Helper function to show success messages
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Format date
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = date.toDate ? date.toDate() : new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Format time duration (seconds to MM:SS)
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

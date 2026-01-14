// Dark mode toggle and theme management

const DARK_MODE_KEY = 'listen-to-learn-dark-mode';

// Initialize dark mode
function initDarkMode() {
  const isDarkMode = localStorage.getItem(DARK_MODE_KEY) === 'true' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem(DARK_MODE_KEY, isDarkMode);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarkMode);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// Enhanced Features - Form Validation, Search, Keyboard Shortcuts

// ==========================================
// FORM VALIDATION
// ==========================================

class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.fields = {};
  }

  addField(name, rules) {
    this.fields[name] = rules;
  }

  validate(data) {
    const errors = {};
    
    for (const [field, rules] of Object.entries(this.fields)) {
      const value = data[field];
      
      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

// Validation Rules
const ValidationRules = {
  required: (value) => !value || value.trim() === '' ? 'This field is required' : null,
  email: (value) => !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null,
  minLength: (min) => (value) => !value || value.length < min ? `Must be at least ${min} characters` : null,
  maxLength: (max) => (value) => value && value.length > max ? `Must be no more than ${max} characters` : null,
  match: (fieldName) => (value) => value !== document.getElementById(fieldName)?.value ? `Fields do not match` : null,
  strongPassword: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    return null;
  }
};

// Real-time field validation
function setupFieldValidation(fieldId, rules) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  field.addEventListener('blur', () => {
    validateField(fieldId, rules);
  });
  
  field.addEventListener('input', () => {
    const error = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (error) {
      error.style.display = 'none';
    }
  });
}

function validateField(fieldId, rules) {
  const field = document.getElementById(fieldId);
  const value = field?.value || '';
  let errorMessage = null;
  
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      errorMessage = error;
      break;
    }
  }
  
  const errorEl = document.querySelector(`[data-error-for="${fieldId}"]`) ||
                  createErrorElement(fieldId);
  
  if (errorMessage) {
    errorEl.textContent = errorMessage;
    errorEl.style.display = 'block';
    field.classList.add('invalid');
    return false;
  } else {
    errorEl.style.display = 'none';
    field.classList.remove('invalid');
    return true;
  }
}

function createErrorElement(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.createElement('small');
  error.className = 'field-error';
  error.setAttribute('data-error-for', fieldId);
  error.style.display = 'none';
  field.parentNode.appendChild(error);
  return error;
}

// ==========================================
// SEARCH & FILTER
// ==========================================

class SearchManager {
  constructor(searchInputId, resultsContainerId) {
    this.searchInput = document.getElementById(searchInputId);
    this.resultsContainer = document.getElementById(resultsContainerId);
    this.allItems = [];
    this.setupSearch();
  }

  setupSearch() {
    if (!this.searchInput) return;
    
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      this.search(query);
    });
  }

  setItems(items) {
    this.allItems = items;
  }

  search(query) {
    if (!query) {
      this.showAll();
      return;
    }
    
    const results = this.allItems.filter(item =>
      (item.title?.toLowerCase().includes(query)) ||
      (item.subject?.toLowerCase().includes(query)) ||
      (item.content?.toLowerCase().includes(query))
    );
    
    this.displayResults(results);
  }

  displayResults(results) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = '<div class="empty-state"><p>No results found</p></div>';
      return;
    }
    
    this.resultsContainer.innerHTML = '';
    results.forEach(item => {
      const element = this.createResultElement(item);
      this.resultsContainer.appendChild(element);
    });
  }

  createResultElement(item) {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.innerHTML = `
      <div class="result-title">${item.title || 'Untitled'}</div>
      <div class="result-meta">${item.subject || 'No subject'}</div>
    `;
    return div;
  }

  showAll() {
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = '';
    }
  }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.setupShortcuts();
  }

  register(keys, callback, description) {
    const keyCombo = keys.join('+');
    this.shortcuts.set(keyCombo, { callback, description });
  }

  setupShortcuts() {
    document.addEventListener('keydown', (e) => {
      const keys = [];
      if (e.ctrlKey || e.metaKey) keys.push('ctrl');
      if (e.shiftKey) keys.push('shift');
      if (e.altKey) keys.push('alt');
      keys.push(e.key.toLowerCase());
      
      const keyCombo = keys.join('+');
      const shortcut = this.shortcuts.get(keyCombo);
      
      if (shortcut) {
        e.preventDefault();
        shortcut.callback();
      }
    });
    
    this.initializeDefaultShortcuts();
  }

  initializeDefaultShortcuts() {
    // Save: Ctrl/Cmd + S
    this.register(['ctrl', 's'], () => {
      if (currentLectureData) {
        saveNotes();
        showSuccess('Notes saved!');
      }
    }, 'Save notes');

    // New Lecture: Ctrl/Cmd + N
    this.register(['ctrl', 'n'], () => {
      openLectureInput();
    }, 'New lecture');

    // Toggle Dark Mode: Ctrl/Cmd + .
    this.register(['ctrl', '.'], () => {
      toggleDarkMode();
    }, 'Toggle dark mode');

    // Toggle Edit: Ctrl/Cmd + E
    this.register(['ctrl', 'e'], () => {
      if (window.currentLectureId) {
        toggleEditMode();
      }
    }, 'Toggle edit mode');

    // Search: Ctrl/Cmd + F (enhanced)
    this.register(['ctrl', 'f'], (e) => {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }, 'Focus search');
  }

  showHelp() {
    let helpText = 'Keyboard Shortcuts:\n\n';
    this.shortcuts.forEach((shortcut, keyCombo) => {
      helpText += `${keyCombo.toUpperCase()} - ${shortcut.description}\n`;
    });
    alert(helpText);
  }
}

// Initialize keyboard shortcuts
const shortcuts = new KeyboardShortcuts();

// ==========================================
// LOCAL STORAGE (DRAFT SAVING)
// ==========================================

class DraftManager {
  constructor(key) {
    this.key = key;
  }

  save(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load draft:', error);
      return null;
    }
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  autosave(data, interval = 5000) {
    setInterval(() => {
      this.save(data);
    }, interval);
  }
}

// ==========================================
// COUNTER ANIMATIONS
// ==========================================

function animateCounter(element, start, end, duration = 2000) {
  const increment = (end - start) / (duration / 50);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 50);
}

// Animate stats when dashboard loads
function animateStats() {
  const lectureCount = document.getElementById('lectureCount');
  const noteCount = document.getElementById('noteCount');
  const hoursSaved = document.getElementById('hoursSaved');
  
  if (lectureCount) {
    animateCounter(lectureCount, 0, parseInt(lectureCount.textContent));
  }
  if (noteCount) {
    animateCounter(noteCount, 0, parseInt(noteCount.textContent));
  }
  if (hoursSaved) {
    animateCounter(hoursSaved, 0, parseInt(hoursSaved.textContent));
  }
}

// ==========================================
// TOAST NOTIFICATIONS (ENHANCED)
// ==========================================

class Toast {
  constructor(message, type = 'info', duration = 4000) {
    this.message = message;
    this.type = type; // 'success', 'error', 'info', 'warning'
    this.duration = duration;
    this.show();
  }

  show() {
    const toast = document.createElement('div');
    toast.className = `toast toast-${this.type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${this.getIcon()}</span>
        <span class="toast-message">${this.message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, this.duration);
  }

  getIcon() {
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
      warning: '⚠'
    };
    return icons[this.type] || '●';
  }
}

// Override old toast functions
function showError(message) {
  new Toast(message, 'error');
}

function showSuccess(message) {
  new Toast(message, 'success');
}

function showInfo(message) {
  new Toast(message, 'info');
}

// ==========================================
// CLIPBOARD UTILITIES
// ==========================================

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    new Toast('Copied to clipboard!', 'success', 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
    new Toast('Failed to copy', 'error');
  }
}

// ==========================================
// DEBOUNCE & THROTTLE
// ==========================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==========================================
// EXPORT
// ==========================================

window.FormValidator = FormValidator;
window.ValidationRules = ValidationRules;
window.SearchManager = SearchManager;
window.DraftManager = DraftManager;
window.shortcuts = shortcuts;
window.animateCounter = animateCounter;
window.Toast = Toast;
window.copyToClipboard = copyToClipboard;
window.debounce = debounce;
window.throttle = throttle;

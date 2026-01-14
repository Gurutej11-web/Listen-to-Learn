/**
 * Integration Layer - Ties all enhancements together
 * Provides comprehensive setup and coordinated functionality
 */

class AppIntegration {
  static init() {
    // Initialize all systems on app load
    this.setupErrorHandling();
    this.setupToastMessages();
    this.setupFormValidation();
    this.setupSearchFunctionality();
    this.setupKeyboardShortcuts();
    this.setupDraftSaving();
    this.setupDataAttributes();
    this.setupAccessibility();
    this.setupPerformance();
  }

  static setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
      console.error('Error:', e.error);
      showError('Something went wrong. Please try again.');
    });

    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled rejection:', e.reason);
      showError('An unexpected error occurred. Please refresh the page.');
    });
  }

  static setupToastMessages() {
    // Replace default alert/confirm with toast messages
    window.showAlert = (message) => {
      showInfo(message);
    };

    window.showConfirm = (message, callback) => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content modal-small">
          <div class="modal-body" style="padding: 30px;">
            <p style="margin-bottom: 20px;">${message}</p>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
              <button class="btn btn-primary" id="confirmBtn">Confirm</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });

      const confirmBtn = modal.querySelector('#confirmBtn');
      confirmBtn.addEventListener('click', () => {
        callback(true);
        modal.remove();
      });
    };
  }

  static setupFormValidation() {
    // Auto-validate all forms
    document.addEventListener('DOMContentLoaded', () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          const inputs = form.querySelectorAll('input[required], textarea[required]');
          let isValid = true;

          inputs.forEach(input => {
            if (!input.value.trim()) {
              input.classList.add('invalid');
              const error = document.createElement('span');
              error.className = 'field-error';
              error.textContent = `${input.placeholder || 'This field'} is required`;
              input.parentElement.appendChild(error);
              isValid = false;
            }
          });

          if (!isValid) {
            e.preventDefault();
            showError('Please fill in all required fields');
          }
        });
      });
    });
  }

  static setupSearchFunctionality() {
    // Setup search in dashboard
    const searchInput = document.getElementById('lectureSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('[data-lecture-card]');

        cards.forEach(card => {
          const title = card.getAttribute('data-title')?.toLowerCase() || '';
          const date = card.getAttribute('data-date')?.toLowerCase() || '';
          const subject = card.getAttribute('data-subject')?.toLowerCase() || '';

          const matches = title.includes(query) || date.includes(query) || subject.includes(query);
          card.style.display = matches ? '' : 'none';
          if (matches) card.classList.add('fade-in');
        });

        // Show empty state if no results
        const visibleCards = document.querySelectorAll('[data-lecture-card]:not([style*="display: none"])');
        const emptyState = document.getElementById('noSearchResults');
        if (visibleCards.length === 0 && query) {
          if (emptyState) emptyState.style.display = 'block';
          else {
            const empty = document.createElement('div');
            empty.id = 'noSearchResults';
            empty.className = 'empty-state';
            empty.innerHTML = `
              <div class="empty-icon">🔍</div>
              <h3 class="empty-title">No lectures found</h3>
              <p class="empty-message">Try adjusting your search query</p>
            `;
            document.getElementById('lecturesContainer')?.appendChild(empty);
          }
        } else if (emptyState) {
          emptyState.style.display = 'none';
        }
      });
    }
  }

  static setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + N: New lecture
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('newLectureBtn')?.click();
        showInfo('Opening new lecture');
      }

      // Ctrl/Cmd + S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        document.getElementById('saveBtn')?.click() || document.querySelector('[onclick*="saveLecture"]')?.click();
        showSuccess('Saved!');
      }

      // Ctrl/Cmd + E: Edit
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        document.getElementById('editBtn')?.click();
        showInfo('Edit mode enabled');
      }

      // Ctrl/Cmd + .: Toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === '.') {
        e.preventDefault();
        toggleDarkMode();
        showInfo(document.body.classList.contains('dark-mode') ? '🌙 Dark mode' : '☀️ Light mode');
      }

      // Ctrl/Cmd + /: Show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        KeyboardShortcutsUI.show();
      }

      // Esc: Close modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal[style*="display: block"]').forEach(modal => {
          modal.style.display = 'none';
        });
      }
    });
  }

  static setupDraftSaving() {
    // Auto-save drafts for notes
    const notesEditor = document.getElementById('notesEditor');
    if (notesEditor) {
      let draftTimeout;
      notesEditor.addEventListener('input', () => {
        clearTimeout(draftTimeout);
        draftTimeout = setTimeout(() => {
          const content = notesEditor.value;
          const lectureId = document.getElementById('currentLectureId')?.value;
          if (lectureId && content) {
            localStorage.setItem(`draft_${lectureId}`, content);
            showSuccess('Draft saved');
          }
        }, 3000);
      });

      // Load draft on page load
      const lectureId = document.getElementById('currentLectureId')?.value;
      if (lectureId) {
        const draft = localStorage.getItem(`draft_${lectureId}`);
        if (draft && notesEditor.value === '') {
          notesEditor.value = draft;
          showInfo('Draft loaded');
        }
      }
    }
  }

  static setupDataAttributes() {
    // Initialize elements with data attributes
    document.addEventListener('DOMContentLoaded', () => {
      // Animate count elements when in view
      const countElements = document.querySelectorAll('[data-count]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            if (window.CounterAnimation) {
              CounterAnimation.animate(entry.target, target);
            }
            observer.unobserve(entry.target);
          }
        });
      });
      countElements.forEach(el => observer.observe(el));

      // Add reveal animation to elements with data-reveal
      const reveals = document.querySelectorAll('[data-reveal]');
      reveals.forEach(el => {
        el.classList.add('fade-in');
      });
    });
  }

  static setupAccessibility() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
      if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', btn.textContent.trim() || btn.title || 'Button');
      }
    });

    // Add role to custom elements if missing
    document.querySelectorAll('[onclick]').forEach(el => {
      if (!el.hasAttribute('role')) {
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
      }
    });

    // Keyboard support for role="button"
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.getAttribute('role') === 'button' && target !== document.activeElement.tagName === 'BUTTON') {
          e.preventDefault();
          target.click();
        }
      }
    });
  }

  static setupPerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach(img => imageObserver.observe(img));
    }

    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Trigger resize-dependent updates
        window.dispatchEvent(new Event('resizeEnd'));
      }, 250);
    });
  }
}

// ==========================================
// CONVENIENCE FUNCTIONS (Global)
// ==========================================

function showSuccess(message) {
  if (window.ToastManager) {
    ToastManager.success(message);
  }
}

function showError(message) {
  if (window.ToastManager) {
    ToastManager.error(message);
  }
}

function showInfo(message) {
  if (window.ToastManager) {
    ToastManager.info(message);
  }
}

function showWarning(message) {
  if (window.ToastManager) {
    ToastManager.warning(message);
  }
}

// Enhanced navigation with animation
const originalNavigateTo = window.navigateTo;
window.navigateTo = function(pageName) {
  const page = document.getElementById(`${pageName}-page`);
  if (page) {
    page.classList.add('fade-in');
  }
  if (originalNavigateTo) {
    return originalNavigateTo.call(this, pageName);
  }
};

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AppIntegration.init();
  });
} else {
  AppIntegration.init();
}

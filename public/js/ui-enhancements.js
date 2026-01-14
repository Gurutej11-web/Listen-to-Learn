/**
 * UI Enhancements - Advanced Visual and Interaction Improvements
 * Provides smooth animations, micro-interactions, and polished UI effects
 */

// ==========================================
// ENHANCED CARD ANIMATIONS & INTERACTIONS
// ==========================================

class CardAnimator {
  static initCardHovers() {
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('[data-animate-card]');
      cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-4px) scale(1.01)';
          this.style.boxShadow = '0 12px 32px rgba(79, 70, 229, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
          this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
      });
    });
  }

  static addCardLoadAnimation() {
    const cards = document.querySelectorAll('[data-animate-card]');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
  }
}

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

class SmoothScroll {
  static init() {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// ==========================================
// LOADING STATE MANAGER
// ==========================================

class LoadingState {
  static show(element, message = 'Loading...') {
    element.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>${message}</p>
      </div>
    `;
    element.style.minHeight = '200px';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
  }

  static hide(element) {
    element.style.minHeight = 'auto';
    element.innerHTML = '';
  }

  static addLoadingButton(button, message = 'Loading...') {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = `<span class="loader"></span> ${message}`;
  }

  static removeLoadingButton(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText || 'Submit';
  }
}

// ==========================================
// ENHANCED INPUT FOCUS EFFECTS
// ==========================================

class InputEnhancements {
  static init() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        const parent = this.parentElement;
        if (parent) {
          parent.style.position = 'relative';
          const line = document.createElement('div');
          line.className = 'focus-line';
          line.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: var(--primary);
            width: 0%;
            animation: expandWidth 0.3s ease forwards;
          `;
          parent.appendChild(line);
        }
      });

      input.addEventListener('blur', function() {
        const line = this.parentElement?.querySelector('.focus-line');
        if (line) {
          line.style.animation = 'shrinkWidth 0.3s ease forwards';
          setTimeout(() => line.remove(), 300);
        }
      });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes expandWidth {
        from { width: 0%; left: 50%; }
        to { width: 100%; left: 0%; }
      }
      @keyframes shrinkWidth {
        from { width: 100%; left: 0%; }
        to { width: 0%; left: 50%; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ==========================================
// COUNTER ANIMATIONS
// ==========================================

class CounterAnimation {
  static animate(element, target, duration = 1000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    const animate = () => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        element.textContent = target;
      } else {
        element.textContent = Math.floor(current);
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  static initStats() {
    const stats = document.querySelectorAll('[data-animate-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.animateCount);
          this.animate(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    });

    stats.forEach(stat => observer.observe(stat));
  }
}

// ==========================================
// RIPPLE EFFECT HANDLER
// ==========================================

class RippleEffect {
  static init() {
    document.addEventListener('click', (e) => {
      const button = e.target.closest('[data-ripple]');
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
      `;

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

class ScrollReveal {
  static init() {
    const reveals = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
  }
}

// ==========================================
// EMPTY STATE HANDLER
// ==========================================

class EmptyState {
  static show(container, icon = '📭', title = 'Nothing here yet', message = 'Get started by creating your first item') {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${icon}</div>
        <h3 class="empty-title">${title}</h3>
        <p class="empty-message">${message}</p>
      </div>
    `;
    container.style.textAlign = 'center';
    container.style.padding = '60px 20px';
  }

  static hide(container) {
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
      emptyState.remove();
    }
  }
}

// ==========================================
// NOTIFICATION TOAST MANAGER (Enhanced)
// ==========================================

class ToastManager {
  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
      warning: '⚠'
    };

    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.closest('.toast').remove()">×</button>
      </div>
    `;

    document.body.appendChild(toast);

    if (duration) {
      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }

    return toast;
  }

  static success(message) {
    return this.show(message, 'success');
  }

  static error(message) {
    return this.show(message, 'error', 4000);
  }

  static info(message) {
    return this.show(message, 'info');
  }

  static warning(message) {
    return this.show(message, 'warning', 3500);
  }
}

// ==========================================
// PROGRESS BAR MANAGER
// ==========================================

class ProgressBar {
  static show(container) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill" style="width: 0%"></div>';
    container.insertBefore(progressBar, container.firstChild);
    return progressBar;
  }

  static update(progressBar, percentage) {
    const fill = progressBar.querySelector('.progress-fill');
    fill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }

  static complete(progressBar) {
    const fill = progressBar.querySelector('.progress-fill');
    fill.style.width = '100%';
    setTimeout(() => progressBar.remove(), 500);
  }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

class KeyboardShortcutsUI {
  static show() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) {
      modal.style.display = 'block';
    } else {
      this.createModal();
    }
  }

  static createModal() {
    const modal = document.createElement('div');
    modal.id = 'shortcutsModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content modal-medium">
        <div class="modal-header">
          <h2>⌨️ Keyboard Shortcuts</h2>
          <button class="modal-close" onclick="document.getElementById('shortcutsModal').style.display='none'">&times;</button>
        </div>
        <div class="modal-body">
          <div class="shortcuts-grid">
            <div class="shortcut-item">
              <kbd>Ctrl + N</kbd>
              <span>New Lecture</span>
            </div>
            <div class="shortcut-item">
              <kbd>Ctrl + S</kbd>
              <span>Save Note</span>
            </div>
            <div class="shortcut-item">
              <kbd>Ctrl + .</kbd>
              <span>Toggle Dark Mode</span>
            </div>
            <div class="shortcut-item">
              <kbd>Ctrl + E</kbd>
              <span>Edit Lecture</span>
            </div>
            <div class="shortcut-item">
              <kbd>Ctrl + /</kbd>
              <span>Show Shortcuts</span>
            </div>
            <div class="shortcut-item">
              <kbd>Esc</kbd>
              <span>Close Modal</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  static listen() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        this.show();
      }
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
      }
    });
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all enhancements
  CardAnimator.initCardHovers();
  CardAnimator.addCardLoadAnimation();
  SmoothScroll.init();
  InputEnhancements.init();
  CounterAnimation.initStats();
  RippleEffect.init();
  ScrollReveal.init();
  KeyboardShortcutsUI.listen();
});

// Make ToastManager globally available
window.showToast = (message, type = 'info') => ToastManager.show(message, type);
window.showSuccess = (message) => ToastManager.success(message);
window.showError = (message) => ToastManager.error(message);
window.showInfo = (message) => ToastManager.info(message);
window.showWarning = (message) => ToastManager.warning(message);

// Make other utilities globally available
window.LoadingState = LoadingState;
window.ProgressBar = ProgressBar;
window.EmptyState = EmptyState;
window.CardAnimator = CardAnimator;
window.SmoothScroll = SmoothScroll;

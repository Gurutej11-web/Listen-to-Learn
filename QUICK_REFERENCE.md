# Quick Reference - Enhancements API

## Notifications

```javascript
// Success notification - green
showSuccess('Lecture saved successfully!');

// Error notification - red  
showError('Failed to save lecture');

// Info notification - blue
showInfo('Press Ctrl+/ for help');

// Warning notification - orange
showWarning('This action cannot be undone');

// Custom toast with type and duration
ToastManager.show('Custom message', 'info', 4000);
```

## Loading States

```javascript
// Show loading spinner
LoadingState.show(element, 'Loading lectures...');

// Hide loading
LoadingState.hide(element);

// Add loading to button
LoadingState.addLoadingButton(button, 'Saving...');

// Remove loading from button
LoadingState.removeLoadingButton(button);
```

## Animations

```javascript
// Fade in element
element.classList.add('fade-in');

// Slide in from left
element.classList.add('slide-in-left');

// Slide in from right  
element.classList.add('slide-in-right');

// Bounce entrance
element.classList.add('bounce-in');

// Expand/collapse smooth
element.classList.add('expand-smooth');
element.classList.add('collapse-smooth');

// Pulse effect
element.classList.add('pulse');

// Glow on hover
element.classList.add('glow-hover');

// Elevation on hover
element.classList.add('elevation-hover');
```

## Counters & Numbers

```javascript
// Animate number from current to target
// Takes: element, target value, duration in ms
CounterAnimation.animate(statsElement, 150, 1000);

// Auto-animate when in view
// Add data-count attribute to element
// <span data-count="42">0</span>
```

## Form Validation

```javascript
// Create validator
const validator = new FormValidator();

// Validate email
const isValidEmail = validator.validate(emailInput, 'email');

// Validate password (min 8 chars, uppercase, number)
const isValidPassword = validator.validate(passwordInput, 'password');

// Validate required field
const isFilled = validator.validate(input, 'required');

// Validate password match
const matches = validator.validate(confirmInput, 'match', passwordInput);

// Show error on field
const errorEl = document.createElement('span');
errorEl.className = 'field-error';
errorEl.textContent = 'Invalid email';
input.parentElement.appendChild(errorEl);
input.classList.add('invalid');

// Show success state
input.classList.add('field-success');
```

## Search & Filter

```javascript
// Create search manager
const searcher = new SearchManager('lectureList');

// Perform search
searcher.search('query text', { category: 'physics' });

// HTML integration
// <input id="lectureSearch" type="text" placeholder="Search...">
// Search automatically filters elements with data-title, data-date, data-subject
```

## Keyboard Shortcuts

```javascript
// Show shortcuts help modal
KeyboardShortcutsUI.show();

// Built-in shortcuts:
// Ctrl+N - New lecture
// Ctrl+S - Save
// Ctrl+E - Edit
// Ctrl+. - Dark mode toggle
// Ctrl+/ - Show shortcuts
// Esc - Close modal

// Add custom shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    deleteItem();
  }
});
```

## Progress Bars

```javascript
// Show progress bar
const progressBar = ProgressBar.show(container);

// Update progress
ProgressBar.update(progressBar, 50); // 50%
ProgressBar.update(progressBar, 75); // 75%
ProgressBar.update(progressBar, 100); // 100%

// Complete (auto-removes)
ProgressBar.complete(progressBar);
```

## Empty States

```javascript
// Show empty state
EmptyState.show(
  container,
  '📭', // icon
  'No lectures yet', // title
  'Create your first lecture to get started' // message
);

// Hide empty state
EmptyState.hide(container);
```

## Card Animations

```javascript
// Auto-hover and load animations
CardAnimator.initCardHovers();
CardAnimator.addCardLoadAnimation();

// HTML: Add data attribute
// <div data-animate-card class="card">
//   Card content
// </div>
```

## Smooth Scroll

```javascript
// Enable smooth scrolling globally
SmoothScroll.init();

// Smooth scroll to element
element.scrollIntoView({ behavior: 'smooth' });
```

## Draft Saving

```javascript
// Draft auto-saves to localStorage
// Key format: draft_{lectureId}

// Get draft
const draft = localStorage.getItem('draft_lecture-123');

// Clear draft
localStorage.removeItem('draft_lecture-123');

// Use with textarea
const noteArea = document.getElementById('notesEditor');
noteArea.addEventListener('input', () => {
  // Auto-saved by integration.js
});
```

## Dark Mode

```javascript
// Toggle dark mode
toggleDarkMode();

// Check if dark mode
const isDark = document.body.classList.contains('dark-mode');

// Get current theme
const theme = localStorage.getItem('theme') || 'light';
```

## CSS Classes for Quick Effects

```javascript
// Add these classes to elements for effects:

// Text effects
.text-shadow // Subtle text shadow
.text-gradient // Gradient text (requires custom gradient)

// Interactive effects
.scale-on-click // Shrinks on click
.glow-hover // Glows on hover
.elevation-hover // Lifts on hover
.blur-hover // Blurs on hover
.grayscale-hover // Grayscales on hover
.brightness-hover // Brightens on hover

// Animations
.fade-in // Fade in
.fade-out // Fade out
.slide-in-left // Slide from left
.slide-in-right // Slide from right
.slide-in-down // Slide from top
.bounce-in // Bouncy entrance
.pulse // Pulsing effect
.bounce // Floating bounce
.shimmer // Shimmer animation
.success-check // Checkmark animation
.wobble // Wiggle effect
.flip // 3D flip

// Opacity
.opacity-50 // 50% opacity
.opacity-70 // 70% opacity

// Utilities
.no-select // Prevent text selection
.pointer-events-none // Ignore clicks
.cursor-default // Default cursor
.transition-all // Smooth transitions
```

## HTML Data Attributes

```html
<!-- Animate card on load and hover -->
<div data-animate-card class="card">...</div>

<!-- Reveal on scroll with fade-in -->
<div data-reveal>...</div>

<!-- Auto-animate counter when in view -->
<span data-count="100">0</span>

<!-- Ripple effect on click -->
<button data-ripple>Click me</button>

<!-- Search attributes -->
<div data-lecture-card data-title="Algebra Basics" data-date="2024-01-15" data-subject="Math">
  ...
</div>
```

## Common Patterns

### Save with feedback
```javascript
async function saveLecture() {
  const button = document.getElementById('saveBtn');
  LoadingState.addLoadingButton(button, 'Saving...');
  
  try {
    await firebaseService.save();
    showSuccess('Lecture saved!');
  } catch (error) {
    showError('Failed to save');
  } finally {
    LoadingState.removeLoadingButton(button);
  }
}
```

### Search with filtering
```javascript
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('[data-lecture-card]').forEach(card => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.style.display = matches ? '' : 'none';
  });
});
```

### Form with validation
```javascript
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email');
  const validator = new FormValidator();
  
  if (!validator.validate(email, 'email')) {
    showError('Invalid email address');
    return;
  }
  
  showSuccess('Form submitted!');
  // Submit form...
});
```

### Modal with keyboard support
```javascript
const modal = document.getElementById('myModal');

// Close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display !== 'none') {
    modal.style.display = 'none';
  }
});

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
```

## Global Functions

```javascript
// All globally available:
showSuccess(message)
showError(message)
showInfo(message)
showWarning(message)
showAlert(message)
showConfirm(message, callback)

// Classes available:
LoadingState
ProgressBar
EmptyState
CardAnimator
SmoothScroll
ToastManager
KeyboardShortcutsUI

// Managers available:
FormValidator
SearchManager
DraftManager
```

## CSS Variables (Customize)

```css
/* Colors */
--primary: #4F46E5;
--secondary: #EC4899;
--success: #10B981;
--warning: #F59E0B;
--danger: #EF4444;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
--gradient-secondary: linear-gradient(135deg, #EC4899 0%, #F43F5E 100%);
--gradient-success: linear-gradient(135deg, #10B981 0%, #059669 100%);

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Border Radius */
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

## Tips & Tricks

1. **Chain animations**: Add multiple animation classes for complex effects
2. **Use transitions**: CSS transitions work on color, opacity, transform, etc.
3. **Keyboard first**: Design keyboard interactions first, then add mouse support
4. **Test dark mode**: Always test features in both light and dark modes
5. **Check accessibility**: Use keyboard navigation to verify full functionality
6. **Performance**: Use transforms and opacity for smooth animations
7. **Mobile friendly**: Test touch interactions and responsive behavior
8. **Error handling**: Always provide user feedback for errors
9. **Loading states**: Show loading for async operations
10. **Confirm destructive**: Confirm before delete/remove operations

---

**For full documentation, see ENHANCEMENTS.md**

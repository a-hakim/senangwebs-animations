// SenangWebs Animations (swa.js)

(function (global) {
  const SWA = {
    config: {
      offset: 120,
      duration: 600,
      easing: 'ease-out',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    },
    activeOverflowAnimations: 0, // Counter for overflow-causing animations
    overflowBodyClass: 'swa-body-overflow-hidden', // CSS class to add to body

    init(options = {}) {
      this.config = { ...this.config, ...options };
      this.elements = document.querySelectorAll('[data-swa], [data-swa-group]');
      // Inject the necessary CSS rule for body overflow
      this.injectOverflowStyle(); 
      this.setupObserver();
    },

    // Helper function to check if animation might cause overflow
    isOverflowAnimation(animationName) {
      // Add animation names that translate horizontally, diagonally, or zoom out
      return animationName && (animationName.includes('left') || animationName.includes('right') || animationName.includes('zoom-out'));
    },

    // Inject CSS rule into the head
    injectOverflowStyle() {
        const styleId = 'swa-overflow-style';
        if (document.getElementById(styleId)) return; // Avoid duplicate injection

        const css = `body.${this.overflowBodyClass} { overflow-x: hidden !important; }`;
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.id = styleId;
        style.type = 'text/css';
        if (style.styleSheet){ 
          // This is required for IE8 and below.
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    },

    setupObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const targetElement = entry.target;
          if (entry.isIntersecting) {
            this.addWillChange(targetElement);
            requestAnimationFrame(() => {
              this.animateElement(targetElement);
            });
          } else if (this.config.mirror && targetElement.dataset.swaAnimated === 'true') {
            this.resetElement(targetElement);
          }
        });
      }, {
        threshold: 0,
        rootMargin: `0px 0px -${this.config.offset}px 0px`,
      });

      this.elements.forEach((el) => observer.observe(el));
    },

    animateElement(el) {
      if (el.hasAttribute('data-swa-group')) {
        this.animateGroup(el);
      } else {
        this.applySingleAnimation(el);
      }
    },

    animateGroup(groupEl) {
      const groupOptions = this.getGroupOptions(groupEl);
      const groupType = groupEl.getAttribute('data-swa-group-type') || 'simultaneous';
      const groupAnimation = groupEl.getAttribute('data-swa-group');
      const intervalDuration = parseInt(groupEl.getAttribute('data-swa-group-interval-duration')) || 0;
      
      const children = Array.from(groupEl.children);
      
      children.forEach((child, index) => {
        const childDelay = groupType === 'sequence' ? index * intervalDuration : 0;
        const childAnimation = child.getAttribute('data-swa') || groupAnimation;
        
        // Pass group options down, including potential group animation name
        this.applySingleAnimation(child, {
          ...groupOptions, 
          animation: childAnimation, 
          delay: groupOptions.delay + childDelay,
          // Store original animation name for overflow check later
          _originalAnimationName: childAnimation 
        });
      });

      groupEl.dataset.swaAnimated = 'true';
    },

    applySingleAnimation(el, options = {}) {
      const elOptions = this.getElementOptions(el);
      // Merge element options with passed options (from group or direct call)
      const finalOptions = { ...elOptions, ...options };
      // Use the explicitly passed animation name or fallback to element's data-swa
      const animationName = finalOptions.animation || el.dataset.swa;
      // Use the stored original name if available (for group children), else the final name
      const originalAnimationName = finalOptions._originalAnimationName || animationName;

      if (!animationName) return; // Skip if no animation is defined

      const isOverflowing = this.isOverflowAnimation(originalAnimationName);

      if (finalOptions.once && el.dataset.swaAnimated === 'true') {
        this.removeWillChange(el);
        return;
      }

      // Manage overflow class
      if (isOverflowing) {
        if (this.activeOverflowAnimations === 0) {
          document.body.classList.add(this.overflowBodyClass);
        }
        this.activeOverflowAnimations++;
        // Store flag on element to know if it contributed to overflow count
        el.dataset.swaCausedOverflow = 'true'; 
      }

      // Apply animation styles
      el.style.animationDelay = `${finalOptions.delay}ms`;
      el.style.animationDuration = `${finalOptions.duration}ms`;
      el.style.animationTimingFunction = finalOptions.easing;
      el.style.animationFillMode = 'both';
      el.style.animationName = animationName; // Use the determined animation name

      el.dataset.swaAnimated = 'true';

      const totalDuration = finalOptions.duration + finalOptions.delay;
      setTimeout(() => {
        if (el.dataset.swaAnimated === 'true') { // Check if still animated
          this.removeWillChange(el);
          // Manage overflow class removal
          if (el.dataset.swaCausedOverflow === 'true') {
            this.activeOverflowAnimations--;
            if (this.activeOverflowAnimations === 0) {
              document.body.classList.remove(this.overflowBodyClass);
            }
            // Clean up the flag
            delete el.dataset.swaCausedOverflow; 
          }
        }
      }, totalDuration);
    },

    resetElement(el) {
      const options = el.hasAttribute('data-swa-group') ? this.getGroupOptions(el) : this.getElementOptions(el);

      const resetTarget = (element) => {
        // Check if this element caused overflow before resetting its state
        const causedOverflow = element.dataset.swaCausedOverflow === 'true';

        element.style.animationName = 'none';
        element.style.animationDelay = '';
        element.style.animationDuration = '';
        element.style.animationTimingFunction = '';
        element.style.animationFillMode = '';
        this.removeWillChange(element);
        element.dataset.swaAnimated = 'false';
        // Clean up overflow flag if present
        if (causedOverflow) {
            delete element.dataset.swaCausedOverflow;
        }
        element.offsetHeight; // Trigger reflow

        // Manage overflow class removal if this element was causing overflow
        if (causedOverflow) {
          this.activeOverflowAnimations--;
          if (this.activeOverflowAnimations === 0) {
            document.body.classList.remove(this.overflowBodyClass);
          }
        }
      };

      if (el.hasAttribute('data-swa-group')) {
        Array.from(el.children).forEach(child => resetTarget(child));
      } else {
        resetTarget(el);
      }
    },

    // --- Helper functions for will-change ---
    addWillChange(el) {
        const applyWillChange = (element) => {
            if (!element.style.willChange) {
                element.style.willChange = 'transform, opacity';
            }
        };
        if (el.hasAttribute('data-swa-group')) {
            Array.from(el.children).forEach(child => applyWillChange(child));
        } else {
            applyWillChange(el);
        }
    },
    removeWillChange(el) {
        const clearWillChange = (element) => {
            element.style.willChange = '';
        };
        if (el.hasAttribute('data-swa-group')) {
            Array.from(el.children).forEach(child => clearWillChange(child));
        } else {
            clearWillChange(el);
        }
    },
    // --- End Helper functions ---

    getElementOptions(el) {
      return {
        animation: el.dataset.swa,
        offset: parseInt(el.dataset.swaOffset) || this.config.offset,
        delay: parseInt(el.dataset.swaDelay) || 0,
        duration: parseInt(el.dataset.swaDuration) || this.config.duration,
        easing: el.dataset.swaEasing || this.config.easing,
        mirror: el.dataset.swaMirror === 'true' || this.config.mirror,
        once: el.dataset.swaOnce === 'true' || this.config.once,
        anchorPlacement: el.dataset.swaAnchorPlacement || this.config.anchorPlacement,
      };
    },
    getGroupOptions(groupEl) {
      return {
        animation: groupEl.dataset.swaGroup, // Base animation for group
        offset: parseInt(groupEl.dataset.swaGroupOffset) || this.config.offset,
        delay: parseInt(groupEl.dataset.swaGroupDelay) || 0,
        duration: parseInt(groupEl.dataset.swaGroupDuration) || this.config.duration,
        easing: groupEl.dataset.swaGroupEasing || this.config.easing,
        mirror: groupEl.dataset.swaGroupMirror === 'true' || this.config.mirror,
        once: groupEl.dataset.swaGroupOnce === 'true' || this.config.once,
        anchorPlacement: groupEl.dataset.swaGroupAnchorPlacement || this.config.anchorPlacement,
      };
    },
  };

  // Assign SWA to global scope
  global.SWA = SWA;

  // CommonJS and AMD support
  if (typeof module === 'object' && module.exports) {
    module.exports = SWA;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return SWA; });
  }
})(typeof window !== 'undefined' ? window : this);
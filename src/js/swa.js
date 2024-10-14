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

    init(options = {}) {
      this.config = { ...this.config, ...options };
      this.elements = document.querySelectorAll('[data-swa], [data-swa-group]');
      this.setupObserver();
    },

    setupObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
          } else if (this.config.mirror) {
            this.resetElement(entry.target);
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
        
        this.applySingleAnimation(child, {
          ...groupOptions,
          animation: childAnimation,
          delay: groupOptions.delay + childDelay
        });
      });

      groupEl.dataset.swaAnimated = 'true';
    },

    applySingleAnimation(el, options = {}) {
      const elOptions = this.getElementOptions(el);
      const finalOptions = { ...elOptions, ...options };
      
      if (finalOptions.once && el.dataset.swaAnimated === 'true') return;

      el.style.animationDelay = `${finalOptions.delay}ms`;
      el.style.animationDuration = `${finalOptions.duration}ms`;
      el.style.animationTimingFunction = finalOptions.easing;
      el.style.animationFillMode = 'both';
      el.style.animationName = finalOptions.animation;

      el.dataset.swaAnimated = 'true';
    },

    resetElement(el) {
      const options = el.hasAttribute('data-swa-group') ? this.getGroupOptions(el) : this.getElementOptions(el);
      
      if (options.once && el.dataset.swaAnimated === 'true') return;

      if (el.hasAttribute('data-swa-group')) {
        Array.from(el.children).forEach(child => {
          child.style.animationName = 'none';
          child.dataset.swaAnimated = 'false';
          child.offsetHeight; // Trigger reflow
        });
      } else {
        el.style.animationName = 'none';
        el.dataset.swaAnimated = 'false';
      }
      
      // Trigger reflow to ensure the animation runs
      el.offsetHeight;
    },

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
        animation: groupEl.dataset.swaGroup,
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
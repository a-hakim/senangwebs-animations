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
      this.elements = document.querySelectorAll('[data-swa]');
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
      const options = this.getElementOptions(el);
      
      if (options.once && el.dataset.swaAnimated === 'true') return;

      el.style.animationDelay = `${options.delay}ms`;
      el.style.animationDuration = `${options.duration}ms`;
      el.style.animationTimingFunction = options.easing;
      el.style.animationFillMode = 'both';
      el.style.animationName = options.animation;

      el.dataset.swaAnimated = 'true';
    },

    resetElement(el) {
      const options = this.getElementOptions(el);
      
      if (options.once && el.dataset.swaAnimated === 'true') return;

      el.style.animationName = 'none';
      el.dataset.swaAnimated = 'false';
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
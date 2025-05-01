/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SWA"] = factory();
	else
		root["SWA"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/swa.js":
/*!***********************!*\
  !*** ./src/js/swa.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// SenangWebs Animations (swa.js)\n\n(function (global) {\n  var SWA = {\n    config: {\n      offset: 120,\n      duration: 600,\n      easing: 'ease-out',\n      once: true,\n      mirror: false,\n      anchorPlacement: 'top-bottom'\n    },\n    activeOverflowAnimations: 0,\n    // Counter for overflow-causing animations\n    overflowBodyClass: 'swa-body-overflow-hidden',\n    // CSS class to add to body\n    init: function init() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      this.config = _objectSpread(_objectSpread({}, this.config), options);\n      this.elements = document.querySelectorAll('[data-swa], [data-swa-group]');\n      // Inject the necessary CSS rule for body overflow\n      this.injectOverflowStyle();\n      this.setupObserver();\n    },\n    // Helper function to check if animation might cause overflow\n    isOverflowAnimation: function isOverflowAnimation(animationName) {\n      // Add animation names that translate horizontally, diagonally, or zoom out\n      return animationName && (animationName.includes('left') || animationName.includes('right') || animationName.includes('zoom-out'));\n    },\n    // Inject CSS rule into the head\n    injectOverflowStyle: function injectOverflowStyle() {\n      var styleId = 'swa-overflow-style';\n      if (document.getElementById(styleId)) return; // Avoid duplicate injection\n\n      var css = \"body.\".concat(this.overflowBodyClass, \" { overflow-x: hidden !important; }\");\n      var head = document.head || document.getElementsByTagName('head')[0];\n      var style = document.createElement('style');\n      style.id = styleId;\n      style.type = 'text/css';\n      if (style.styleSheet) {\n        // This is required for IE8 and below.\n        style.styleSheet.cssText = css;\n      } else {\n        style.appendChild(document.createTextNode(css));\n      }\n      head.appendChild(style);\n    },\n    setupObserver: function setupObserver() {\n      var _this = this;\n      var observer = new IntersectionObserver(function (entries) {\n        entries.forEach(function (entry) {\n          var targetElement = entry.target;\n          if (entry.isIntersecting) {\n            _this.addWillChange(targetElement);\n            requestAnimationFrame(function () {\n              _this.animateElement(targetElement);\n            });\n          } else if (_this.config.mirror && targetElement.dataset.swaAnimated === 'true') {\n            _this.resetElement(targetElement);\n          }\n        });\n      }, {\n        threshold: 0,\n        rootMargin: \"0px 0px -\".concat(this.config.offset, \"px 0px\")\n      });\n      this.elements.forEach(function (el) {\n        return observer.observe(el);\n      });\n    },\n    animateElement: function animateElement(el) {\n      if (el.hasAttribute('data-swa-group')) {\n        this.animateGroup(el);\n      } else {\n        this.applySingleAnimation(el);\n      }\n    },\n    animateGroup: function animateGroup(groupEl) {\n      var _this2 = this;\n      var groupOptions = this.getGroupOptions(groupEl);\n      var groupType = groupEl.getAttribute('data-swa-group-type') || 'simultaneous';\n      var groupAnimation = groupEl.getAttribute('data-swa-group');\n      var intervalDuration = parseInt(groupEl.getAttribute('data-swa-group-interval-duration')) || 0;\n      var children = Array.from(groupEl.children);\n      children.forEach(function (child, index) {\n        var childDelay = groupType === 'sequence' ? index * intervalDuration : 0;\n        var childAnimation = child.getAttribute('data-swa') || groupAnimation;\n\n        // Pass group options down, including potential group animation name\n        _this2.applySingleAnimation(child, _objectSpread(_objectSpread({}, groupOptions), {}, {\n          animation: childAnimation,\n          delay: groupOptions.delay + childDelay,\n          // Store original animation name for overflow check later\n          _originalAnimationName: childAnimation\n        }));\n      });\n      groupEl.dataset.swaAnimated = 'true';\n    },\n    applySingleAnimation: function applySingleAnimation(el) {\n      var _this3 = this;\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      var elOptions = this.getElementOptions(el);\n      // Merge element options with passed options (from group or direct call)\n      var finalOptions = _objectSpread(_objectSpread({}, elOptions), options);\n      // Use the explicitly passed animation name or fallback to element's data-swa\n      var animationName = finalOptions.animation || el.dataset.swa;\n      // Use the stored original name if available (for group children), else the final name\n      var originalAnimationName = finalOptions._originalAnimationName || animationName;\n      if (!animationName) return; // Skip if no animation is defined\n\n      var isOverflowing = this.isOverflowAnimation(originalAnimationName);\n      if (finalOptions.once && el.dataset.swaAnimated === 'true') {\n        this.removeWillChange(el);\n        return;\n      }\n\n      // Manage overflow class\n      if (isOverflowing) {\n        if (this.activeOverflowAnimations === 0) {\n          document.body.classList.add(this.overflowBodyClass);\n        }\n        this.activeOverflowAnimations++;\n        // Store flag on element to know if it contributed to overflow count\n        el.dataset.swaCausedOverflow = 'true';\n      }\n\n      // Apply animation styles\n      el.style.animationDelay = \"\".concat(finalOptions.delay, \"ms\");\n      el.style.animationDuration = \"\".concat(finalOptions.duration, \"ms\");\n      el.style.animationTimingFunction = finalOptions.easing;\n      el.style.animationFillMode = 'both';\n      el.style.animationName = animationName; // Use the determined animation name\n\n      el.dataset.swaAnimated = 'true';\n      var totalDuration = finalOptions.duration + finalOptions.delay;\n      setTimeout(function () {\n        if (el.dataset.swaAnimated === 'true') {\n          // Check if still animated\n          _this3.removeWillChange(el);\n          // Manage overflow class removal\n          if (el.dataset.swaCausedOverflow === 'true') {\n            _this3.activeOverflowAnimations--;\n            if (_this3.activeOverflowAnimations === 0) {\n              document.body.classList.remove(_this3.overflowBodyClass);\n            }\n            // Clean up the flag\n            delete el.dataset.swaCausedOverflow;\n          }\n        }\n      }, totalDuration);\n    },\n    resetElement: function resetElement(el) {\n      var _this4 = this;\n      var options = el.hasAttribute('data-swa-group') ? this.getGroupOptions(el) : this.getElementOptions(el);\n      var resetTarget = function resetTarget(element) {\n        // Check if this element caused overflow before resetting its state\n        var causedOverflow = element.dataset.swaCausedOverflow === 'true';\n        element.style.animationName = 'none';\n        element.style.animationDelay = '';\n        element.style.animationDuration = '';\n        element.style.animationTimingFunction = '';\n        element.style.animationFillMode = '';\n        _this4.removeWillChange(element);\n        element.dataset.swaAnimated = 'false';\n        // Clean up overflow flag if present\n        if (causedOverflow) {\n          delete element.dataset.swaCausedOverflow;\n        }\n        element.offsetHeight; // Trigger reflow\n\n        // Manage overflow class removal if this element was causing overflow\n        if (causedOverflow) {\n          _this4.activeOverflowAnimations--;\n          if (_this4.activeOverflowAnimations === 0) {\n            document.body.classList.remove(_this4.overflowBodyClass);\n          }\n        }\n      };\n      if (el.hasAttribute('data-swa-group')) {\n        Array.from(el.children).forEach(function (child) {\n          return resetTarget(child);\n        });\n      } else {\n        resetTarget(el);\n      }\n    },\n    // --- Helper functions for will-change ---\n    addWillChange: function addWillChange(el) {\n      var applyWillChange = function applyWillChange(element) {\n        if (!element.style.willChange) {\n          element.style.willChange = 'transform, opacity';\n        }\n      };\n      if (el.hasAttribute('data-swa-group')) {\n        Array.from(el.children).forEach(function (child) {\n          return applyWillChange(child);\n        });\n      } else {\n        applyWillChange(el);\n      }\n    },\n    removeWillChange: function removeWillChange(el) {\n      var clearWillChange = function clearWillChange(element) {\n        element.style.willChange = '';\n      };\n      if (el.hasAttribute('data-swa-group')) {\n        Array.from(el.children).forEach(function (child) {\n          return clearWillChange(child);\n        });\n      } else {\n        clearWillChange(el);\n      }\n    },\n    // --- End Helper functions ---\n    getElementOptions: function getElementOptions(el) {\n      return {\n        animation: el.dataset.swa,\n        offset: parseInt(el.dataset.swaOffset) || this.config.offset,\n        delay: parseInt(el.dataset.swaDelay) || 0,\n        duration: parseInt(el.dataset.swaDuration) || this.config.duration,\n        easing: el.dataset.swaEasing || this.config.easing,\n        mirror: el.dataset.swaMirror === 'true' || this.config.mirror,\n        once: el.dataset.swaOnce === 'true' || this.config.once,\n        anchorPlacement: el.dataset.swaAnchorPlacement || this.config.anchorPlacement\n      };\n    },\n    getGroupOptions: function getGroupOptions(groupEl) {\n      return {\n        animation: groupEl.dataset.swaGroup,\n        // Base animation for group\n        offset: parseInt(groupEl.dataset.swaGroupOffset) || this.config.offset,\n        delay: parseInt(groupEl.dataset.swaGroupDelay) || 0,\n        duration: parseInt(groupEl.dataset.swaGroupDuration) || this.config.duration,\n        easing: groupEl.dataset.swaGroupEasing || this.config.easing,\n        mirror: groupEl.dataset.swaGroupMirror === 'true' || this.config.mirror,\n        once: groupEl.dataset.swaGroupOnce === 'true' || this.config.once,\n        anchorPlacement: groupEl.dataset.swaGroupAnchorPlacement || this.config.anchorPlacement\n      };\n    }\n  };\n\n  // Assign SWA to global scope\n  global.SWA = SWA;\n\n  // CommonJS and AMD support\n  if (( false ? 0 : _typeof(module)) === 'object' && module.exports) {\n    module.exports = SWA;\n  } else if (true) {\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n      return SWA;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  }\n})(typeof window !== 'undefined' ? window : this);\n\n//# sourceURL=webpack://SWA/./src/js/swa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/swa.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
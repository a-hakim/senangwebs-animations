!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SWA=e():t.SWA=e()}(this,(()=>(()=>{var t={748:function(t,e,n){var o,r,i;function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return(e=function(t){var e=function(t){if("object"!=a(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==a(e)?e:e+""}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}t=n.nmd(t),r="undefined"!=typeof window?window:this,i={config:{offset:120,duration:600,easing:"ease-out",once:!0,mirror:!1,anchorPlacement:"top-bottom"},init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.config=c(c({},this.config),t),this.elements=document.querySelectorAll("[data-swa]"),this.setupObserver()},setupObserver:function(){var t=this,e=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?t.animateElement(e.target):t.config.mirror&&t.resetElement(e.target)}))}),{threshold:0,rootMargin:"0px 0px -".concat(this.config.offset,"px 0px")});this.elements.forEach((function(t){return e.observe(t)}))},animateElement:function(t){var e=this.getElementOptions(t);e.once&&"true"===t.dataset.swaAnimated||(t.style.animationDelay="".concat(e.delay,"ms"),t.style.animationDuration="".concat(e.duration,"ms"),t.style.animationTimingFunction=e.easing,t.style.animationFillMode="both",t.style.animationName=e.animation,t.dataset.swaAnimated="true")},resetElement:function(t){this.getElementOptions(t).once&&"true"===t.dataset.swaAnimated||(t.style.animationName="none",t.dataset.swaAnimated="false")},getElementOptions:function(t){return{animation:t.dataset.swa,offset:parseInt(t.dataset.swaOffset)||this.config.offset,delay:parseInt(t.dataset.swaDelay)||0,duration:parseInt(t.dataset.swaDuration)||this.config.duration,easing:t.dataset.swaEasing||this.config.easing,mirror:"true"===t.dataset.swaMirror||this.config.mirror,once:"true"===t.dataset.swaOnce||this.config.once,anchorPlacement:t.dataset.swaAnchorPlacement||this.config.anchorPlacement}}},r.SWA=i,"object"===a(t)&&t.exports?t.exports=i:void 0===(o=function(){return i}.call(e,n,e,t))||(t.exports=o)}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={id:o,loaded:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}return n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),n(748)})()));
# SenangWebs Animations (SWA)

SenangWebs Animations (SWA) is a lightweight JavaScript library that enables smooth, customizable animations for HTML elements as they enter the viewport during scrolling. With minimal setup, you can add engaging animations to your web pages, enhancing the user experience.

## Features

- Easy to integrate with existing projects
- Supports various animation types: fade, flip, and zoom
- Customizable animation parameters via data attributes
- Efficient performance using Intersection Observer API
- Global configuration options
- Responsive and works on all modern browsers

## Installation

1. Download the `swa.js` and `swa.css` files from this repository.
2. Include both files in your HTML:

```html
<link rel="stylesheet" href="path/to/swa.css">
<script src="path/to/swa.js"></script>
```

## Usage

1. Initialize the library in your JavaScript code:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  SWA.init({
    // Optional global configuration
    offset: 120,
    duration: 600,
    easing: 'ease-out',
    once: true,
  });
});
```

2. Add data attributes to the HTML elements you want to animate:

```html
<div
  data-swa="fade-up"
  data-swa-offset="200"
  data-swa-delay="50"
  data-swa-duration="1000"
  data-swa-easing="ease-in-out"
  data-swa-mirror="true"
  data-swa-once="false"
  data-swa-anchor-placement="top-center"
>
  This element will animate when scrolled into view.
</div>
```

## Configuration Options

You can configure animations globally or per element using the following options:

- `data-swa`: Animation type (e.g., "fade-up", "flip-left", "zoom-in")
- `data-swa-offset`: Distance (in pixels) from the viewport before triggering the animation
- `data-swa-delay`: Delay before starting the animation (in milliseconds)
- `data-swa-duration`: Duration of the animation (in milliseconds)
- `data-swa-easing`: Easing function for the animation (e.g., "ease-in-out", "linear")
- `data-swa-mirror`: When set to "true", the animation repeats when scrolling back up
- `data-swa-once`: If "true", the animation only occurs once
- `data-swa-anchor-placement`: The anchor point of the element for animation start (e.g., "top-center", "center-bottom")

## Supported Animations

- Fade: fade, fade-up, fade-down, fade-left, fade-right
- Flip: flip-up, flip-down, flip-left, flip-right
- Zoom: zoom-in, zoom-out

## Browser Support

SenangWebs Animations works on all modern browsers that support the Intersection Observer API, including:

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+
- Opera 38+

For older browsers, consider using a polyfill for the Intersection Observer API.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various scroll animation libraries in the web development community
- Thanks to all contributors who have helped to improve this library

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Happy animating!
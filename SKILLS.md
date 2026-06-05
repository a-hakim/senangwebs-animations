---
name: senangwebs-animations
description: Smooth, customizable viewport-entry animations for HTML elements via Intersection Observer with data attributes or JS API.
version: 1.1.8
package: senangwebs-animations
---

# SenangWebs Animations (SWA)

## Quick Reference

- **Purpose**: Scroll-triggered CSS animations as elements enter the viewport
- **Entry**: `dist/swa.js`
- **Dependencies**: none
- **Scripts**: `npm run build`, `npm run dev`, `npm run test`

## Workflow

Start in `C:\wamp64\www\sw-libraries\senangwebs-animations`. Read `README.md`, `package.json`, and touched source files before editing. Match existing vanilla JS patterns, CSS prefix `swa-`, and dist output conventions.

## HTML Data Attributes

### Element-level
| Attribute | Values | Default |
|---|---|---|
| `data-swa` | `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-up-left`, `fade-up-right`, `fade-down-left`, `fade-down-right`, `flip-up`, `flip-down`, `flip-left`, `flip-right`, `zoom-in`, `zoom-out`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `slide-up-left`, `slide-up-right`, `slide-down-left`, `slide-down-right`, `bounce-in`, `bounce-out` | — |
| `data-swa-offset` | pixels (number) | 120 |
| `data-swa-delay` | ms (number) | 0 |
| `data-swa-duration` | ms (number) | 600 |
| `data-swa-easing` | CSS easing string | `ease-out` |
| `data-swa-mirror` | `"true"` / `"false"` | `false` |
| `data-swa-once` | `"true"` / `"false"` | `true` |
| `data-swa-anchor-placement` | e.g. `"top-center"`, `"center-bottom"` | `"top-bottom"` |

### Group-level
| Attribute | Values |
|---|---|
| `data-swa-group` | animation type for children |
| `data-swa-group-type` | `"simultaneous"` (default) or `"sequence"` |
| `data-swa-group-interval-duration` | ms between items |
| `data-swa-group-offset`, `-delay`, `-duration`, `-easing`, `-mirror`, `-once`, `-anchor-placement` | same as element-level |

## JavaScript API

```js
SWA.init({ offset, duration, easing, once, mirror, anchorPlacement, disabled })
SWA.play(selector | element)
SWA.stop(selector | element)
SWA.reset(selector | element)
```

## Focus Areas

- IntersectionObserver lifecycle, viewport thresholds, batch observation
- Animation CSS class toggling, `will-change` hints, reflow avoidance
- Group sequence timing, interval accumulation, child-level overrides
- `disabled` mode: elements render in final state instantly
- `play()` works even when globally disabled

## Implementation Guidance

- Preserve backward compatibility for all documented attributes, export names, CSS classes, and dist filenames
- Keep examples concise and copy-pasteable
- Update README when public API or behavior changes
- Test scroll behavior in desktop and mobile viewports

## Validation

```bash
npm run build   # required after changes
npm test        # when available
npm run dev     # only for manual browser verification
```

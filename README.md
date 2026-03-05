# Aurum Grand Hotel — Website

A fully hand-coded luxury hotel website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just three files you can open in any browser.

---

## Project Structure

```
aurum-grand/
├── index.html      # Full website markup
├── style.css       # All styling and animations
├── script.js       # Interactions, booking form logic, particles
└── README.md       # This file
```

---

## Getting Started

No installation or setup required.

1. Download all three files into the same folder
2. Open `index.html` in any modern browser
3. That's it

For best results use Chrome, Firefox, Safari, or Edge (latest versions). An internet connection is required to load fonts and images from Google Fonts and Unsplash CDNs.

---

## What's Included

### Pages & Sections

| Section | Description |
|---|---|
| **Navigation** | Fixed top nav with scroll-activated frosted glass effect, active link highlight, and mobile hamburger menu |
| **Hero** | Full-screen hotel photo background with animated rings, floating gold particles, and staggered entrance animations |
| **Stats Ribbon** | Key hotel numbers — 100 years, 248 suites, 12 dining venues, 5-star rating |
| **Experience** | Editorial layout with hotel photo and three feature cards (Concierge, Sommelier, Wellness) |
| **Rooms & Suites** | Five room cards with real photography, hover zoom, price, and amenity tags |
| **Dining** | Four dining venues with individual food photography |
| **Gallery** | Asymmetric CSS grid with six images and hover label overlays |
| **Testimonials** | Three guest review cards with portrait photos |
| **Reservation Form** | Full 4-step booking form with live sidebar summary |
| **Footer** | Four-column footer with navigation, services, and contact info |

### Booking Form (4 Steps)

- **Step 1 — Dates:** Check-in / check-out date pickers with automatic night count and minimum date enforcement
- **Step 2 — Room:** Visual room selector with photo cards and a detailed preview panel on selection
- **Step 3 — Guests:** Full name, email, adult/child counters, and optional special requests field
- **Step 4 — Review:** Full booking summary with itemised price breakdown (base rate, 12% tax, 5% service charge) and a confirmation success state

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Animations, grid, flexbox, custom properties |
| Vanilla JavaScript (ES6+) | All interactivity — no jQuery, no frameworks |
| Tailwind CSS (CDN) | Utility classes for layout and spacing |
| Google Fonts | Cormorant Garamond (display) + Montserrat (body) |
| Unsplash CDN | All photography (free to use) |
| Canvas API | Floating gold particle animation |
| IntersectionObserver API | Scroll-reveal animations and nav spy |

---

## Features

- **Zero dependencies** — no npm, no build step, no Node.js
- **Fully responsive** — mobile, tablet, and desktop layouts
- **Scroll-reveal animations** — cards and sections animate in as you scroll
- **Active nav highlighting** — current section is highlighted in the nav automatically
- **Multi-step form validation** — per-step validation with inline error messages and shake animation
- **Live booking sidebar** — updates in real time as the user fills out the form
- **Price calculator** — automatically computes base rate, tax, and service charge
- **Floating particle system** — canvas-based gold dust animation in the hero
- **Smooth scroll** — all anchor links scroll smoothly to their target section
- **Image hover effects** — room and gallery images zoom and darken on hover with overlay reveals

---

## Customisation

### Changing Room Prices or Details

Open `script.js` and edit the `ROOMS` object near the top of the file:

```js
const ROOMS = {
  'classic-single': {
    name:  'Classic Single',
    price: 120,           // price per night in USD
    img:   'https://...',  // swap for your own image URL
    desc:  'Room description...',
    amenities: ['King Bed', 'Wi-Fi', ...],
  },
  // ...
};
```

### Changing Colours

The gold and cream palette is defined in two places:

**Tailwind config** (inside `index.html` `<script>` tag):
```js
colors: {
  gold: { DEFAULT: '#c9a84c', light: '#e8d5a3', dark: '#9b7a2e' },
  cream: '#faf7f2',
  obsidian: '#0e0c09',
}
```

**CSS custom values** (used inline throughout `style.css`) — search for `rgba(201,168,76` to find all gold colour usages.

### Replacing Images

All images are loaded from Unsplash URLs. To use your own:

1. Find the relevant `<img>` tag in `index.html`
2. Replace the `src` attribute with your image path or URL
3. For room card images in the booking form, update the `img` field in the `ROOMS` object in `script.js`

### Changing Tax and Service Rates

In `script.js`, find the `calcTotal` function:

```js
function calcTotal() {
  const base    = ROOMS[roomKey].price * nights;
  const tax     = Math.round(base * 0.12);  // 12% tax
  const service = Math.round(base * 0.05);  // 5% service charge
  return base + tax + service;
}
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full |
| Edge 90+ | Full |
| IE 11 | Not supported |

---

## Credits

- **Photography** — [Unsplash](https://unsplash.com) (free to use under the Unsplash License)
- **Fonts** — [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Montserrat
- **CSS utilities** — [Tailwind CSS](https://tailwindcss.com) via CDN
- **Design & Code** — Aurum Grand Hotel project

---

## License

This project is for demonstration and portfolio purposes. All photography is sourced from Unsplash and is free to use. Font licenses apply per Google Fonts terms.
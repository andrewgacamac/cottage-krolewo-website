# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a luxury real estate website for a cottage property in Królewo, Poland. The website is a single-page application built with vanilla HTML, CSS, and JavaScript, designed to showcase the property with premium aesthetics and optimal performance.

## Key Commands

- **Local Development**: Open `index.html` directly in a browser or use a local server:
  ```bash
  python -m http.server 8000
  # or
  npx serve
  ```

- **Check File Structure**: 
  ```bash
  find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" | sort
  ```

## Architecture

### Frontend Structure
- **index.html**: Single-page application with sections for hero, story, gallery, features, location, and contact
- **CSS Architecture**: 
  - `luxury-styles.css`: Core styles with CSS variables for theming
  - `responsive.css`: Mobile-first responsive design
  - `animations.css`: Keyframes and transition definitions
- **JavaScript Modules**:
  - `smooth-scroll.js`: Navigation and scroll behavior
  - `gallery-theater.js`: Interactive image gallery with modal viewing
  - `parallax.js`: Parallax scrolling effects
  - `contact-handler.js`: Form validation and submission

### Design System
- **Colors**: Forest green (#0B4F1C), Luxury gold (#D4AF37), Rich charcoal (#2C2C2C), Soft ivory (#FAF9F6)
- **Typography**: Bodoni Moda (headings), Proxima Nova (body)
- **Breakpoints**: Mobile (<768px), Tablet (768px-1023px), Desktop (1024px+)

### Key Features
- Theater mode image gallery with touch support
- Parallax scrolling effects (disabled for reduced motion preference)
- Polish phone number validation in contact form
- SEO optimization with structured data
- Performance optimizations (lazy loading, throttled scroll events)

## Important Notes

- **Google Maps API**: The API key in index.html needs to be replaced with a valid key
- **Form Submission**: Currently simulated - needs backend integration in `contact-handler.js`
- **Images**: Located in `assets/images/` - consider compression for production
- **Accessibility**: Includes reduced motion support and ARIA labels
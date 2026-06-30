# 👑 Nizam's Daawat — Immersive Royal Deccan Restaurant

[![Vite React TS Build](https://github.com/kskreddy2k7/nizams-royal-restaurant/actions/workflows/deploy.yml/badge.svg)](https://kskreddy2k7.github.io/nizams-royal-restaurant/)
[![Deploy Status](https://img.shields.io/badge/deployment-GitHub%20Pages-sky-brightgreen)](https://kskreddy2k7.github.io/nizams-royal-restaurant/)
[![Creative Scale](https://img.shields.io/badge/Awwwards-Candidate-darkred)](#)

> "I've never seen a restaurant website like this."

Nizam's Daawat is a production-ready, cinematic, highly interactive Indian restaurant landing page built to celebrate the heritage, architecture, spices, and cuisine of South India and royal Hyderabad. Designed as an **Awwwards Site of the Day** candidate, it combines Three.js (React Three Fiber), GSAP ScrollTrigger, and custom SVG visualizers into a luxury digital narrative.

---

## 🎨 Creative Aesthetics & Features

### 1. The Alchemy of Spice preloader
- Tracks loading progress with gold fire ember particles rising over a double-rotating vector outline mandala.
- Rings a traditional temple bell chime once loading completes to ground the sensory experience.

### 2. 3D Dum Biryani Handi & Spice Orbitals (Three.js / React Three Fiber)
- Renders an interactive 3D brass and copper cooking pot (Handi) with a domed lid.
- Features procedural 3D spice meshes: **Star Anise** (8-point cones), **Cardamom Pods** (ribbed green toruses), and **Cloves** (headed stems).
- **GSAP ScrollTrigger assembly**: As the user scrolls, the spices drop into the Handi pot layer-by-layer. Once aligned, the domed lid bounce-snaps closed.

### 3. Dual-Layout AC & Non-AC Floor Plan Seating
- Interactive SVG map separated into two climate-controlled rooms:
  - **Royal AC Chamber (Indoor Palace Room)**: Styled in a cool cyan/sky-blue glow.
  - **Open-Air Courtyard (Non-AC Patio)**: Styled in a warm amber/copper glow.
- Table selection supports specific sharing options: **2 sharing, 4 sharing, 6 sharing, and a Grand Banquet Table for 12 sharing** (complete with 12 orbiting chairs).
- **Dynamic Seating Area Filter**: Selecting a preferred seating area on the booking form dynamically dims mismatched tables to 20% opacity and disables selection.
- **Scroll Invitation Receipt**: Successful submissions print out a gold invitation scroll featuring details, barcode lines, and climate wind/sun icons.

### 4. Rich Color Scheme
- Deep Matte Black, Turmeric Gold, Kashmiri Saffron Orange, Cardamom Green, Vermillion Maroon, and Royal Rose.
- Smooth inertial scrolling driven by Lenis.

---

## 📂 Project Architecture

```
src/
├── assets/                  # Core static files, icons, and generated images
├── components/
│   ├── Preloader.tsx        # Rotating mandalas, gold sparks, and bell sounds
│   ├── CustomCursor.tsx     # Delayed spring cursor tracking hover states
│   ├── Navbar.tsx           # Floating header logo with Hyderabad contact details
│   ├── Canvas3D.tsx         # 3D Brass Handi, gold steam, and spice orbits
│   └── UI/                  # Reusable luxury components
├── sections/
│   ├── Hero.tsx             # Saffron gradient headings and magnetic actions
│   ├── IngredientStory.tsx  # Spices route details and parallax vector shapes
│   ├── SignatureDish.tsx    # Biryani assembly scroll-pin timeline
│   ├── ChefStory.tsx        # Ustad Yusuf Ali timeline and Gharana milestones
│   ├── Menu.tsx             # 12 unique food card images with glare tilt shines
│   ├── Gallery.tsx          # Chronicles layout containing dining rooms & tandoors
│   ├── Testimonials.tsx     # Slider containing critiques and reviews
│   ├── KitchenScene.tsx     # Tandoor coals spark canvas simulation
│   ├── Reservation.tsx      # SVG seating maps (AC vs Non-AC, 2 to 12 sharing)
│   └── Footer.tsx           # Charminar vector road map & WhatsApp book CTA
├── index.css                # Tailwind base imports & radial gradient definitions
├── main.tsx                 # App mount & Lenis scroll initializer
└── App.tsx                  # Controller linking layout sections
```

---

## 🛠 Technology Stack

- **Framework**: React, Vite, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP, ScrollTrigger, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Smooth Scroll**: Lenis

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18+ recommended) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kskreddy2k7/nizams-royal-restaurant.git
   cd nizams-royal-restaurant
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Deployment

### Deploying to GitHub Pages

The repository base is configured inside `vite.config.ts` as `/nizams-royal-restaurant/` to resolve paths correctly under subfolders.

To deploy manually:
1. Build the production files:
   ```bash
   npm run build
   ```
2. Deploy the `dist` directory to your hosting provider or push the compiled files to a `gh-pages` branch.

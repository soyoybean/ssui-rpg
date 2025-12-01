# SSUI RPG

A whimsical Role-Playing Game (RPG) interface built for Software Structures for User Interfaces Fall 2025.

## Deployed website: [https://ssui-4da8so4dn-soyon-kims-projects.vercel.app](https://ssui-rpg-rtcc-d1jqvxbjx-soyon-kims-projects.vercel.app/)

## How to Run This Project Locally
Follow these steps to clone, install, and run the RPG locally on your computer.

1. Clone the Repository
Open your terminal and run:
git clone https://github.com/soyoybean/ssui-rpg.git
cd ssui-rpg

2. Install Dependencies
This project requires:

Node.js 20.19+ or 22+
(Vite will NOT run correctly on Node 18.)

Check your version:
node -v

If you need to upgrade, install from:
https://nodejs.org/en/download/prebuilt-installer

Then install all packages:
npm install

If you run into errors, try:
rm -rf node_modules
npm install

3. Start the Development Server

Run:
npm run dev

Then open the app:
http://localhost:5173

You should now see the interactive world map, custom cursor, quests, and houses.


## Tech Stack & Frameworks
React 18 — UI rendering & components
Vite — fast dev server + bundling
JavaScript (ESNext)
CSS custom animations
Custom sprite engine for cat cursor
Responsive hotspot scaling algorithm
Dialogue engine with typewriter animation
Quest system with unlockable items
Vercel for hosting


## Features
### Custom Illustrated World Map
Fully responsive scaling
Hotspots mapped to original illustration coordinates
Smooth navigation to NPC scenes

### Custom Animated Cursor System
Sprite-based cat cursor
Trailing pawprint system with fade-out
Hover + click sprite variants
Switches to paw icon during dialogue

### NPC Dialogue System
Typewriter animation
NPC portrait + themed dialogue panel
Next-line interactions
Exit transitions

### Quest System
Quest progression logic
Unlockable reward icons
Highlighted “next quest” guidance
Confetti celebration on full completion
(Confetti only triggers on final quest completion)

### Transitions & HCI Elements
Smooth fade transitions between world ↔ dialogue
Large clickable regions for accessibility
High-contrast feedback signals (hover glow, cursor change)
UIs grounded in SSUI course concepts (feedback, constraints, animation, mixed-initiative)

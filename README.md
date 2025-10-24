# DArtB Teams 2025 - Team Announcement Website

A modern, interactive website to display DArtB team assignments with dramatic visual effects and animations.

## Features

- 🔐 **Password-protected login** (Password: `dartb6`)
- 💥 **Explosion effects** when teams are revealed
- 🎵 **Dynamic sound effects** using Web Audio API
- 🎨 **Deep blue and purple theme** with white accents
- 📱 **Fully responsive** design
- ✨ **Interactive 3D card effects** on hover
- 🌟 **Floating particle animations**

## How to Use

1. Open `index.html` in a modern web browser
2. Enter the password: **dartb6**
3. Watch as the teams are revealed with dramatic explosions!

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - JavaScript for interactions, effects, and data parsing
- `teamdata.xml` - Team data (must be in the same directory)

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Features Breakdown

### Login Screen
- Password protection
- Floating particle background
- Smooth transitions
- Error handling with shake animation

### Teams Display
- Grid layout with responsive design
- Each team card shows:
  - Team name and ID
  - Domain and topics
  - Member count statistics
  - Detailed member information (name, generation, role, details)
- Staggered reveal animations
- Explosion effects with particles
- 3D hover effects
- Sound effects for each reveal

### Visual Theme
- Deep blue (#0a0e27, #1a1f4d)
- Purple shades (#6b46c1, #4c1d95, #9d7ce3)
- White (#ffffff) for text and accents
- Glowing effects and shadows

## Customization

To change the password, edit the constant in `script.js`:
```javascript
const CORRECT_PASSWORD = 'dartb6';
```

To adjust animation timings, modify the delays in the `displayTeams()` function.

## Credits

Created for DArtB 2025 Team Announcements


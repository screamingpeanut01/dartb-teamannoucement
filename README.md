# DArtB Teams 2025 - Team Announcement Website

A modern, interactive website to display DArtB team assignments with dynamic visual effects and randomization.

## Features

- 🎲 **Animated Team Number Shuffling** - Team numbers rapidly shuffle before revealing final assignment (1-6)
- 🎰 **Slot Machine Member Selection** - Names scroll through before highlighting the selected member
- ⭐ **Random Member Highlighting** - One member per team is randomly highlighted with golden accent
- 🎨 **Deep blue and purple theme** with white accents
- 📱 **Fully responsive** design
- ✨ **Interactive 3D card effects** on hover
- 💫 **Smooth animations** - Engaging visual effects throughout

## How to Use

1. Open `index.html` in a modern web browser
2. Watch the animations:
   - **First 2 seconds**: Team numbers shuffle rapidly before settling on final assignments (1-6)
   - **Next 2-3 seconds**: Member names scroll through like a slot machine
   - **Final reveal**: One randomly selected member per team is highlighted in gold

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

### Teams Display
- Grid layout with responsive design
- Each team card shows:
  - Team name and randomly assigned ID (1-6)
  - Domain and topics
  - Member count statistics
  - Detailed member information (name, generation, role, details)
- **Animated reveals**:
  - Team badges pulse and shuffle through numbers (15-20 iterations)
  - Member names scroll through with visual highlighting effect
  - Final selected member revealed with golden glow animation
- 3D hover effects on cards
- Smooth fade-in animations

### Visual Theme
- Deep blue (#0a0e27, #1a1f4d)
- Purple shades (#6b46c1, #4c1d95, #9d7ce3)
- White (#ffffff) for text and accents
- Golden (#fbbf24) for highlighted members
- Glowing effects and shadows

## Animations & Randomization

The page implements exciting animations and randomization on each load:

### Team Number Shuffling
- Teams are shuffled using Fisher-Yates algorithm
- Badge numbers rapidly cycle through 1-6 (15-20+ iterations)
- Pulse/scale animation during shuffle
- Each card staggers slightly for dynamic effect
- Duration: ~2 seconds

### Member Selection Animation
- Slot machine-style scroll through all members
- Each member briefly highlights as the "selector" passes through
- 20-30 iterations of scrolling
- Random speed variation per team
- Golden reveal animation on final selection
- Duration: ~2-3 seconds

### Visual Effects
- Scrolling members: opacity fade and vertical translation
- Final highlight: scale, glow, and position animation
- Smooth transitions throughout

## Team Information

**Total Teams**: 6

1. **AI Team** (6 members) - AI 모델 신뢰성, 생성형 AI, AI 응용
2. **물류 Team** (6 members) - EOQ 전략, SCM, 물류 최적화
3. **금융 Team** (6 members) - 포트폴리오 관리, 리스크 관리, 디지털 금융
4. **마케팅 Team** (6 members) - 고객 세분화, 마케팅 믹스 모델링
5. **F&B Team** (6 members) - 수요 예측, 상권 분석, 메뉴 개발
6. **엔터 Team** (5 members) - 콘텐츠 흥행 예측, 아티스트 IP

*Note: Team numbers shown above are for reference. Actual display numbers are randomized.*

## Customization

To adjust animation timings or styling, modify the relevant sections in `styles.css`.

To change the data source, update the XML file path in `script.js`:
```javascript
const response = await fetch('teamdata.xml');
```

## Credits

Created for DArtB 2025 Team Announcements

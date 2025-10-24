// Constants
const CORRECT_PASSWORD = 'dartb6';
const EXPLOSION_PARTICLES = 30;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const teamsScreen = document.getElementById('teams-screen');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const teamsContainer = document.getElementById('teams-container');

// State
let teamsData = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadTeamsData();
    
    // Enter key to submit
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});

// Create floating particles for login screen
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Load and parse XML data
async function loadTeamsData() {
    try {
        const response = await fetch('teamdata.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const teams = xmlDoc.getElementsByTagName('Team');
        teamsData = [];
        
        for (let team of teams) {
            const teamData = {
                id: team.getAttribute('id'),
                name: team.getAttribute('name'),
                memberCount: team.getAttribute('memberCount'),
                seniors: team.getAttribute('seniors'),
                juniors: team.getAttribute('juniors'),
                domain: team.getElementsByTagName('Domain')[0].textContent,
                topics: team.getElementsByTagName('Topics')[0].textContent,
                members: []
            };
            
            const members = team.getElementsByTagName('Member');
            for (let member of members) {
                teamData.members.push({
                    name: member.getElementsByTagName('Name')[0].textContent,
                    generation: member.getElementsByTagName('Generation')[0].textContent,
                    role: member.getElementsByTagName('Role')[0].textContent,
                    details: member.getElementsByTagName('Details')[0].textContent
                });
            }
            
            teamsData.push(teamData);
        }
    } catch (error) {
        console.error('Error loading team data:', error);
    }
}

// Handle login
function handleLogin() {
    const password = passwordInput.value.trim();
    
    if (password === CORRECT_PASSWORD) {
        errorMessage.textContent = '';
        playLoginSuccess();
        transitionToTeams();
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// Play login success sound and effects
function playLoginSuccess() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Transition from login to teams
function transitionToTeams() {
    setTimeout(() => {
        loginScreen.classList.remove('active');
        
        setTimeout(() => {
            teamsScreen.classList.add('active');
            displayTeams();
        }, 500);
    }, 300);
}

// Display teams with explosion effects
function displayTeams() {
    teamsContainer.innerHTML = '';
    
    teamsData.forEach((team, index) => {
        setTimeout(() => {
            const teamCard = createTeamCard(team);
            teamsContainer.appendChild(teamCard);
            
            setTimeout(() => {
                createExplosionEffect(teamCard);
                teamCard.classList.add('reveal');
                playExplosionSound();
            }, 100);
        }, index * 500);
    });
}

// Create team card HTML
function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'team-card';
    
    const membersHTML = team.members.map(member => `
        <div class="member">
            <span class="member-name">${member.name}</span>
            <span class="member-generation">${member.generation}</span>
        </div>
    `).join('');
    
    card.innerHTML = `
        <div class="team-header">
            <h2 class="team-name">${team.name}</h2>
            <div class="team-badge">Team ${team.id}</div>
        </div>
        <div class="team-domain">${team.domain}</div>
        <div class="team-topics">
            <strong>Topics:</strong> ${team.topics}
        </div>
        <div class="team-stats">
            <span>👥 ${team.memberCount} Members</span> | 
            <span>🎓 ${team.seniors} Seniors</span> | 
            <span>🌟 ${team.juniors} Juniors</span>
        </div>
        <div class="members-section">
            <h3 class="members-title">Team Members</h3>
            ${membersHTML}
        </div>
    `;
    
    return card;
}

// Create explosion effect
function createExplosionEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.position = 'fixed';
    explosion.style.left = `${centerX}px`;
    explosion.style.top = `${centerY}px`;
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '1000';
    
    for (let i = 0; i < EXPLOSION_PARTICLES; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const angle = (Math.PI * 2 * i) / EXPLOSION_PARTICLES;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Random colors between purple and blue
        const colors = ['#9d7ce3', '#6b46c1', '#4c1d95', '#3b82f6'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        explosion.appendChild(particle);
    }
    
    document.body.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

// Play explosion sound
function playExplosionSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create explosion sound effect
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.type = 'sawtooth';
    oscillator2.type = 'square';
    filter.type = 'lowpass';
    
    oscillator1.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
    
    oscillator2.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 0.3);
    
    filter.frequency.setValueAtTime(2000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.3);
    oscillator2.stop(audioContext.currentTime + 0.3);
}

// Handle logout
function handleLogout() {
    teamsScreen.classList.remove('active');
    
    setTimeout(() => {
        loginScreen.classList.add('active');
        passwordInput.value = '';
        errorMessage.textContent = '';
        teamsContainer.innerHTML = '';
    }, 500);
}

// Add some extra visual flair
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.team-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        }
    });
});

document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});


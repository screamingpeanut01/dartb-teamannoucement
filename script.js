// DOM Elements
const teamsContainer = document.getElementById('teams-container');

// State
let teamsData = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTeamsData();
});

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
        
        // Display teams immediately after loading
        displayTeams();
    } catch (error) {
        console.error('Error loading team data:', error);
        teamsContainer.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Error loading team data. Please refresh the page.</p>';
    }
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Display teams with random numbering and highlighted members
function displayTeams() {
    teamsContainer.innerHTML = '';
    
    // Shuffle teams for random numbering
    const shuffledTeams = shuffleArray(teamsData);
    
    // Display all teams simultaneously
    shuffledTeams.forEach((team, index) => {
        // Randomly select one member to highlight
        const randomMemberIndex = Math.floor(Math.random() * team.members.length);
        
        const teamCard = createTeamCard(team, index + 1, randomMemberIndex);
        teamsContainer.appendChild(teamCard);
    });
}

// Create team card HTML
function createTeamCard(team, displayNumber, highlightedMemberIndex) {
    const card = document.createElement('div');
    card.className = 'team-card';
    
    const membersHTML = team.members.map((member, index) => {
        const isHighlighted = index === highlightedMemberIndex;
        return `
        <div class="member${isHighlighted ? ' highlighted' : ''}">
            <span class="member-name">${member.name}</span>
            <span class="member-generation">${member.generation}</span>
        </div>
    `;
    }).join('');
    
    card.innerHTML = `
        <div class="team-header">
            <h2 class="team-name">${team.name}</h2>
            <div class="team-badge">Team ${displayNumber}</div>
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

// Add 3D hover effects on team cards
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

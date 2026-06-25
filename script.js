/**
 * ============================================================
 * 🎮 HUNGAMA ESPORTS – Complete JavaScript Features
 * ============================================================
 * Author: Hungama Esports Team
 * Version: 2.0
 * ============================================================
 */

// ============================================================
// 1. LOADING SCREEN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Create loading overlay if not exists
    if (!document.getElementById('loadingScreen')) {
        const loader = document.createElement('div');
        loader.id = 'loadingScreen';
        loader.innerHTML = `
            <div style="
                position: fixed; inset: 0; z-index: 9999;
                background: #0d0d0d; display: flex;
                flex-direction: column; align-items: center; justify-content: center;
                transition: opacity 0.8s ease;
            ">
                <div style="
                    width: 80px; height: 80px;
                    border: 6px solid #161616;
                    border-top: 6px solid #ff2d2d;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <h2 style="color: #ffd700; margin-top: 20px; font-size: 1.8rem; letter-spacing: 3px;">
                    HUNGAMA ESPORTS
                </h2>
                <p style="color: #999; font-size: 0.9rem;">Loading...</p>
                <style>
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                </style>
            </div>
        `;
        document.body.appendChild(loader);

        // Hide loader after 2 seconds
        setTimeout(() => {
            const el = document.getElementById('loadingScreen');
            if (el) {
                el.style.opacity = '0';
                setTimeout(() => { el.style.display = 'none'; }, 800);
            }
        }, 2000);
    }
});


// ============================================================
// 2. AUTO IMAGE SLIDER (Hero / Gallery)
// ============================================================
class ImageSlider {
    constructor(containerSelector, images, interval = 4000) {
        this.images = images;
        this.current = 0;
        this.interval = interval;
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        this.init();
    }

    init() {
        // Create slider wrapper
        this.sliderWrapper = document.createElement('div');
        this.sliderWrapper.style.cssText = `
            position: relative; width: 100%; height: 100%;
            overflow: hidden; border-radius: 15px;
        `;

        // Create slides
        this.slidesContainer = document.createElement('div');
        this.slidesContainer.style.cssText = `
            display: flex; transition: transform 0.6s ease-in-out;
            height: 100%;
        `;

        this.images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.style.cssText = `
                min-width: 100%; height: 100%;
                background: url('${img}') center/cover no-repeat;
                position: relative;
            `;
            // Add overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute; inset: 0;
                background: rgba(13,13,13,0.3);
            `;
            slide.appendChild(overlay);
            this.slidesContainer.appendChild(slide);
        });

        this.sliderWrapper.appendChild(this.slidesContainer);

        // Dots
        this.dotsContainer = document.createElement('div');
        this.dotsContainer.style.cssText = `
            position: absolute; bottom: 15px; left: 50%;
            transform: translateX(-50%);
            display: flex; gap: 10px; z-index: 5;
        `;
        this.images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.style.cssText = `
                width: 12px; height: 12px; border-radius: 50%;
                background: ${i === 0 ? '#ffd700' : 'rgba(255,255,255,0.4)'};
                cursor: pointer; transition: 0.3s;
            `;
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        });
        this.sliderWrapper.appendChild(this.dotsContainer);

        // Clear container and append
        this.container.innerHTML = '';
        this.container.appendChild(this.sliderWrapper);

        // Auto play
        this.startAutoPlay();
    }

    goTo(index) {
        this.current = index;
        const total = this.images.length;
        this.slidesContainer.style.transform = `translateX(-${(100 / total) * index}%)`;
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('span');
        dots.forEach((dot, i) => {
            dot.style.background = i === index ? '#ffd700' : 'rgba(255,255,255,0.4)';
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            const next = (this.current + 1) % this.images.length;
            this.goTo(next);
        }, this.interval);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}


// ============================================================
// 3. HERO ANIMATION (Typing effect)
// ============================================================
class HeroAnimation {
    constructor(element, phrases, speed = 80) {
        this.element = document.querySelector(element);
        if (!this.element) return;
        this.phrases = phrases;
        this.speed = speed;
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const fullText = this.phrases[this.currentPhrase];
        if (this.isDeleting) {
            this.element.textContent = fullText.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = fullText.substring(0, this.currentChar + 1);
            this.currentChar++;
        }

        let delay = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && this.currentChar === fullText.length) {
            delay = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
            delay = 500;
        }

        setTimeout(() => this.type(), delay);
    }
}


// ============================================================
// 4. ANNOUNCEMENT SLIDER
// ============================================================
class AnnouncementSlider {
    constructor(containerId, messages, interval = 5000) {
        this.messages = messages;
        this.current = 0;
        this.interval = interval;
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.init();
    }

    init() {
        this.container.style.cssText = `
            overflow: hidden; position: relative; height: 40px;
        `;
        this.inner = document.createElement('div');
        this.inner.style.cssText = `
            transition: transform 0.5s ease; height: 100%;
            display: flex; flex-direction: column;
        `;
        this.messages.forEach(msg => {
            const p = document.createElement('p');
            p.textContent = msg;
            p.style.cssText = `
                height: 40px; display: flex; align-items: center;
                margin: 0; padding: 0 10px; color: #fff;
                font-weight: 600; font-size: 0.95rem;
            `;
            this.inner.appendChild(p);
        });
        this.container.appendChild(this.inner);
        this.start();
    }

    start() {
        setInterval(() => {
            this.current = (this.current + 1) % this.messages.length;
            this.inner.style.transform = `translateY(-${this.current * 40}px)`;
        }, this.interval);
    }
}


// ============================================================
// 5. SMOOTH SCROLL (with easing)
// ============================================================
function smoothScroll(target, duration = 800) {
    const targetEl = document.querySelector(target);
    if (!targetEl) return;
    const startPos = window.pageYOffset;
    const targetPos = targetEl.getBoundingClientRect().top + startPos;
    const distance = targetPos - startPos;
    let startTime = null;

    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = ease(progress);
        window.scrollTo(0, startPos + distance * easeProgress);
        if (progress < 1) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Attach smooth scroll to all anchor links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target && target !== '#') {
            smoothScroll(target);
        }
    }
});


// ============================================================
// 6. DARK MODE / LIGHT MODE
// ============================================================
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(this.theme);
        this.createToggle();
    }

    createToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'themeToggle';
        toggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
        toggle.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; z-index: 999;
            background: #ff2d2d; color: #fff; border: none;
            width: 50px; height: 50px; border-radius: 50%;
            font-size: 1.5rem; cursor: pointer;
            box-shadow: 0 4px 20px rgba(255,45,45,0.4);
            transition: 0.3s;
        `;
        toggle.addEventListener('mouseenter', () => {
            toggle.style.transform = 'scale(1.1)';
        });
        toggle.addEventListener('mouseleave', () => {
            toggle.style.transform = 'scale(1)';
        });
        toggle.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggle);
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
        document.getElementById('themeToggle').innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
    }

    applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'light') {
            root.style.setProperty('--bg', '#f5f5f5');
            root.style.setProperty('--text', '#0d0d0d');
            root.style.setProperty('--card-bg', '#ffffff');
            root.style.setProperty('--border', '#ddd');
            document.body.style.background = '#f5f5f5';
            document.body.style.color = '#0d0d0d';
        } else {
            root.style.setProperty('--bg', '#0d0d0d');
            root.style.setProperty('--text', '#ffffff');
            root.style.setProperty('--card-bg', '#161616');
            root.style.setProperty('--border', '#333');
            document.body.style.background = '#0d0d0d';
            document.body.style.color = '#ffffff';
        }
    }
}


// ============================================================
// 7. TOURNAMENT SYSTEM
// ============================================================
class TournamentManager {
    constructor() {
        this.tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
        this.slots = {};
        this.registrations = JSON.parse(localStorage.getItem('tournamentRegistrations')) || {};
        this.init();
    }

    init() {
        // Load default tournaments if empty
        if (this.tournaments.length === 0) {
            this.tournaments = [
                {
                    id: 1,
                    name: 'BGMI Livik Clash',
                    map: 'Livik',
                    entryFee: 150,
                    prizePool: 50000,
                    date: '2026-07-10',
                    time: '18:00',
                    maxSlots: 100,
                    registered: 0,
                    status: 'open'
                },
                {
                    id: 2,
                    name: 'Erangel Championship',
                    map: 'Erangel',
                    entryFee: 200,
                    prizePool: 75000,
                    date: '2026-07-15',
                    time: '20:00',
                    maxSlots: 120,
                    registered: 0,
                    status: 'open'
                },
                {
                    id: 3,
                    name: 'Miramar Showdown',
                    map: 'Miramar',
                    entryFee: 100,
                    prizePool: 25000,
                    date: '2026-07-20',
                    time: '16:00',
                    maxSlots: 80,
                    registered: 0,
                    status: 'closed'
                }
            ];
            this.saveTournaments();
        }
        this.renderTournaments();
        this.startMatchTimers();
    }

    saveTournaments() {
        localStorage.setItem('tournaments', JSON.stringify(this.tournaments));
    }

    saveRegistrations() {
        localStorage.setItem('tournamentRegistrations', JSON.stringify(this.registrations));
    }

    renderTournaments(containerId = 'tournamentContainer') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = this.tournaments.map(t => `
            <div class="tournament-card" data-id="${t.id}">
                <div class="map-img" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400');">
                    <span style="background:rgba(0,0,0,0.6);padding:4px 16px;border-radius:20px;color:#ffd700;">${t.map}</span>
                </div>
                <div class="map-name">${t.name}</div>
                <div class="details">
                    <span>💰 ₹${t.entryFee}</span>
                    <span>🏆 ₹${t.prizePool}</span>
                    <span>📅 ${t.date}</span>
                    <span>⏰ ${t.time}</span>
                </div>
                <div style="display:flex;justify-content:space-between;color:#999;font-size:0.9rem;margin:8px 0;">
                    <span>Slots: ${t.registered}/${t.maxSlots}</span>
                    <span style="color:${t.status === 'open' ? '#4caf50' : '#ff2d2d'}">
                        ${t.status === 'open' ? '🟢 Open' : '🔴 Closed'}
                    </span>
                </div>
                <button class="btn btn-primary tournament-register" data-id="${t.id}" 
                        ${t.status === 'closed' || t.registered >= t.maxSlots ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                    ${t.status === 'closed' ? 'Registration Closed' : t.registered >= t.maxSlots ? 'Full' : 'Register Now'}
                </button>
                <div class="match-timer" data-date="${t.date}T${t.time}" style="text-align:center;color:#ffd700;font-weight:700;margin-top:8px;font-size:0.9rem;">
                    Loading timer...
                </div>
            </div>
        `).join('');

        // Attach register events
        container.querySelectorAll('.tournament-register').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                this.registerForTournament(id);
            });
        });

        // Start timers for each card
        container.querySelectorAll('.match-timer').forEach(el => {
            this.updateMatchTimer(el);
        });
    }

    registerForTournament(tournamentId) {
        const tournament = this.tournaments.find(t => t.id === tournamentId);
        if (!tournament) return;
        if (tournament.status === 'closed') {
            this.showNotification('Registration closed for this tournament.', 'error');
            return;
        }
        if (tournament.registered >= tournament.maxSlots) {
            this.showNotification('All slots are full!', 'error');
            return;
        }

        // Check if already registered (using localStorage)
        const userKey = `reg_${tournamentId}`;
        if (localStorage.getItem(userKey)) {
            this.showNotification('You are already registered for this tournament!', 'error');
            return;
        }

        // Simulate registration
        tournament.registered += 1;
        this.saveTournaments();
        localStorage.setItem(userKey, 'true');

        // Store registration details
        if (!this.registrations[tournamentId]) {
            this.registrations[tournamentId] = [];
        }
        this.registrations[tournamentId].push({
            teamName: 'Team ' + Math.floor(Math.random() * 1000),
            playerName: 'Player_' + Math.floor(Math.random() * 1000),
            uid: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            registeredAt: new Date().toISOString()
        });
        this.saveRegistrations();

        this.showNotification(`🎉 Successfully registered for ${tournament.name}!`, 'success');
        this.renderTournaments();
        this.updateRegistrationCounter();
    }

    updateMatchTimer(el) {
        const dateStr = el.dataset.date;
        if (!dateStr) return;
        const target = new Date(dateStr).getTime();

        function formatTime(ms) {
            if (ms <= 0) return '🔥 Match Live!';
            const days = Math.floor(ms / 86400000);
            const hours = Math.floor((ms % 86400000) / 3600000);
            const mins = Math.floor((ms % 3600000) / 60000);
            const secs = Math.floor((ms % 60000) / 1000);
            let str = '';
            if (days) str += days + 'd ';
            str += String(hours).padStart(2, '0') + 'h ';
            str += String(mins).padStart(2, '0') + 'm ';
            str += String(secs).padStart(2, '0') + 's';
            return str;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = target - now;
            el.textContent = diff <= 0 ? '🔥 LIVE NOW!' : `⏳ ${formatTime(diff)}`;
            if (diff <= 0) clearInterval(interval);
        }, 1000);
    }

    startMatchTimers() {
        document.querySelectorAll('.match-timer').forEach(el => this.updateMatchTimer(el));
    }

    updateRegistrationCounter() {
        const counter = document.getElementById('registrationCounter');
        if (counter) {
            const total = this.tournaments.reduce((sum, t) => sum + t.registered, 0);
            counter.textContent = total;
        }
    }

    // Admin functions
    addTournament(data) {
        const id = Date.now();
        const newTournament = {
            id,
            ...data,
            registered: 0,
            status: data.status || 'open'
        };
        this.tournaments.push(newTournament);
        this.saveTournaments();
        this.renderTournaments();
        this.showNotification('Tournament added successfully!', 'success');
        return newTournament;
    }

    editTournament(id, data) {
        const index = this.tournaments.findIndex(t => t.id === id);
        if (index === -1)

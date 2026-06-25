/* ================================================================
   HUNGAMA ESPORT - JAVASCRIPT
   Gaming Tournament Website - Blood Red & Black Theme
   ================================================================ */

// ================================================================
// 1. MOBILE MENU TOGGLE
// ================================================================
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// ================================================================
// 2. MODAL / POPUP FUNCTIONS
// ================================================================
function openModal() {
    const modal = document.getElementById('signinModal');
    if (modal) {
        modal.classList.add('active');
        // Clear previous errors
        const emailInput = document.getElementById('loginEmail');
        const passInput = document.getElementById('loginPassword');
        if (emailInput) emailInput.style.borderColor = '';
        if (passInput) passInput.style.borderColor = '';
    }
}

function closeModal() {
    const modal = document.getElementById('signinModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('signinModal');
    if (modal && modal.classList.contains('active')) {
        if (e.target === modal) {
            closeModal();
        }
    }
});

// ================================================================
// 3. TOAST NOTIFICATION
// ================================================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Clear previous timeout
        if (window.toastTimeout) {
            clearTimeout(window.toastTimeout);
        }
        
        // Auto hide after 3 seconds
        window.toastTimeout = setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    } else {
        // Fallback if toast elements not found
        alert(message);
    }
}

// ================================================================
// 4. SIGN IN HANDLER
// ================================================================
function handleSignIn() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    
    // Check if elements exist
    if (!email || !password) {
        showToast('⚠️ Form error - please refresh the page');
        return;
    }
    
    const emailVal = email.value.trim();
    const passVal = password.value.trim();
    
    // Validation
    if (!emailVal || !passVal) {
        showToast('⚠️ Please enter both email and password');
        // Highlight empty fields
        if (!emailVal) email.style.borderColor = '#cc0000';
        if (!passVal) password.style.borderColor = '#cc0000';
        return;
    }
    
    // Email validation
    if (!emailVal.includes('@') || !emailVal.includes('.')) {
        showToast('⚠️ Please enter a valid email (example@domain.com)');
        email.style.borderColor = '#cc0000';
        return;
    }
    
    // Password length validation
    if (passVal.length < 4) {
        showToast('⚠️ Password must be at least 4 characters');
        password.style.borderColor = '#cc0000';
        return;
    }
    
    // SUCCESS - Login successful
    const userName = emailVal.split('@')[0];
    showToast('✅ Welcome back, ' + userName + '! 🎮');
    
    // Close modal
    closeModal();
    
    // Clear form fields
    email.value = '';
    password.value = '';
    email.style.borderColor = '';
    password.style.borderColor = '';
}

// ================================================================
// 5. NEWSLETTER HANDLER
// ================================================================
function handleNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showToast('⚠️ Please enter your email address');
        emailInput.style.borderColor = '#cc0000';
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showToast('⚠️ Please enter a valid email');
        emailInput.style.borderColor = '#cc0000';
        return;
    }
    
    // Success
    showToast('✅ Subscribed! You\'ll get tournament updates! 📧');
    emailInput.value = '';
    emailInput.style.borderColor = '';
}

// ================================================================
// 6. KEYBOARD SHORTCUTS
// ================================================================
document.addEventListener('keydown', function(e) {
    // ESC key - Close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // ENTER key - Submit sign in form if modal is open
    if (e.key === 'Enter') {
        const modal = document.getElementById('signinModal');
        if (modal && modal.classList.contains('active')) {
            e.preventDefault();
            handleSignIn();
        }
    }
});

// ================================================================
// 7. MOBILE MENU - Close on link click
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const menu = document.getElementById('navMenu');
            if (menu) {
                menu.classList.remove('open');
            }
        });
    });
});

// ================================================================
// 8. LIVE PLAYER COUNTER (Animated)
// ================================================================
function animateCounter() {
    const counterElement = document.getElementById('livePlayers');
    if (!counterElement) return;
    
    // Start from 1,500 and go up to 1,847
    let current = 1500;
    const target = 1847;
    const increment = 1;
    const interval = 20; // milliseconds
    
    const intervalId = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(intervalId);
        }
        counterElement.textContent = current.toLocaleString();
    }, interval);
}

// ================================================================
// 9. TOURNAMENT CARD - Progress Bar Animation
// ================================================================
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(function(bar) {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(function() {
            bar.style.width = width;
        }, 300);
    });
}

// ================================================================
// 10. PAGE LOAD - Initialize Everything
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome toast after 1 second
    setTimeout(function() {
        showToast('🎮 Welcome to HungamaEsport! Click anything!');
    }, 800);
    
    // Start live player counter
    animateCounter();
    
    // Animate progress bars after a delay
    setTimeout(function() {
        animateProgressBars();
    }, 500);
    
    // Add click handlers to all tournament cards
    const tournamentCards = document.querySelectorAll('.tournament-card');
    tournamentCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3');
            if (title) {
                showToast('🏆 ' + title.textContent + ' - Click Join to participate!');
            }
        });
    });
    
    // Add click handlers to leaderboard items
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    leaderboardItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const name = this.querySelector('.player-name');
            const score = this.querySelector('.player-score');
            if (name && score) {
                showToast('👤 ' + name.textContent.trim() + ' - ' + score.textContent.trim());
            }
        });
    });
    
    // Add click handlers to all footer links
    const footerLinks = document.querySelectorAll('.footer-col a');
    footerLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            if (text) {
                showToast('📌 ' + text + ' - Coming soon!');
            }
        });
    });
});

// ================================================================
// 11. INPUT FIELD VALIDATION - Real-time feedback
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value.trim() && this.value.includes('@')) {
                this.style.borderColor = '#00cc66'; // Green for valid
            } else if (this.value.trim()) {
                this.style.borderColor = '#cc0000'; // Red for invalid
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    if (passInput) {
        passInput.addEventListener('input', function() {
            if (this.value.trim().length >= 4) {
                this.style.borderColor = '#00cc66';
            } else if (this.value.trim()) {
                this.style.borderColor = '#cc0000';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});

// ================================================================
// 12. CONSOLE WELCOME (For developers)
// ================================================================
console.log('%c🔥 HungamaEsport', 'font-size: 30px; color: #cc0000; font-weight: bold;');
console.log('%cBlood, Sweat & Victory!', 'font-size: 16px; color: #f0e6e6;');
console.log('%c🚀 Website is ready!', 'font-size: 14px; color: #b0a8a8;');

// ================================================================
// 13. ERROR HANDLING - Catch any uncaught errors
// ================================================================
window.addEventListener('error', function(e) {
    console.error('⚠️ Error caught:', e.message);
    // Don't show to user - silently handle
});

// ================================================================
// 14. BROWSER DETECTION (Optional)
// ================================================================
function isMobile() {
    return window.innerWidth <= 850;
}

window.addEventListener('resize', function() {
    // If resizing from mobile to desktop, close mobile menu
    if (!isMobile()) {
        const menu = document.getElementById('navMenu');
        if (menu) {
            menu.classList.remove('open');
        }
    }
});

// ================================================================
// 15. PREVENT DEFAULT FOR ALL LINKS (Until pages are ready)
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    const allLinks = document.querySelectorAll('a[href="#"]');
    allLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

console.log('%c✅ JavaScript Loaded Successfully!', 'color: #00cc66; font-size: 14px;');

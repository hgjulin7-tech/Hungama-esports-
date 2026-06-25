/ ============================================================
// 🏆 TOURNAMENT MANAGER – COMPLETE CLASS
// ============================================================
class TournamentManager {
constructor() {
// LocalStorage se data load karo
this.tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
this.registrations = JSON.parse(localStorage.getItem('tournamentRegistrations')) || {};
this.init();
}

// ---------- INIT ----------  
init() {  
    // Default tournaments load karo agar koi nahi hai  
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
                status: 'open',  
                roomId: 'ROOM-001'  
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
                status: 'open',  
                roomId: 'ROOM-002'  
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
                status: 'closed',  
                roomId: 'ROOM-003'  
            }  
        ];  
        this.saveTournaments();  
    }  
    this.renderTournaments();  
    this.startMatchTimers();  
    this.updateRegistrationCounter();  
}  

// ---------- SAVE / LOAD ----------  
saveTournaments() {  
    localStorage.setItem('tournaments', JSON.stringify(this.tournaments));  
}  

saveRegistrations() {  
    localStorage.setItem('tournamentRegistrations', JSON.stringify(this.registrations));  
}  

// ---------- RENDER TOURNAMENTS ----------  
renderTournaments(containerId = 'tournamentContainer') {  
    const container = document.getElementById(containerId);  
    if (!container) return;  

    if (this.tournaments.length === 0) {  
        container.innerHTML = `<p style="color:#999;text-align:center;padding:2rem;">No tournaments available.</p>`;  
        return;  
    }  

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
            ${t.roomId ? `<div style="color:#ffd700;font-size:0.8rem;">🆔 Room: ${t.roomId}</div>` : ''}  
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

    // Start timers  
    container.querySelectorAll('.match-timer').forEach(el => {  
        this.updateMatchTimer(el);  
    });  
}  

// ---------- MATCH TIMER ----------  
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

// ---------- REGISTER FOR TOURNAMENT ----------  
registerForTournament(tournamentId) {  
    const tournament = this.tournaments.find(t => t.id === tournamentId);  
    if (!tournament) {  
        this.showNotification('Tournament not found!', 'error');  
        return;  
    }  
    if (tournament.status === 'closed') {  
        this.showNotification('Registration closed for this tournament.', 'error');  
        return;  
    }  
    if (tournament.registered >= tournament.maxSlots) {  
        this.showNotification('All slots are full!', 'error');  
        return;  
    }  

    // Check duplicate registration  
    const userKey = `reg_${tournamentId}`;  
    if (localStorage.getItem(userKey)) {  
        this.showNotification('You are already registered for this tournament!', 'error');  
        return;  
    }  

    // Register  
    tournament.registered += 1;  
    this.saveTournaments();  
    localStorage.setItem(userKey, 'true');  

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

    // Trigger confetti  
    if (typeof triggerConfetti === 'function') {  
        triggerConfetti();  
    }  
}  

// ---------- UPDATE REGISTRATION COUNTER ----------  
updateRegistrationCounter() {  
    const counter = document.getElementById('registrationCounter');  
    if (counter) {  
        const total = this.tournaments.reduce((sum, t) => sum + t.registered, 0);  
        counter.textContent = total;  
    }  
}  

// ============================================================  
// ⭐ ADMIN METHODS – COMPLETE  
// ============================================================  

// ---------- ADD TOURNAMENT ----------  
addTournament(data) {  
    const id = Date.now();  
    const newTournament = {  
        id,  
        ...data,  
        registered: 0,  
        status: data.status || 'open',  
        roomId: data.roomId || `ROOM-${String(id).slice(-6)}`  
    };  
    this.tournaments.push(newTournament);  
    this.saveTournaments();  
    this.renderTournaments();  
    this.showNotification('🏆 Tournament added successfully!', 'success');  
    return newTournament;  
}  

// ---------- EDIT TOURNAMENT (FULLY WORKING) ----------  
editTournament(id, data) {  
    // 1. Tournament ka index find karo  
    const index = this.tournaments.findIndex(t => t.id === id);  
      
    // 2. Agar nahi mila toh error  
    if (index === -1) {  
        this.showNotification('Tournament not found!', 'error');  
        return null;  
    }  

    // 3. Existing tournament ko naye data ke saath merge karo  
    //    ID change mat hone do  
    this.tournaments[index] = {  
        ...this.tournaments[index],   // Purana data  
        ...data,                       // Naya data  
        id: this.tournaments[index].id // ID fixed rakho  
    };  

    // 4. LocalStorage mein save  
    this.saveTournaments();  

    // 5. UI refresh  
    this.renderTournaments();  

    // 6. Success notification  
    this.showNotification('✅ Tournament updated successfully!', 'success');  

    // 7. Updated tournament return  
    return this.tournaments[index];  
}  

// ---------- DELETE TOURNAMENT ----------  
deleteTournament(id) {  
    const index = this.tournaments.findIndex(t => t.id === id);  
    if (index === -1) {  
        this.showNotification('Tournament not found!', 'error');  
        return false;  
    }  
    // Confirm delete  
    if (!confirm(`Are you sure you want to delete "${this.tournaments[index].name}"?`)) {  
        return false;  
    }  
    this.tournaments.splice(index, 1);  
    this.saveTournaments();  
    this.renderTournaments();  
    this.showNotification('🗑️ Tournament deleted.', 'info');  
    return true;  
}  

// ---------- UPDATE PRIZE POOL ----------  
updatePrizePool(id, newAmount) {  
    const tour = this.tournaments.find(t => t.id === id);  
    if (!tour) {  
        this.showNotification('Tournament not found!', 'error');  
        return false;  
    }  
    if (typeof newAmount !== 'number' || newAmount < 0) {  
        this.showNotification('Please enter a valid prize amount.', 'error');  
        return false;  
    }  
    tour.prizePool = newAmount;  
    this.saveTournaments();  
    this.renderTournaments();  
    this.showNotification('💰 Prize pool updated to ₹' + newAmount.toLocaleString(), 'success');  
    return tour;  
}  

// ---------- UPDATE ROOM ID ----------  
updateRoomId(id, roomId) {  
    const tour = this.tournaments.find(t => t.id === id);  
    if (!tour) {  
        this.showNotification('Tournament not found!', 'error');  
        return false;  
    }  
    if (!roomId || roomId.trim() === '') {  
        this.showNotification('Please enter a valid Room ID.', 'error');  
        return false;  
    }  
    tour.roomId = roomId.trim();  
    this.saveTournaments();  
    this.renderTournaments();  
    this.showNotification('🆔 Room ID updated: ' + tour.roomId, 'success');  
    return tour;  
}  

// ---------- GET REGISTRATIONS ----------  
getRegistrations(tournamentId) {  
    return this.registrations[tournamentId] || [];  
}  

getAllRegistrations() {  
    return this.registrations;  
}  

// ---------- ADD WINNER ----------  
addWinner(tournamentId, winnerTeam) {  
    const tour = this.tournaments.find(t => t.id === tournamentId);  
    if (!tour) {  
        this.showNotification('Tournament not found!', 'error');  
        return false;  
    }  
    tour.winner = winnerTeam;  
    tour.status = 'completed';  
    this.saveTournaments();  
    this.renderTournaments();  
    this.showNotification(`🏆 Winner: ${winnerTeam} declared for ${tour.name}!`, 'success');  
    if (typeof triggerConfetti === 'function') {  
        triggerConfetti();  
    }  
    return tour;  
}  

// ---------- UPDATE TOURNAMENT STATUS ----------  
updateStatus(id, newStatus) {  
    const tour = this.tournaments.find(t => t.id === id);  
    if (!tour) {  
        this.showNotification('Tournament not found!', 'error');  
        return false;  
    }  
    const validStatuses = ['open', 'closed', 'completed'];  
    if (!validStatuses.includes(newStatus)) {  
        this.showNotification('Invalid status. Use: open, closed, completed', 'error');  
        return false;  
    }  
    tour.status = newStatus;  
    this.saveTournaments();  
    this.renderTournaments();  
    this.showNotification(`Status updated to: ${newStatus}`, 'info');  
    return tour;  
}  

// ---------- VIEW REGISTRATIONS (HTML) ----------  
viewRegistrationsHTML(containerId = 'registrationsList') {  
    const container = document.getElementById(containerId);  
    if (!container) return;  

    let html = '<h4 style="color:#ffd700;margin-bottom:1rem;">📋 All Registrations</h4>';  
    let total = 0;  

    for (const [tourId, regs] of Object.entries(this.registrations)) {  
        const tour = this.tournaments.find(t => t.id === parseInt(tourId));  
        if (regs && regs.length > 0) {  
            html += `<div style="margin-bottom:1rem;background:#0d0d0d;padding:12px;border-radius:10px;border-left:3px solid #ff2d2d;">  
                <strong style="color:#ffd700;">${tour ? tour.name : 'Unknown'}</strong>  
                <span style="color:#999;"> (${regs.length} teams)</span>  
                <ul style="list-style:none;padding:0;margin-top:6px;">  
            `;  
            regs.forEach(r => {  
                html += `<li style="background:#161616;padding:6px 12px;border-radius:6px;margin:4px 0;display:flex;justify-content:space-between;flex-wrap:wrap;color:#eee;font-size:0.9rem;">  
                    <span>${r.teamName}</span>  
                    <span style="color:#999;">${r.playerName} · ${r.uid}</span>  
                </li>`;  
                total++;  
            });  
            html += `</ul></div>`;  
        }  
    }  

    if (total === 0) {  
        html += '<p style="color:#999;">No registrations yet.</p>';  
    } else {  
        html += `<p style="color:#ffd700;font-weight:700;">Total: ${total} teams registered</p>`;  
    }  

    container.innerHTML = html;  
    container.style.display = 'block';  
}  

// ---------- EXPORT CSV ----------  
exportRegistrationsCSV() {  
    let csv = 'Tournament,Team,Player,UID,Registered At\n';  
    for (const [tourId, regs] of Object.entries(this.registrations)) {  
        const tour = this.tournaments.find(t => t.id === parseInt(tourId));  
        const tourName = tour ? tour.name : 'Unknown';  
        regs.forEach(r => {  
            csv += `"${tourName}","${r.teamName}","${r.playerName}","${r.uid}","${r.registeredAt}"\n`;  
        });  
    }  

    const blob = new Blob([csv], { type: 'text/csv' });  
    const url = URL.createObjectURL(blob);  
    const link = document.createElement('a');  
    link.href = url;  
    link.download = `registrations-${Date.now()}.csv`;  
    document.body.appendChild(link);  
    link.click();  
    link.remove();  
    URL.revokeObjectURL(url);  
    this.showNotification('📥 CSV exported successfully!', 'success');  
}  

// ---------- NOTIFICATION HELPER ----------  
showNotification(msg, type = 'info') {  
    // Use global notification if available  
    if (typeof window.showNotification === 'function') {  
        window.showNotification(msg, type);  
    } else {  
        console.log(`[${type}] ${msg}`);  
        alert(msg);  
    }  
}

}

// ============================================================
// 🚀 INITIALIZE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
window.tournamentManager = new TournamentManager();
console.log('🏆 Tournament Manager initialized!');
});

// ============================================================
// 🔐 ADMIN PANEL
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

const adminBtn = document.getElementById("adminToggle");  
const adminPanel = document.getElementById("adminPanel");  
const viewBtn = document.getElementById("viewRegistrations");  

if (adminBtn) {  
    adminBtn.addEventListener("click", function () {  

        const password = prompt("Enter Admin Password");  

        if (password === "Hungama123") {  

            if (adminPanel.style.display === "none" || adminPanel.style.display === "") {  
                adminPanel.style.display = "block";  
            } else {  
                adminPanel.style.display = "none";  
            }  

        } else {  
            alert("❌ Wrong Password");  
        }  

    });  
}  

if (viewBtn) {  
    viewBtn.addEventListener("click", function () {  

        if (window.tournamentManager) {  
            window.tournamentManager.viewRegistrationsHTML("registrationsList");  
        }  

    });  
}

})


const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");

adminBtn.addEventListener("click", () => {
    if (adminPanel.style.display === "none") {
        adminPanel.style.display = "block";
    } else {
        adminPanel.style.display = "none";
    }
});

const password = prompt("Enter Admin Password");

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");

adminBtn.addEventListener("click", () => {
    const password = prompt("Enter Admin Password");

    if (password === "Hungama123") {
        if (adminPanel.style.display === "none") {
            adminPanel.style.display = "block";
        } else {
            adminPanel.style.display = "none";
        }
    } else {
        alert("❌ Wrong Password");
    }
});

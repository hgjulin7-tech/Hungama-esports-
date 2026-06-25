// ================================
// HUNGAMA ESPORTS - SCRIPT.JS
// PART 1
// ================================

// Show / Hide Player Fields
function showPlayers() {

    const type = document.getElementById("tournamentType").value;

    const duo = document.getElementById("duoFields");
    const squad = document.getElementById("squadFields");

    duo.style.display = "none";
    squad.style.display = "none";

    if (type === "duo") {
        duo.style.display = "block";
    }

    if (type === "squad") {
        duo.style.display = "block";
        squad.style.display = "block";
    }
}

// Registration Form
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const agree = document.getElementById("agree");

        if (agree && !agree.checked) {
            alert("Please agree to the tournament rules.");
            return;
        }

        alert("🎉 Registration Submitted Successfully!");

        form.reset();

        document.getElementById("duoFields").style.display = "none";
        document.getElementById("squadFields").style.display = "none";

    });

});
// ================================
// HUNGAMA ESPORTS - SCRIPT.JS
// PART 2
// Countdown Timer, Smooth Scroll,
// Live Date & Time, Tournament Status,
// Better Animations
// ================================

// -------- Countdown Timer --------
// HTML me ek element hona chahiye:
// <span id="countdown"></span>

const tournamentDate = new Date("2026-06-30T18:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = tournamentDate - now;

    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    if (distance <= 0) {
        countdown.innerHTML = "🔴 Tournament Started!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// -------- Live Date & Time --------
// HTML:
// <span id="liveTime"></span>

function updateLiveTime() {

    const liveTime = document.getElementById("liveTime");

    if (!liveTime) return;

    const now = new Date();

    liveTime.innerHTML = now.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium"
    });
}

setInterval(updateLiveTime, 1000);
updateLiveTime();

// -------- Tournament Status --------
// HTML:
// <span id="status"></span>

function updateStatus() {

    const status = document.getElementById("status");

    if (!status) return;

    const now = new Date().getTime();

    if (now < tournamentDate) {
        status.innerHTML = "🟢 Registration Open";
        status.style.color = "lime";
    } else {
        status.innerHTML = "🔴 Tournament Live";
        status.style.color = "red";
    }
}

updateStatus();
setInterval(updateStatus, 60000);

// -------- Smooth Scrolling --------

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

// -------- Card Hover Animation --------

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
        card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });

});

// -------- Button Click Animation --------

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.96)";

        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 150);

    });

});

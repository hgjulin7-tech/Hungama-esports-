// ==========================
// HUNGAMA ESPORTS SCRIPT
// ==========================

// Register Button
function register() {
    window.location.href = "register.html";
}

// Show Duo / Squad Fields
function showFields() {

    let type = document.getElementById("type").value;

    let duo = document.getElementById("duoFields");
    let squad = document.getElementById("squadFields");

    // Hide all fields
    duo.style.display = "none";
    squad.style.display = "none";

    // Show Duo Fields
    if (type === "duo") {
        duo.style.display = "block";
    }

    // Show Squad Fields
    if (type === "squad") {
        squad.style.display = "block";
    }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

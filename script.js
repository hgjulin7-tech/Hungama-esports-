// Show / Hide Player Fields
function showPlayers() {
    let type = document.getElementById("tournamentType").value;

    let duo = document.getElementById("duoFields");
    let squad = document.getElementById("squadFields");

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

// Registration Submit
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!document.getElementById("agree").checked) {
        alert("Please agree to Tournament Rules.");
        return;
    }

    alert("Registration Submitted Successfully!");

    this.reset();

    document.getElementById("duoFields").style.display = "none";
    document.getElementById("squadFields").style.display = "none";
});

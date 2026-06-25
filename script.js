document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // DUO / SQUAD FIELD TOGGLE
    // ==============================
    function showFields(type) {
        let duo = document.getElementById("duo");
        let squad = document.getElementById("squad");

        // Hide both first
        if (duo) duo.style.display = "none";
        if (squad) squad.style.display = "none";

        // Show selected
        if (type === "duo" && duo) {
            duo.style.display = "block";
        }

        if (type === "squad" && squad) {
            squad.style.display = "block";
        }
    }

    // Make function global (important)
    window.showFields = showFields;


    // ==============================
    // SMOOTH SCROLL
    // ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // ==============================
    // FORM SUBMIT VALIDATION
    // ==============================
    const form = document.getElementById("registrationForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const checkbox = document.getElementById("rules");

            // Checkbox validation
            if (!checkbox || !checkbox.checked) {
                alert("❌ Please agree to tournament rules first!");
                return;
            }

            // Optional: basic empty check (safe)
            const inputs = form.querySelectorAll("input[required]");
            for (let input of inputs) {
                if (input.value.trim() === "") {
                    alert("❌ Please fill all required fields!");
                    input.focus();
                    return;
                }
            }

            // Success message
            alert("✅ Registration Submitted Successfully!");

            // Optional reset
            form.reset();
        });
    }

});

// ============================================================
//  HUNGAMA ESPORTS – Complete Button Functionality
//  (Map Tabs, Registration, File Previews, QR Code)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------- 1. QR CODE (no UPI – generic link) ----------
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer && typeof QRCode !== 'undefined') {
        // Replace this URL with your own payment link or static image
        const qrData = 'https://hungamaesports.in';
        new QRCode(qrContainer, {
            text: qrData,
            width: 110,
            height: 110,
            colorDark: '#8a0303',
            colorLight: '#0a0000',
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        console.warn('QRCode library not loaded or container missing');
    }

    // ---------- 2. MAP TABS ----------
    const tabs = document.querySelectorAll('.map-tab');
    const panels = document.querySelectorAll('.form-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');

            // Show corresponding form panel
            const map = this.dataset.map;
            panels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.querySelector(`.form-panel[data-map="${map}"]`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // ---------- 3. POSTER UPLOAD (header) ----------
    const posterInput = document.getElementById('posterInput');
    const posterPreview = document.getElementById('posterPreview');

    if (posterInput && posterPreview) {
        posterInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) {
                posterPreview.style.display = 'none';
                return;
            }
            const reader = new FileReader();
            reader.onload = function(ev) {
                posterPreview.src = ev.target.result;
                posterPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });
    }

    // ---------- 4. TEAM PHOTO PREVIEW (inside forms) ----------
    document.querySelectorAll('.file-input-wrapper input[type="file"]').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) {
                const preview = this.parentElement.querySelector('.team-preview');
                if (preview) { preview.style.display = 'none';
                    preview.src = ''; }
                return;
            }
            const reader = new FileReader();
            const preview = this.parentElement.querySelector('.team-preview');
            reader.onload = function(ev) {
                preview.src = ev.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });
    });

    // ---------- 5. REGISTRATION FORM SUBMIT ----------
    const forms = document.querySelectorAll('.reg-form');
    const regList = document.getElementById('registrationList');
    const newRegPlaceholder = document.getElementById('newRegPlaceholder');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get map name from data attribute
            const mapName = this.dataset.map || 'unknown';

            // Get player name
            const nameInput = this.querySelector('input[placeholder*="Player Name"]');
            const playerName = nameInput ? nameInput.value.trim() : 'Anonymous';

            // Get selected roles
            const roleChecks = this.querySelectorAll('.role-group input[type="checkbox"]:checked');
            const roles = Array.from(roleChecks).map(cb => cb.value).join(' · ') || 'No role';

            // Show placeholder message
            if (newRegPlaceholder) {
                newRegPlaceholder.style.display = 'block';
                newRegPlaceholder.textContent = `✅ ${playerName} registered for ${mapName.toUpperCase()} · ${roles}`;
                newRegPlaceholder.style.color = '#cc3333';
                newRegPlaceholder.style.fontWeight = '600';
            }

            // Create new list item
            if (regList) {
                const newItem = document.createElement('div');
                newItem.className = 'reg-item';
                newItem.style.borderColor = 'var(--blood)';
                newItem.innerHTML = `
                    <span class="name">${playerName || 'Player'}</span>
                    <span class="map-tag">${mapName}</span>
                    <span class="role-tag">${roles}</span>
                    <span style="color:var(--text-muted);font-size:0.75rem;">✅ just now</span>
                `;
                // Insert before the placeholder (if exists) or at the beginning
                if (newRegPlaceholder) {
                    regList.insertBefore(newItem, newRegPlaceholder);
                } else {
                    regList.prepend(newItem);
                }
            }

            // Reset form (clear inputs and hide team preview)
            this.reset();
            this.querySelectorAll('.team-preview').forEach(img => {
                img.style.display = 'none';
                img.src = '';
            });

            // Scroll to registration list
            if (regList) {
                regList.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Hide placeholder after 4 seconds
            if (newRegPlaceholder) {
                setTimeout(() => {
                    newRegPlaceholder.style.display = 'none';
                }, 4000);
            }

            // Optional alert
            alert(`✅ Registration submitted for ${mapName.toUpperCase()}!\nPlayer: ${playerName || 'Unnamed'}\nRole: ${roles}`);
        });
    });

    // ---------- 6. (Optional) Trigger poster upload button ----------
    const posterBtn = document.querySelector('.poster-upload-btn');
    if (posterBtn && posterInput) {
        posterBtn.addEventListener('click', function() {
            posterInput.click();
        });
    }

    console.log('✅ Hungama Esports – All buttons are now active!');
});

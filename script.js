<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cricket Match Manager</title>
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <style>
    /* ----- CSS Variables (Light/Dark) ----- */
    :root {
      --bg: #f0f4f8;
      --surface: #ffffff;
      --surface2: #f8fafc;
      --text: #1e293b;
      --text2: #475569;
      --border: #d1d9e6;
      --shadow: 0 8px 24px rgba(0,0,0,0.08);
      --radius: 16px;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --green: #16a34a;
      --red: #dc2626;
      --gold: #eab308;
      --transition: 0.3s ease;
    }

    [data-theme="dark"] {
      --bg: #0f172a;
      --surface: #1e293b;
      --surface2: #2d3a4f;
      --text: #f1f5f9;
      --text2: #94a3b8;
      --border: #334155;
      --shadow: 0 8px 24px rgba(0,0,0,0.5);
      --primary: #3b82f6;
      --primary-hover: #60a5fa;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      transition: background var(--transition), color var(--transition);
      min-height: 100vh;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .app {
      max-width: 1100px;
      width: 100%;
      margin: 0 auto;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 28px;
      background: var(--surface);
      padding: 18px 28px;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      transition: background var(--transition), box-shadow var(--transition);
    }

    .header h1 {
      font-size: 1.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header h1 i { color: var(--primary); }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .auth-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--surface2);
      padding: 6px 16px 6px 12px;
      border-radius: 40px;
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid var(--border);
      transition: background var(--transition), border var(--transition);
    }
    .auth-badge i { color: var(--green); }

    .btn {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 10px 22px;
      border-radius: 40px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background var(--transition), transform 0.15s, box-shadow var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 10px rgba(37,99,235,0.25);
    }
    .btn:hover { background: var(--primary-hover); transform: translateY(-2px); }
    .btn:active { transform: scale(0.96); }
    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 2px solid var(--border);
      box-shadow: none;
    }
    .btn-outline:hover { background: var(--surface2); border-color: var(--primary); }
    .btn-danger { background: var(--red); box-shadow: 0 4px 10px rgba(220,38,38,0.25); }
    .btn-danger:hover { background: #b91c1c; }
    .btn-success { background: var(--green); box-shadow: 0 4px 10px rgba(22,163,74,0.25); }
    .btn-success:hover { background: #15803d; }
    .btn-warning { background: var(--gold); color: #1e293b; box-shadow: 0 4px 10px rgba(234,179,8,0.25); }
    .btn-warning:hover { background: #ca8a04; }

    /* Cards */
    .card {
      background: var(--surface);
      border-radius: var(--radius);
      padding: 24px;
      box-shadow: var(--shadow);
      transition: background var(--transition), box-shadow var(--transition);
      margin-bottom: 24px;
    }
    .card-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Grid */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }

    /* Form */
    .form-group {
      margin-bottom: 16px;
    }
    .form-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--text2);
    }
    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--border);
      border-radius: 12px;
      background: var(--surface2);
      color: var(--text);
      font-size: 1rem;
      transition: border var(--transition), background var(--transition);
    }
    .form-group input:focus {
      outline: none;
      border-color: var(--primary);
    }
    .form-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .form-row .form-group { flex: 1; min-width: 120px; }

    /* Timer display */
    .timer-display {
      font-size: 3.2rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      text-align: center;
      padding: 12px 0;
      background: var(--surface2);
      border-radius: 12px;
      border: 2px solid var(--border);
      margin: 12px 0;
      letter-spacing: 4px;
    }
    .timer-controls {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Leaderboard */
    .leaderboard-list {
      list-style: none;
      padding: 0;
    }
    .leaderboard-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--surface2);
      border-radius: 10px;
      margin-bottom: 8px;
      border-left: 4px solid var(--primary);
      transition: background var(--transition);
    }
    .leaderboard-list li .rank {
      font-weight: 700;
      color: var(--text2);
      margin-right: 12px;
    }
    .leaderboard-list li .team-name { font-weight: 600; flex: 1; }
    .leaderboard-list li .score {
      background: var(--primary);
      color: white;
      padding: 4px 14px;
      border-radius: 40px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    /* Popup / Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-box {
      background: var(--surface);
      max-width: 420px;
      width: 90%;
      padding: 30px 28px;
      border-radius: var(--radius);
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
      animation: fadeScale 0.25s ease;
    }
    @keyframes fadeScale {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    .modal-box h3 { font-size: 1.4rem; margin-bottom: 12px; }
    .modal-box p { margin-bottom: 20px; color: var(--text2); }
    .modal-box .btn { margin: 4px; }

    /* Misc */
    .flex-center { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .mt-8 { margin-top: 8px; }
    .text-muted { color: var(--text2); }
    .badge { background: var(--gold); padding: 4px 14px; border-radius: 40px; font-weight: 600; font-size: 0.8rem; color: #1e293b; }
  </style>
</head>
<body>
<div class="app">

  <!-- HEADER -->
  <header class="header">
    <h1><i class="fas fa-cricket"></i> Match Manager</h1>
    <div class="header-actions">
      <!-- Auth badge -->
      <div class="auth-badge" id="authBadge">
        <i class="fas fa-user-circle"></i>
        <span id="authStatus">Guest</span>
      </div>
      <!-- Login/Logout button -->
      <button class="btn btn-outline" id="authToggleBtn">
        <i class="fas fa-sign-in-alt"></i> <span id="authBtnText">Login</span>
      </button>
      <!-- Dark mode toggle -->
      <button class="btn btn-outline" id="darkToggleBtn">
        <i class="fas fa-moon"></i> <span id="darkModeLabel">Dark</span>
      </button>
    </div>
  </header>

  <!-- MAIN GRID -->
  <div class="grid-2">

    <!-- LEFT COLUMN: Registration + Timer -->
    <div>

      <!-- Registration Form -->
      <div class="card">
        <div class="card-title"><i class="fas fa-users"></i> Team Registration</div>
        <form id="registrationForm">
          <div class="form-group">
            <label>Team Name</label>
            <input type="text" id="teamNameInput" placeholder="e.g. Super Kings" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Player 1</label>
              <input type="text" id="player1Input" placeholder="Name" required />
            </div>
            <div class="form-group">
              <label>Player 2</label>
              <input type="text" id="player2Input" placeholder="Name" required />
            </div>
            <div class="form-group">
              <label>Player 3</label>
              <input type="text" id="player3Input" placeholder="Name" required />
            </div>
          </div>
          <button type="submit" class="btn btn-success" id="registerBtn">
            <i class="fas fa-save"></i> Register Team
          </button>
          <button type="button" class="btn btn-outline" id="showSavedBtn">
            <i class="fas fa-eye"></i> Show Saved
          </button>
        </form>
        <div id="registrationFeedback" class="mt-8 text-muted" style="font-size:0.9rem;"></div>
      </div>

      <!-- Match Timer -->
      <div class="card">
        <div class="card-title"><i class="fas fa-clock"></i> Match Timer</div>
        <div class="timer-display" id="timerDisplay">00:00</div>
        <div class="timer-controls">
          <button class="btn" id="timerStartBtn"><i class="fas fa-play"></i> Start</button>
          <button class="btn btn-warning" id="timerPauseBtn"><i class="fas fa-pause"></i> Pause</button>
          <button class="btn btn-danger" id="timerResetBtn"><i class="fas fa-redo"></i> Reset</button>
        </div>
        <div class="flex-center mt-8">
          <span class="badge" id="timerStatus">Stopped</span>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN: Leaderboard + Actions -->
    <div>

      <!-- Leaderboard / Winner List -->
      <div class="card">
        <div class="card-title"><i class="fas fa-trophy"></i> Leaderboard</div>
        <ul class="leaderboard-list" id="leaderboardList">
          <li style="justify-content:center; color:var(--text2); padding:20px;">No teams registered yet</li>
        </ul>
        <div class="flex-center" style="margin-top:12px;">
          <button class="btn btn-success" id="declareWinnerBtn"><i class="fas fa-crown"></i> Declare Winner</button>
          <button class="btn btn-outline" id="clearLeaderboardBtn"><i class="fas fa-trash"></i> Clear</button>
        </div>
      </div>

      <!-- Popup trigger demo -->
      <div class="card">
        <div class="card-title"><i class="fas fa-bell"></i> Popup Demo</div>
        <button class="btn" id="popupDemoBtn"><i class="fas fa-message"></i> Show Popup</button>
        <p class="text-muted mt-8" style="font-size:0.85rem;">Click to see a custom popup message.</p>
      </div>

    </div>
  </div>

  <!-- Hidden popup/modal -->
  <div class="modal-overlay" id="popupModal">
    <div class="modal-box">
      <h3 id="popupTitle"><i class="fas fa-info-circle"></i> Message</h3>
      <p id="popupMessage">This is a popup message.</p>
      <button class="btn" id="popupCloseBtn">Close</button>
    </div>
  </div>

</div>

<script>
  // ============================
  //  JAVASCRIPT — all features
  // ============================

  // ----- DOM refs -----
  const teamNameInput = document.getElementById('teamNameInput');
  const player1Input = document.getElementById('player1Input');
  const player2Input = document.getElementById('player2Input');
  const player3Input = document.getElementById('player3Input');
  const registerBtn = document.getElementById('registerBtn');
  const showSavedBtn = document.getElementById('showSavedBtn');
  const registrationFeedback = document.getElementById('registrationFeedback');
  const leaderboardList = document.getElementById('leaderboardList');
  const declareWinnerBtn = document.getElementById('declareWinnerBtn');
  const clearLeaderboardBtn = document.getElementById('clearLeaderboardBtn');
  const popupDemoBtn = document.getElementById('popupDemoBtn');
  const popupModal = document.getElementById('popupModal');
  const popupTitle = document.getElementById('popupTitle');
  const popupMessage = document.getElementById('popupMessage');
  const popupCloseBtn = document.getElementById('popupCloseBtn');

  // Timer
  const timerDisplay = document.getElementById('timerDisplay');
  const timerStartBtn = document.getElementById('timerStartBtn');
  const timerPauseBtn = document.getElementById('timerPauseBtn');
  const timerResetBtn = document.getElementById('timerResetBtn');
  const timerStatus = document.getElementById('timerStatus');

  // Auth
  const authStatus = document.getElementById('authStatus');
  const authToggleBtn = document.getElementById('authToggleBtn');
  const authBtnText = document.getElementById('authBtnText');

  // Dark mode
  const darkToggleBtn = document.getElementById('darkToggleBtn');
  const darkModeLabel = document.getElementById('darkModeLabel');

  // =============================================
  //  1. BUTTON CLICK ACTIONS (demo)
  // =============================================
  // We'll attach event listeners to all buttons.
  // Some actions are handled via forms, but we also show direct button clicks.

  // Example: register button click is handled by form submit, but we also have a direct click listener for demonstration.
  registerBtn.addEventListener('click', (e) => {
    // The form submit will handle saving. But we can also show a message.
    // We'll let the form submit do the work; but we can add a console log.
    console.log('Register button clicked (via form submit)');
  });

  // Show saved teams button click
  showSavedBtn.addEventListener('click', () => {
    const teams = getTeamsFromStorage();
    if (teams.length === 0) {
      showPopup('Info', 'No teams saved yet. Register a team first.');
    } else {
      let msg = 'Saved teams:\n' + teams.map((t, i) => 
        `${i+1}. ${t.teamName} (${t.players.join(', ')})`
      ).join('\n');
      showPopup('Saved Teams', msg);
    }
  });

  // Declare winner button click
  declareWinnerBtn.addEventListener('click', () => {
    const teams = getTeamsFromStorage();
    if (teams.length === 0) {
      showPopup('No Teams', 'Register at least one team to declare a winner.');
      return;
    }
    // Randomly pick a winner for demo
    const randomIndex = Math.floor(Math.random() * teams.length);
    const winner = teams[randomIndex];
    // Update leaderboard with a win
    addWinToLeaderboard(winner.teamName);
    showPopup('🏆 Winner Declared!', `${winner.teamName} is the winner!`);
    renderLeaderboard();
  });

  // Clear leaderboard button
  clearLeaderboardBtn.addEventListener('click', () => {
    if (confirm('Clear all leaderboard entries?')) {
      localStorage.removeItem('leaderboard');
      renderLeaderboard();
      showPopup('Cleared', 'Leaderboard has been cleared.');
    }
  });

  // Popup demo button
  popupDemoBtn.addEventListener('click', () => {
    showPopup('Demo Popup', 'This is a custom popup message triggered by a button click.');
  });

  // Popup close button
  popupCloseBtn.addEventListener('click', () => {
    popupModal.classList.remove('active');
  });
  // Close popup on overlay click
  popupModal.addEventListener('click', (e) => {
    if (e.target === popupModal) popupModal.classList.remove('active');
  });

  // =============================================
  //  2. REGISTRATION FORM SUBMIT
  // =============================================
  document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const teamName = teamNameInput.value.trim();
    const p1 = player1Input.value.trim();
    const p2 = player2Input.value.trim();
    const p3 = player3Input.value.trim();

    if (!teamName || !p1 || !p2 || !p3) {
      registrationFeedback.textContent = '⚠️ Please fill all fields.';
      registrationFeedback.style.color = 'var(--red)';
      return;
    }

    const teamData = {
      teamName,
      players: [p1, p2, p3],
      registeredAt: new Date().toISOString()
    };

    saveTeamToStorage(teamData);
    registrationFeedback.textContent = `✅ Team "${teamName}" registered successfully!`;
    registrationFeedback.style.color = 'var(--green)';

    // Clear inputs optionally
    teamNameInput.value = '';
    player1Input.value = '';
    player2Input.value = '';
    player3Input.value = '';

    // Also update leaderboard list (show all teams)
    renderLeaderboard();

    // Popup confirmation
    showPopup('Registration Successful', `Team "${teamName}" with players: ${p1}, ${p2}, ${p3}`);
  });

  // =============================================
  //  3. TEAM & PLAYER DETAILS SAVE (localStorage)
  // =============================================
  function saveTeamToStorage(team) {
    let teams = getTeamsFromStorage();
    teams.push(team);
    localStorage.setItem('registeredTeams', JSON.stringify(teams));
  }

  function getTeamsFromStorage() {
    const data = localStorage.getItem('registeredTeams');
    return data ? JSON.parse(data) : [];
  }

  // Also save to leaderboard (for win count)
  function getLeaderboard() {
    const data = localStorage.getItem('leaderboard');
    return data ? JSON.parse(data) : {};
  }

  function saveLeaderboard(leaderboard) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }

  function addWinToLeaderboard(teamName) {
    const lb = getLeaderboard();
    lb[teamName] = (lb[teamName] || 0) + 1;
    saveLeaderboard(lb);
  }

  // Render leaderboard list
  function renderLeaderboard() {
    const lb = getLeaderboard();
    const teams = getTeamsFromStorage(); // all registered teams
    const list = leaderboardList;

    if (teams.length === 0 && Object.keys(lb).length === 0) {
      list.innerHTML = `<li style="justify-content:center; color:var(--text2); padding:20px;">No teams registered yet</li>`;
      return;
    }

    // Combine: show all teams with their win count (0 if not present)
    const combined = teams.map(t => ({
      teamName: t.teamName,
      wins: lb[t.teamName] || 0
    }));

    // Sort by wins descending
    combined.sort((a, b) => b.wins - a.wins);

    if (combined.length === 0) {
      list.innerHTML = `<li style="justify-content:center; color:var(--text2); padding:20px;">No teams</li>`;
      return;
    }

    let html = '';
    combined.forEach((item, index) => {
      const rank = index + 1;
      const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
      html += `<li>
        <span class="rank">${medal}</span>
        <span class="team-name">${item.teamName}</span>
        <span class="score">${item.wins} win${item.wins !== 1 ? 's' : ''}</span>
      </li>`;
    });
    list.innerHTML = html;
  }

  // =============================================
  //  4. MATCH TIMER / COUNTDOWN
  // =============================================
  let timerInterval = null;
  let seconds = 0;
  let isRunning = false;

  function updateTimerDisplay() {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  }

 

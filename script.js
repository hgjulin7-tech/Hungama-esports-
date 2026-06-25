<script>
  // ===== MOBILE MENU TOGGLE =====
  function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('open');
  }

  // ===== MODAL / POPUP =====
  function openModal() {
    document.getElementById('signinModal').classList.add('active');
  }

  function closeModal() {
    document.getElementById('signinModal').classList.remove('active');
  }

  // Click outside modal to close
  document.getElementById('signinModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // ===== TOAST NOTIFICATION =====
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    // 3 second baad hide
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // ===== SIGN IN HANDLER =====
  function handleSignIn() {
    // IDs sahi se le rahe hain
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    
    // Agar input field exist nahi karte toh error handle karo
    if (!email || !password) {
      showToast('⚠️ Form load nahi hua, refresh karo');
      return;
    }

    const emailValue = email.value.trim();
    const passValue = password.value.trim();

    // Validation
    if (!emailValue || !passValue) {
      showToast('⚠️ Please enter email and password');
      return;
    }

    if (!emailValue.includes('@') || !emailValue.includes('.')) {
      showToast('⚠️ Please enter a valid email (example@domain.com)');
      return;
    }

    if (passValue.length < 4) {
      showToast('⚠️ Password must be at least 4 characters');
      return;
    }

    // Sab sahi hai - login success
    closeModal();
    const userName = emailValue.split('@')[0];
    showToast('✅ Welcome back, ' + userName + '! 🎮');

    // Form clear karo
    email.value = '';
    password.value = '';
  }

  // ===== ENTER KEY SUPPORT =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const modal = document.getElementById('signinModal');
      if (modal.classList.contains('active')) {
        handleSignIn();
      }
    }
  });

  // ===== MENU CLOSE ON LINK CLICK (Mobile) =====
  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', function() {
      document.getElementById('navMenu').classList.remove('open');
    });
  });

  // ===== WELCOME TOAST ON LOAD =====
  window.addEventListener('load', function() {
    setTimeout(() => {
      showToast('🎮 Welcome to HungamaEsport! Click anything!');
    }, 500);
  });

  // ===== (OPTIONAL) ESC KEY SE MODAL CLOSE =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

</script>

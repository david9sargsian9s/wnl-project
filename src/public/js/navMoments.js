function toggleUserMenu() {
        document.getElementById('userMenu').classList.toggle('active');
    }
    // Close the popup when clicking anywhere else on the screen
    window.addEventListener('click', function(e) {
        const menu = document.getElementById('userMenu');
        if (!menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

async function checkNavbarAuth() {
    try {
      const res = await fetch('/auth/get');

      const authZone = document.getElementById('nav-auth-zone');

      if (res.ok) {
        const data = await res.json();
        
        authZone.innerHTML = `
          <div class="user-nav-profile" style="display: inline-flex; align-items: center; gap: 10px;">
                 
            <span id="nav-username">${data.user.name}</span>
            <button id="nav-logout-btn" style="cursor: pointer;">logOut</button>
          </div>
        `;

        document.getElementById('nav-logout-btn').addEventListener('click', async () => {
          const logoutRes = await fetch('/auth/clear', { method: 'POST' });
          if (logoutRes.ok) {
            window.location.reload();
          }
        });

      } else {
        authZone.innerHTML = `
          <a href="/auth/login" id="nav-login-link">LogIn</a>
          <a href="/auth/register" id="nav-register-link">registration</a>
        `;
      }
    } catch (err) {
      console.error("Authorization verification error in the navbar:", err);
    }
  }

  checkNavbarAuth();

  function toggleMobileMenu() {
    const menu = document.getElementById('navMenuWrapper');
    const overlay = document.getElementById('navOverlay');
    const burger = document.getElementById('burgerBtn');

    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    burger.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    document.getElementById('navMenuWrapper').classList.remove('active');
    document.getElementById('navOverlay').classList.remove('active');
    document.getElementById('burgerBtn').classList.remove('active');
    document.body.style.overflow = '';
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('active');
}

window.addEventListener('click', function(e) {
    const userMenu = document.getElementById('userMenu');
    if (userMenu && !userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
    }
});
async function checkNavbarAuth() {
    try {
        const res = await fetch('/auth/get');
        const authZone = document.getElementById('nav-auth-zone');
        if (!authZone) return;
        if (res.ok) {
            const data = await res.json();
            authZone.innerHTML = `
              <div class="user-nav-profile" style="display: inline-flex; align-items: center; gap: 10px;">
                <span id="nav-username">${data.user.name}</span>
                <button id="nav-logout-btn" style="cursor: pointer;">logOut</button>
              </div>
            `;
            const logoutBtn = document.getElementById('nav-logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async () => {
                    const logoutRes = await fetch('/auth/clear', { method: 'POST' });
                    if (logoutRes.ok) {
                        window.location.reload();
                    }
                });
            }
        } else {
            authZone.innerHTML = `
              <a href="/auth/login" id="nav-login-link">LogIn</a>
              <a href="/auth/register" id="nav-register-link">registration</a>
            `;
        }
    } catch (err) {
        console.error(err);
    }
}

checkNavbarAuth();

function toggleMobileMenu() {
    const menu = document.getElementById('navMenuWrapper');
    const overlay = document.getElementById('navOverlay');
    const burger = document.getElementById('burgerBtn');
    if (!menu || !overlay || !burger) return;
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
    const menu = document.getElementById('navMenuWrapper');
    const overlay = document.getElementById('navOverlay');
    const burger = document.getElementById('burgerBtn');
    if (menu) menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (burger) burger.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

window.addEventListener('click', function(e) {
    const userMenu = document.getElementById('userMenu');
    if (userMenu && !userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
    }
});
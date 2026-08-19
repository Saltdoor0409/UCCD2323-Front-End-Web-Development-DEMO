
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


document.addEventListener("DOMContentLoaded", function () {
    

    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    
    if (getCookie("themePref") === "dark") {
        body.classList.add("dark-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill me-1 text-warning"></i> Light Mode';
        }
    }

   
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            if (body.classList.contains("dark-mode")) {
                setCookie("themePref", "dark", 30);
                themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill me-1 text-warning"></i> Light Mode';
            } else {
                setCookie("themePref", "light", 30);
                themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars-fill me-1"></i> Theme';
            }
        });
    }

    // logout logic
    const authContainer = document.getElementById("auth-nav-container");
    if (!authContainer) return;

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const activeUser = sessionStorage.getItem("activeUser") || "Member";


    if (isLoggedIn === "true") {
        const displayName = activeUser.split("@")[0]; 
        
        authContainer.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span class="text-info small fw-semibold text-nowrap">
                    <i class="bi bi-person-circle me-1"></i>Hi, ${displayName}
                </span>
                <button id="logout-btn" class="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold text-nowrap">
                    <i class="bi bi-box-arrow-right me-1"></i> Logout
                </button>
            </div>
        `;

    
        document.getElementById("logout-btn").addEventListener("click", function () {
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("activeUser");
            alert("👋 You have been logged out.");
            window.location.reload();
        });
    }
});
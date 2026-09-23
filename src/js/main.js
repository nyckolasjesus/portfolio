document.addEventListener("DOMContentLoaded", () => {

    /* Ano automático no footer */
    document.querySelectorAll("#current-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    /* Menu mobile */
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", isOpen);
        });
    }

    /* Fecha o menu após clicar em um link */
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("active");
            menuBtn?.setAttribute("aria-expanded", "false");
        });
    });

    /* Sombra sutil no header ao rolar */
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");
        if (!header) return;
        header.style.boxShadow = window.scrollY > 10
            ? "0 2px 10px rgba(0,0,0,0.05)"
            : "none";
    });
});

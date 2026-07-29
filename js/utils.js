/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   UTILITIES
========================================================== */

"use strict";

/* ==========================================================
   SELECTORS
========================================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();

    initBackToTop();

    initScrollAnimation();

});

/* ==========================================================
   THEME TOGGLE
========================================================== */

function initTheme() {

    const button = $("#themeBtn");

    if (!button) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        button.innerHTML = '<i class="fas fa-sun"></i>';

    }

    button.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const lightMode = document.body.classList.contains("light-theme");

        localStorage.setItem("theme", lightMode ? "light" : "dark");

        button.innerHTML = lightMode

            ? '<i class="fas fa-sun"></i>'

            : '<i class="fas fa-moon"></i>';

    });

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop() {

    const button = $(".back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   SCROLL ANIMATION
========================================================== */

function initScrollAnimation() {

    const items = $$(".fade-up, .fade-in");

    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    items.forEach(item => observer.observe(item));

}
/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu() {

    const menu = $(".menu");
    const button = $(".mobile-btn");

    if (!menu || !button) return;

    button.addEventListener("click", () => {

        menu.classList.toggle("active");

        button.classList.toggle("active");

    });

    $$(".menu a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            button.classList.remove("active");

        });

    });

}

/* ==========================================================
   STICKY HEADER
========================================================== */

function initStickyHeader() {

    const header = $(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}

/* ==========================================================
   COPY TO CLIPBOARD
========================================================== */

function copyText(text) {

    navigator.clipboard.writeText(text)

        .then(() => {

            showToast("Copied successfully.");

        })

        .catch(() => {

            showToast("Unable to copy.");

        });

}

/* ==========================================================
   TOAST NOTIFICATION
========================================================== */

function showToast(message = "") {

    let toast = $("#toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initStickyHeader();

    initSmoothScroll();

});

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

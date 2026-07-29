/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   APP.JS
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION
========================================================== */

const App = {

    /* ======================================================
       INITIALIZE APPLICATION
    ====================================================== */

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.loadHome();

    },

    /* ======================================================
       CACHE DOM ELEMENTS
    ====================================================== */

    cacheDOM() {

        this.statistics = document.querySelector("#statistics");

        this.featuredDocuments = document.querySelector("#featuredDocuments");

        this.latestDocuments = document.querySelector("#latestDocuments");

        this.collections = document.querySelector("#collections");

        this.featuredPhotos = document.querySelector("#featuredPhotos");

        this.featuredVideos = document.querySelector("#featuredVideos");

        this.featuredAudio = document.querySelector("#featuredAudio");

        this.loader = document.querySelector(".loader");

    },

    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {

        window.addEventListener("load", () => {

            this.hideLoader();

        });

    },

    /* ======================================================
       HIDE LOADER
    ====================================================== */

    hideLoader() {

        if (!this.loader) return;

        this.loader.classList.add("hidden");

        setTimeout(() => {

            this.loader.remove();

        }, 500);

    },

    /* ======================================================
       LOAD HOME
    ====================================================== */

    loadHome() {

        console.log("Mohamed Said Digital Historical Archive Started");

    }

};

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

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

    this.loadStatistics();

    }
    /* ======================================================
       LOAD JSON FILE
    ====================================================== */

    async loadJSON(file) {

        try {

            const response = await fetch(file);

            if (!response.ok) {

                throw new Error(`Failed to load ${file}`);

            }

            return await response.json();

        } catch (error) {

            console.error(error);

            return [];

        }

    },

    /* ======================================================
       LOAD STATISTICS
    ====================================================== */

    async loadStatistics() {

        const documents = await this.loadJSON("data/documents.json");

        const photos = await this.loadJSON("data/photos.json");

        const videos = await this.loadJSON("data/videos.json");

        const audio = await this.loadJSON("data/audio.json");

        const documentsCount = document.querySelector("#documentsCount");

        const photosCount = document.querySelector("#photosCount");

        const videosCount = document.querySelector("#videosCount");

        const audioCount = document.querySelector("#audioCount");

        if (documentsCount) {

            documentsCount.textContent = documents.length;

        }

        if (photosCount) {

            photosCount.textContent = photos.length;

        }

        if (videosCount) {

            videosCount.textContent = videos.length;

        }

        if (audioCount) {

            audioCount.textContent = audio.length;

        }

    },
};

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

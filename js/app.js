/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   APP.JS
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION
========================================================== */

const App = {

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.loadStatistics();

        this.loadFeaturedDocuments();

        this.loadLatestDocuments();

        this.loadCollections();

    },

    cacheDOM() {

        this.statsContainer = document.querySelector("#statistics");

        this.featuredContainer = document.querySelector("#featuredDocuments");

        this.latestContainer = document.querySelector("#latestDocuments");

        this.collectionsContainer = document.querySelector("#collections");

    },

    bindEvents() {

        window.addEventListener("load", () => {

            this.hideLoader();

        });

    },

    hideLoader() {

        const loader = document.querySelector(".loader");

        if (!loader) return;

        loader.classList.add("hidden");

        setTimeout(() => {

            loader.remove();

        }, 500);

    },

    async loadJSON(file) {

        try {

            const response = await fetch(file);

            if (!response.ok) {

                throw new Error("Unable to load " + file);

            }

            return await response.json();

        }

        catch (error) {

            console.error(error);

            return [];

        }

    },

    async loadStatistics() {

        const documents = await this.loadJSON("data/documents.json");

        const photos = await this.loadJSON("data/photos.json");

        const videos = await this.loadJSON("data/videos.json");

        const audio = await this.loadJSON("data/audio.json");

        document.querySelector("#documentsCount").textContent = documents.length;

        document.querySelector("#photosCount").textContent = photos.length;

        document.querySelector("#videosCount").textContent = videos.length;

        document.querySelector("#audioCount").textContent = audio.length;

    }

};

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

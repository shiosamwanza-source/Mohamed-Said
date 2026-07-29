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
       /* ======================================================
       LOAD FEATURED DOCUMENTS
    ====================================================== */

    async loadFeaturedDocuments() {

        if (!this.featuredDocuments) return;

        const documents = await this.loadJSON("data/documents.json");

        const featured = documents
            .filter(doc => doc.featured === true)
            .slice(0, 6);

        if (!featured.length) {

            this.featuredDocuments.innerHTML =
                `<p class="empty-state">No featured documents found.</p>`;

            return;

        }

        this.featuredDocuments.innerHTML = featured.map(doc => `

            <article class="document-card">

                <div class="document-image">

                    <img src="${doc.cover}" alt="${doc.title}">

                </div>

                <div class="document-content">

                    <span class="badge">${doc.category}</span>

                    <h3>${doc.title}</h3>

                    <p>${doc.description}</p>

                    <a href="pages/document.html?id=${doc.id}"
                       class="btn-main">

                        Read More

                    </a>

                </div>

            </article>

        `).join("");

    },

    /* ======================================================
       LOAD LATEST DOCUMENTS
    ====================================================== */

    async loadLatestDocuments() {

        if (!this.latestDocuments) return;

        const documents = await this.loadJSON("data/documents.json");

        const latest = [...documents]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 8);

        if (!latest.length) {

            this.latestDocuments.innerHTML =
                `<p class="empty-state">No documents available.</p>`;

            return;

        }

        this.latestDocuments.innerHTML = latest.map(doc => `

            <article class="document-card">

                <div class="document-image">

                    <img src="${doc.cover}" alt="${doc.title}">

                </div>

                <div class="document-content">

                    <span class="badge">${doc.category}</span>

                    <h3>${doc.title}</h3>

                    <p>${doc.description}</p>

                    <a href="pages/document.html?id=${doc.id}"
                       class="btn-main">

                        Read More

                    </a>

                </div>

            </article>

        `).join("");

    },
};

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

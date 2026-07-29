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

        this.loadFeaturedDocuments();

        this.loadLatestDocuments();
        
        this.loadCollections();

        this.loadFeaturedPhotos();

        this.loadFeaturedVideos();

        this.loadFeaturedAudio();

               /* ======================================================
       REFRESH APPLICATION
    ====================================================== */

    async refresh() {

        await Promise.all([

            this.loadStatistics(),

            this.loadFeaturedDocuments(),

            this.loadLatestDocuments(),

            this.loadCollections(),

            this.loadFeaturedPhotos(),

            this.loadFeaturedVideos(),

            this.loadFeaturedAudio()

        ]);

    },

    /* ======================================================
       APPLICATION INFORMATION
    ====================================================== */

    version() {

        return {

            name: "Mohamed Said Digital Historical Archive",

            version: "1.0.0",

            platform: "GitHub Pages",

            author: "Mohamed Said Digital Archive"

        };

    }

};

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
        this.documentCard(doc))

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
        this.documentCard(doc))

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
    /* ======================================================
       LOAD FEATURED PHOTOS
    ====================================================== */

    async loadFeaturedPhotos() {

        if (!this.featuredPhotos) return;

        const photos = await this.loadJSON("data/photos.json");

        if (!photos.length) {

            this.featuredPhotos.innerHTML =
                `<p class="empty-state">No photos available.</p>`;

            return;

        }

        this.featuredPhotos.innerHTML = photos
            .slice(0, 8)
            .map(photo => `

                <div class="photo-card">

                    <img src="${photo.image}" alt="${photo.title}">

                    <div class="photo-info">

                        <h4>${photo.title}</h4>

                    </div>

                </div>

            `)
            .join("");

    },

    /* ======================================================
       LOAD FEATURED VIDEOS
    ====================================================== */

    async loadFeaturedVideos() {

        if (!this.featuredVideos) return;

        const videos = await this.loadJSON("data/videos.json");

        if (!videos.length) {

            this.featuredVideos.innerHTML =
                `<p class="empty-state">No videos available.</p>`;

            return;

        }

        this.featuredVideos.innerHTML = videos
            .slice(0, 6)
            .map(video => `

                <div class="video-card">

                    <img src="${video.thumbnail}" alt="${video.title}">

                    <div class="video-info">

                        <h4>${video.title}</h4>

                        <a href="${video.url}"
                           target="_blank"
                           class="btn-main">

                            Watch

                        </a>

                    </div>

                </div>

            `)
            .join("");

    },

    /* ======================================================
       LOAD FEATURED AUDIO
    ====================================================== */

    async loadFeaturedAudio() {

        if (!this.featuredAudio) return;

        const audio = await this.loadJSON("data/audio.json");

        if (!audio.length) {

            this.featuredAudio.innerHTML =
                `<p class="empty-state">No audio available.</p>`;

            return;

        }

        this.featuredAudio.innerHTML = audio
            .slice(0, 6)
            .map(item => `

                <div class="audio-card">

                    <h4>${item.title}</h4>

                    <audio controls>

                        <source src="${item.file}" type="audio/mpeg">

                        Your browser does not support audio.

                    </audio>

                </div>

            `)
            .join("");

    },
    /* ======================================================
       REFRESH APPLICATION
    ====================================================== */

    async refresh() {

        await Promise.all([

            this.loadStatistics(),

            this.loadFeaturedDocuments(),

            this.loadLatestDocuments(),

            this.loadCollections(),

            this.loadFeaturedPhotos(),

            this.loadFeaturedVideos(),

            this.loadFeaturedAudio()

        ]);

    },

    /* ======================================================
       APPLICATION INFORMATION
    ====================================================== */

    version() {

        return {

            name: "Mohamed Said Digital Historical Archive",

            version: "1.0.0",

            platform: "GitHub Pages",

            author: "Mohamed Said Digital Archive"

        };

    }

};
/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

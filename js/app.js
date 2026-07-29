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
/* ==========================================================
   FEATURED DOCUMENTS
========================================================== */

async loadFeaturedDocuments() {

    if (!this.featuredContainer) return;

    const documents = await this.loadJSON("data/documents.json");

    const featured = documents.filter(doc => doc.featured).slice(0, 6);

    if (!featured.length) {

        this.featuredContainer.innerHTML =
            `<p class="empty-state">No featured documents available.</p>`;

        return;

    }

    this.featuredContainer.innerHTML =
        featured.map(doc => this.documentCard(doc)).join("");

}

/* ==========================================================
   LATEST DOCUMENTS
========================================================== */

async loadLatestDocuments() {

    if (!this.latestContainer) return;

    const documents = await this.loadJSON("data/documents.json");

    const latest = [...documents]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 8);

    if (!latest.length) {

        this.latestContainer.innerHTML =
            `<p class="empty-state">No documents found.</p>`;

        return;

    }

    this.latestContainer.innerHTML =
        latest.map(doc => this.documentCard(doc)).join("");

}

/* ==========================================================
   COLLECTIONS
========================================================== */

async loadCollections() {

    if (!this.collectionsContainer) return;

    const documents = await this.loadJSON("data/documents.json");

    const groups = {};

    documents.forEach(doc => {

        const category = doc.category || "General";

        groups[category] = (groups[category] || 0) + 1;

    });

    this.collectionsContainer.innerHTML = Object.entries(groups)

        .map(([category, total]) => `

            <div class="collection-card fade-up">

                <h3>${category}</h3>

                <p>${total} Documents</p>

            </div>

        `)

        .join("");

}

/* ==========================================================
   DOCUMENT CARD
========================================================== */

documentCard(doc) {/* ==========================================================
   FEATURED PHOTOS
========================================================== */

async loadFeaturedPhotos() {

    const container = document.querySelector("#featuredPhotos");

    if (!container) return;

    const photos = await this.loadJSON("data/photos.json");

    if (!photos.length) {

        container.innerHTML =
            `<p class="empty-state">No photos available.</p>`;

        return;

    }

    container.innerHTML = photos.slice(0, 8).map(photo => `

        <div class="photo-card fade-up">

            <img src="${photo.image}" alt="${photo.title}">

            <div class="photo-info">

                <h4>${photo.title}</h4>

            </div>

        </div>

    `).join("");

}

/* ==========================================================
   FEATURED VIDEOS
========================================================== */

async loadFeaturedVideos() {

    const container = document.querySelector("#featuredVideos");

    if (!container) return;

    const videos = await this.loadJSON("data/videos.json");

    if (!videos.length) {

        container.innerHTML =
            `<p class="empty-state">No videos available.</p>`;

        return;

    }

    container.innerHTML = videos.slice(0, 6).map(video => `

        <div class="video-card fade-up">

            <img src="${video.thumbnail}" alt="${video.title}">

            <div class="video-info">

                <h4>${video.title}</h4>

                <a href="${video.url}" target="_blank" class="btn-main">

                    Watch

                </a>

            </div>

        </div>

    `).join("");

}

/* ==========================================================
   FEATURED AUDIO
========================================================== */

async loadFeaturedAudio() {

    const container = document.querySelector("#featuredAudio");

    if (!container) return;

    const audio = await this.loadJSON("data/audio.json");

    if (!audio.length) {

        container.innerHTML =
            `<p class="empty-state">No audio available.</p>`;

        return;

    }

    container.innerHTML = audio.slice(0, 6).map(item => `

        <div class="audio-card fade-up">

            <h4>${item.title}</h4>

            <audio controls>

                <source src="${item.file}" type="audio/mpeg">

                Your browser does not support the audio element.

            </audio>

        </div>

    `).join("");

}

/* ==========================================================
   REFRESH APPLICATION
========================================================== */

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

}

/* ==========================================================
   APPLICATION INFO
========================================================== */

version() {

    return {

        name: "Mohamed Said Digital Historical Archive",

        version: "1.0.0",

        platform: "GitHub Pages"

    };

}

    return `

    <article class="document-card fade-up">

        <div class="document-image">

            <img src="${doc.cover}" alt="${doc.title}">

        </div>

        <div class="document-content">

            <span class="badge">${doc.category}</span>

            <h3>${doc.title}</h3>

            <p>${doc.description}</p>

            <div class="card-footer">

                <small>${doc.date}</small>

                <a href="pages/document.html?id=${doc.id}"
                   class="btn-main">

                   Read More

                </a>

            </div>

        </div>

    </article>

    `;

}

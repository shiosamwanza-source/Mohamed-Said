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

documentCard(doc) {

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

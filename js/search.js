/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   SEARCH.JS
========================================================== */

"use strict";

/* ==========================================================
   SEARCH MODULE
========================================================== */

const Search = {

    /* ======================================================
       INITIALIZE
    ====================================================== */

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.loadDocuments();

    },

    /* ======================================================
       CACHE DOM ELEMENTS
    ====================================================== */

    cacheDOM() {

        this.searchInput = document.querySelector("#searchInput");

        this.searchButton = document.querySelector("#searchButton");

        this.resultsContainer = document.querySelector("#searchResults");

        this.documents = [];

        this.results = [];

    },

    /* ======================================================
       BIND EVENTS
    ====================================================== */

    bindEvents() {

        if (this.searchButton) {

            this.searchButton.addEventListener("click", () => {

                this.search();

            });

        }

        if (this.searchInput) {

            this.searchInput.addEventListener("keyup", (event) => {

                if (event.key === "Enter") {

                    this.search();

                }

            });

        }

    }

       /* ======================================================
       LOAD JSON
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
       LOAD DOCUMENTS
    ====================================================== */

    async loadDocuments() {

        this.documents = await this.loadJSON("data/documents.json");

    },
       /* ======================================================
       SEARCH DOCUMENTS
    ====================================================== */

    async search() {

        if (!this.documents.length) {

            await this.loadDocuments();

        }

        const keyword = this.searchInput
            ? this.searchInput.value.trim().toLowerCase()
            : "";

        if (!keyword) {

            this.results = [];

            this.renderResults();

            return;

        }

        this.results = this.documents.filter(doc => {

            return (

                (doc.title || "").toLowerCase().includes(keyword) ||

                (doc.description || "").toLowerCase().includes(keyword) ||

                (doc.category || "").toLowerCase().includes(keyword) ||

                (doc.author || "").toLowerCase().includes(keyword) ||

                String(doc.year || "").includes(keyword)

            );

        });

        this.renderResults();

    },

    /* ======================================================
       RENDER RESULTS
    ====================================================== */

    renderResults() {

        if (!this.resultsContainer) return;

        if (!this.results.length) {

            this.resultsContainer.innerHTML = `

                <div class="empty-state">

                    <h3>No Results Found</h3>

                    <p>Try another keyword.</p>

                </div>

            `;

            return;

        }

        this.resultsContainer.innerHTML = this.results.map(doc => `

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
       LIVE SEARCH
    ====================================================== */

    liveSearch() {

        if (!this.searchInput) return;

        this.searchInput.addEventListener("input", () => {

            this.search();

        });

    },

    /* ======================================================
       CLEAR SEARCH
    ====================================================== */

    clearSearch() {

        if (!this.searchInput) return;

        this.searchInput.value = "";

        this.results = [];

        this.renderResults();

    },

    /* ======================================================
       SEARCH SUGGESTIONS
    ====================================================== */

    getSuggestions(keyword) {

        if (!this.documents.length) return [];

        keyword = keyword.toLowerCase();

        return this.documents

            .filter(doc =>

                (doc.title || "")
                    .toLowerCase()
                    .includes(keyword)

            )

            .slice(0, 5);

    }
};

/* ==========================================================
   START SEARCH
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Search.init();

});

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

    },

    /* ======================================================
       SEARCH PLACEHOLDER
    ====================================================== */

    search() {

        console.log("Search initialized.");

    }

};

/* ==========================================================
   START SEARCH
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Search.init();
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
       LIVE SEARCH
    ====================================================== */

    async search() {

        if (!this.documents) {

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

                (doc.description || "").toLowerCase().includes(keyword)

            );

        });

        this.renderResults();

    },

});

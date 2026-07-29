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
};

/* ==========================================================
   START SEARCH
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Search.init();

});

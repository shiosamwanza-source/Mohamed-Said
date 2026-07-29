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

};

/* ==========================================================
   START SEARCH
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Search.init();

});

/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   DOCUMENTS.JS
========================================================== */

"use strict";

/* ==========================================================
   DOCUMENT MODULE
========================================================== */

const Documents = {

    /* ======================================================
       INITIALIZE
    ====================================================== */

    init() {

        this.cacheDOM();

        this.loadDocument();

    },

    /* ======================================================
       CACHE DOM ELEMENTS
    ====================================================== */

    cacheDOM() {

        this.title = document.querySelector("#documentTitle");

        this.cover = document.querySelector("#documentCover");

        this.description = document.querySelector("#documentDescription");

        this.author = document.querySelector("#documentAuthor");

        this.category = document.querySelector("#documentCategory");

        this.year = document.querySelector("#documentYear");

        this.viewer = document.querySelector("#documentViewer");

        this.related = document.querySelector("#relatedDocuments");

    },

    /* ======================================================
       GET DOCUMENT ID
    ====================================================== */

    getDocumentId() {

        const params = new URLSearchParams(window.location.search);

        return params.get("id");

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
       LOAD DOCUMENT
    ====================================================== */

    async loadDocument() {

        const id = this.getDocumentId();

        if (!id) return;

        const documents = await this.loadJSON("data/documents.json");

        this.document = documents.find(doc =>

            String(doc.id) === String(id)

        );

        if (!this.document) {

            console.error("Document not found.");

            return;
           
           this.renderDocument();

        }
           /* ======================================================
       RENDER DOCUMENT
    ====================================================== */

    renderDocument() {

        if (!this.document) return;

        if (this.title) {

            this.title.textContent = this.document.title || "";

            document.title = this.document.title || document.title;

        }

        if (this.cover) {

            this.cover.src = this.document.cover || "";

            this.cover.alt = this.document.title || "";

        }

        if (this.description) {

            this.description.textContent =
                this.document.description || "";

        }

        if (this.author) {

            this.author.textContent =
                this.document.author || "";

        }

        if (this.category) {

            this.category.textContent =
                this.document.category || "";

        }

        if (this.year) {

            this.year.textContent =
                this.document.year || "";

        }

        if (this.viewer && this.document.pdf) {

            this.viewer.src = this.document.pdf;

        }

    },

};

/* ==========================================================
   START DOCUMENTS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Documents.init();

});

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

        }

    },

};

/* ==========================================================
   START DOCUMENTS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Documents.init();

});

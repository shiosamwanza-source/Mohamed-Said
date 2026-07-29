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

};

/* ==========================================================
   START DOCUMENTS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Documents.init();

});

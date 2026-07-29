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
       /* ======================================================
       RELATED DOCUMENTS
    ====================================================== */

    async loadRelatedDocuments() {

        if (!this.related || !this.document) return;

        const documents = await this.loadJSON("data/documents.json");

        const related = documents.filter(doc =>

            doc.id !== this.document.id &&
            doc.category === this.document.category

        ).slice(0, 4);

        if (!related.length) {

            this.related.innerHTML = `
                <p>No related documents found.</p>
            `;

            return;

        }

        this.related.innerHTML = related.map(doc => `

            <article class="document-card">

                <img src="${doc.cover}" alt="${doc.title}">

                <h3>${doc.title}</h3>

                <p>${doc.year}</p>

                <a href="document.html?id=${doc.id}" class="btn-main">
                    Read More
                </a>

            </article>

        `).join("");

    },

    /* ======================================================
       DOWNLOAD DOCUMENT
    ====================================================== */

    downloadDocument() {

        if (!this.document || !this.document.pdf) return;

        window.open(this.document.pdf, "_blank");

    },

    /* ======================================================
       SHARE DOCUMENT
    ====================================================== */

    async shareDocument() {

        if (!this.document) return;

        if (navigator.share) {

            try {

                await navigator.share({

                    title: this.document.title,

                    text: this.document.description,

                    url: window.location.href

                });

            } catch (error) {

                console.error(error);

            }

        }

    },

       /* ======================================================
       RELATED DOCUMENTS
    ====================================================== */

    async loadRelatedDocuments() {

        if (!this.related || !this.document) return;

        const documents = await this.loadJSON("data/documents.json");

        const related = documents.filter(doc =>

            doc.id !== this.document.id &&
            doc.category === this.document.category

        ).slice(0, 4);

        if (!related.length) {

            this.related.innerHTML = `
                <p>No related documents found.</p>
            `;

            return;

        }

        this.related.innerHTML = related.map(doc => `

            <article class="document-card">

                <img src="${doc.cover}" alt="${doc.title}">

                <h3>${doc.title}</h3>

                <p>${doc.year}</p>

                <a href="document.html?id=${doc.id}" class="btn-main">
                    Read More
                </a>

            </article>

        `).join("");

    },

    /* ======================================================
       DOWNLOAD DOCUMENT
    ====================================================== */

    downloadDocument() {

        if (!this.document || !this.document.pdf) return;

        window.open(this.document.pdf, "_blank");

    },

    /* ======================================================
       SHARE DOCUMENT
    ====================================================== */

    async shareDocument() {

        if (!this.document) return;

        if (navigator.share) {

            try {

                await navigator.share({

                    title: this.document.title,

                    text: this.document.description,

                    url: window.location.href

                });

            } catch (error) {

                console.error(error);

            }

        }

    },

};

/* ==========================================================
   START DOCUMENTS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Documents.init();

});

/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   APP.JS (PREMIUM MODERN ES6+)
========================================================== */

"use strict";

const App = {
    data: {
        documents: [],
        photos: [],
        videos: [],
        audio: []
    },

    /* ======================================================
       INITIALIZE APPLICATION
    ====================================================== */
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.initUI();
        this.loadHome();
    },

    /* ======================================================
       CACHE DOM ELEMENTS
    ====================================================== */
    cacheDOM() {
        this.preloader = document.getElementById("preloader");
        this.header = document.getElementById("header");
        this.menuToggle = document.getElementById("menuToggle");
        this.navbar = document.getElementById("navbar");
        this.backToTop = document.getElementById("backToTop");

        this.statistics = document.querySelector("#statistics");
        this.featuredDocuments = document.querySelector("#featuredDocuments");
        this.latestDocuments = document.querySelector("#latestDocuments");
        this.featuredPhotos = document.querySelector("#featuredPhotos") || document.querySelector("#photo-gallery");
        this.featuredVideos = document.querySelector("#featuredVideos");
        this.featuredAudio = document.querySelector("#featuredAudio");
    },

    /* ======================================================
       BIND EVENTS
    ====================================================== */
    bindEvents() {
        window.addEventListener("load", () => this.hideLoader());
        window.addEventListener("scroll", () => this.handleScroll());

        if (this.menuToggle) {
            this.menuToggle.addEventListener("click", () => {
                this.navbar.classList.toggle("active");
            });
        }

        // Close menu when a link is clicked
        document.querySelectorAll("#navbar a").forEach(link => {
            link.addEventListener("click", () => {
                this.navbar.classList.remove("active");
            });
        });

        if (this.backToTop) {
            this.backToTop.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    },

    /* ======================================================
       UI INTERACTIONS (Preloader, Scroll Effects, Reveal)
    ====================================================== */
    initUI() {
        // Scroll Reveal Animation
        const revealElements = document.querySelectorAll(".reveal");
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Counter Animation
        const counters = document.querySelectorAll("[data-count]");
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    },

    handleScroll() {
        // Header Shadow on Scroll
        if (window.scrollY > 50) {
            this.header.classList.add("scrolled");
        } else {
            this.header.classList.remove("scrolled");
        }

        // Back to top button
        if (window.scrollY > 300) {
            this.backToTop.style.display = "block";
        } else {
            this.backToTop.style.display = "none";
        }
    },

    animateCounter(element) {
        const target = +element.getAttribute("data-count");
        let current = 0;
        const increment = target / 100; // Adjust speed here

        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target;
            }
        };
        updateCount();
    },

    hideLoader() {
        if (!this.preloader) return;
        this.preloader.classList.add("hidden");
        setTimeout(() => {
            this.preloader.style.display = "none";
        }, 600);
    },

    /* ======================================================
       LOAD HOME (Fetch all data at once for performance)
    ====================================================== */
    async loadHome() {
        console.log("Mohamed Said Digital Historical Archive Started");
        
        try {
            const [documents, photos, videos, audio] = await Promise.all([
                this.loadJSON("data/documents.json"),
                this.loadJSON("data/photos.json"),
                this.loadJSON("data/videos.json"),
                this.loadJSON("data/audio.json")
            ]);

            this.data.documents = documents;
            this.data.photos = photos;
            this.data.videos = videos;
            this.data.audio = audio;

            // Render Data to UI
            this.renderStatistics();
            this.renderFeaturedDocuments();
            this.renderLatestDocuments();
            this.renderFeaturedPhotos();
            this.renderFeaturedVideos();
            this.renderFeaturedAudio();

        } catch (error) {
            console.error("Failed to initialize archive data:", error);
        }
    },

    /* ======================================================
       LOAD JSON HELPER
    ====================================================== */
    async loadJSON(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${file}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to load ${file}:`, error);
            return []; // Return empty array to prevent app crash
        }
    },

    /* ======================================================
       RENDER METHODS
    ====================================================== */
    renderStatistics() {
        const docsCount = this.data.documents.length;
        const photosCount = this.data.photos.length;
        const videosCount = this.data.videos.length;
        const audioCount = this.data.audio.length;

        const setText = (id, val) => {
            const el = document.querySelector(id);
            if (el) el.textContent = val;
        };

        setText("#documentsCount", docsCount);
        setText("#photosCount", photosCount);
        setText("#videosCount", videosCount);
        setText("#audioCount", audioCount);
    },

    renderFeaturedDocuments() {
        if (!this.featuredDocuments) return;
        const featured = this.data.documents.filter(doc => doc.featured === true).slice(0, 6);

        if (!featured.length) {
            this.featuredDocuments.innerHTML = `<p class="empty-state">No featured documents found.</p>`;
            return;
        }

        this.featuredDocuments.innerHTML = featured.map(doc => `
            <article class="document-card">
                <div class="document-image">
                    <img src="${doc.cover || 'assets/images/default.jpg'}" alt="${doc.title}">
                    ${doc.featured ? '<span class="card-ribbon">Featured</span>' : ''}
                </div>
                <div class="document-content">
                    <span class="status-badge badge-featured">${doc.category || 'Document'}</span>
                    <h3 class="document-title">${doc.title}</h3>
                    <p class="document-description">${doc.description || ''}</p>
                    <a href="pages/document.html?id=${doc.id}" class="btn btn-primary card-btn">
                        <i class="fas fa-book-open"></i> Read More
                    </a>
                </div>
            </article>
        `).join("");
    },

    renderLatestDocuments() {
        if (!this.latestDocuments) return;
        const latest = [...this.data.documents]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 8);

        if (!latest.length) {
            this.latestDocuments.innerHTML = `<p class="empty-state">No documents available.</p>`;
            return;
        }

        this.latestDocuments.innerHTML = latest.map(doc => `
            <article class="document-card">
                <div class="document-image">
                    <img src="${doc.cover || 'assets/images/default.jpg'}" alt="${doc.title}">
                </div>
                <div class="document-content">
                    <span class="status-badge badge-new">${doc.category || 'Document'}</span>
                    <h3 class="document-title">${doc.title}</h3>
                    <p class="document-description">${doc.description || ''}</p>
                    <a href="pages/document.html?id=${doc.id}" class="btn btn-outline card-btn">
                        <i class="fas fa-eye"></i> View Document
                    </a>
                </div>
            </article>
        `).join("");
    },

    renderFeaturedPhotos() {
        if (!this.featuredPhotos) return;
        if (!this.data.photos.length) {
            this.featuredPhotos.innerHTML = `<p class="empty-state">No photos available.</p>`;
            return;
        }

        this.featuredPhotos.innerHTML = this.data.photos.slice(0, 8).map(photo => `
            <div class="photo-card">
                <img src="${photo.image || 'assets/images/default.jpg'}" alt="${photo.title}">
                <div class="photo-overlay">
                    <h3>${photo.title}</h3>
                    <p>${photo.description || ''}</p>
                    <span class="status-badge badge-featured">${photo.category || 'Photo'}</span>
                </div>
            </div>
        `).join("");
    },

    renderFeaturedVideos() {
        if (!this.featuredVideos) return;
        if (!this.data.videos.length) {
            this.featuredVideos.innerHTML = `<p class="empty-state">No videos available.</p>`;
            return;
        }

        this.featuredVideos.innerHTML = this.data.videos.slice(0, 6).map(video => `
            <div class="video-card">
                <img src="${video.thumbnail || 'assets/images/default.jpg'}" alt="${video.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <a href="${video.url}" target="_blank" class="btn btn-primary card-btn">
                        <i class="fab fa-youtube"></i> Watch Now
                    </a>
                </div>
            </div>
        `).join("");
    },

    renderFeaturedAudio() {
        if (!this.featuredAudio) return;
        if (!this.data.audio.length) {
            this.featuredAudio.innerHTML = `<p class="empty-state">No audio available.</p>`;
            return;
        }

        this.featuredAudio.innerHTML = this.data.audio.slice(0, 6).map(item => `
            <div class="audio-card">
                <div class="audio-icon">
                    <i class="fas fa-headphones"></i>
                </div>
                <div class="audio-content">
                    <h3>${item.title}</h3>
                    <audio controls style="width: 100%; margin-top: 10px; outline: none;">
                        <source src="${item.file}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        `).join("");
    },

    /* ======================================================
       APPLICATION INFORMATION
    ====================================================== */
    version() {
        return {
            name: "Mohamed Said Digital Historical Archive",
            version: "1.0.0",
            platform: "GitHub Pages",
            author: "Mohamed Said Digital Archive"
        };
    }
};

/* ==========================================================
   START APPLICATION
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

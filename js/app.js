/* ==========================================================
   MOHAMED SAID DIGITAL HISTORICAL ARCHIVE
   RESPONSIVE STYLESHEET (PREMIUM OPTIMIZED)
========================================================== */

/* ==========================================================
   EXTRA LARGE DESKTOPS (1440px and up)
========================================================== */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }

  .hero h1 {
    font-size: 5.2rem;
  }

  section {
    padding: 110px 0;
  }
}

/* ==========================================================
   LARGE TABLETS & SMALL LAPTOPS (1200px)
========================================================== */
@media (max-width: 1200px) {
  .container {
    width: 94%;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 50px;
  }

  .hero-content {
    max-width: 800px;
    margin: auto;
  }

  .hero-search {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-image {
    order: -1; /* Picha iondoke juu, maandishi chini */
  }

  .hero-image img {
    max-width: 420px;
    margin: auto;
  }

  .hero-buttons,
  .hero-stats {
    justify-content: center;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  }
}

/* ==========================================================
   TABLETS (992px)
========================================================== */
@media (max-width: 992px) {
  /* Mobile Navigation Activation */
  #menuToggle {
    display: flex;
  }

  #navbar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: var(--background-2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 100px 25px 35px;
    transition: var(--transition);
    border-left: 1px solid var(--border);
    box-shadow: var(--shadow);
    z-index: 999;
    overflow-y: auto;
  }

  #navbar.active {
    right: 0;
  }

  #navbar ul {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }

  #navbar ul li {
    width: 100%;
  }

  #navbar ul li a {
    display: block;
    width: 100%;
    padding: 18px 0;
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .section {
    padding: 70px 0;
  }

  .section-header h2 {
    font-size: 2.1rem;
  }

  /* Timeline Adjustment for Tablets */
  .timeline-wrapper::before {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    left: 0 !important;
    text-align: left !important;
    padding-left: 55px;
    padding-right: 15px;
  }

  .collection-grid,
  .document-grid,
  .gallery-grid,
  .video-grid,
  .audio-grid,
  .figure-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .newsletter-box {
    flex-direction: column;
    text-align: center;
  }

  .newsletter-form {
    justify-content: center;
    width: 100%;
  }
}

/* ==========================================================
   MOBILE DEVICES (768px)
========================================================== */
@media (max-width: 768px) {
  .hero {
    padding: 120px 0 60px;
    min-height: auto;
  }

  .hero h1 {
    font-size: 2.3rem;
  }

  .hero h1 span {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .hero-buttons a,
  .hero-buttons .btn {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .collection-grid,
  .document-grid,
  .gallery-grid,
  .video-grid,
  .audio-grid,
  .figure-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-about p {
    margin: 0 auto;
  }

  .social-icons {
    justify-content: center;
  }

  .newsletter-box {
    padding: 30px;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input {
    min-width: 100%;
  }

  /* Search Bar Mobile Adjustments */
  .search-wrapper {
    flex-direction: column;
    border-radius: 18px;
    padding: 5px;
  }

  .search-wrapper i {
    display: none;
  }

  .search-wrapper input {
    width: 100%;
    padding: 16px;
    margin-bottom: 10px;
  }

  .search-wrapper button {
    width: 100%;
    border-radius: 12px;
    padding: 14px;
  }

  .hero-image img {
    max-width: 320px;
  }
}

/* ==========================================================
   SMALL MOBILE DEVICES (576px)
========================================================== */
@media (max-width: 576px) {
  .container {
    width: 95%;
  }

  .logo img {
    width: 45px;
    height: 45px;
  }

  .logo h2 {
    font-size: 1rem;
  }

  .logo span {
    font-size: 0.7rem;
    letter-spacing: 1px;
  }

  .section {
    padding: 55px 0;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero-tag {
    font-size: 0.8rem;
  }

  /* Adjust Card Image Heights for Small Screens */
  .document-image {
    height: 220px;
  }

  .photo-card img {
    height: 240px;
  }

  .video-card img {
    height: 200px;
  }

  .figure-card img {
    height: 260px;
  }

  .footer {
    padding: 50px 0 20px;
  }

  .footer-bottom {
    font-size: 0.85rem;
  }

  /* Adjust Floating Buttons for Small Screens */
  .whatsapp-float {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    bottom: 20px;
    right: 20px;
  }

  #backToTop {
    bottom: 80px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}

/* ==========================================================
   LANDSCAPE PHONES (Height less than 600px)
========================================================== */
@media (max-height: 600px) and (orientation: landscape) {
  .hero {
    min-height: auto;
    padding: 100px 0 50px;
  }

  .hero-grid {
    gap: 30px;
  }

  .hero-image img {
    max-width: 250px;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
}

/* ==========================================================
   ACCESSIBILITY (Reduced Motion)
========================================================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ==========================================================
   PRINT STYLES (Kwa ajili ya kuchapa nyaraka)
========================================================== */
@media print {
  #header,
  .footer,
  .hero-buttons,
  .newsletter,
  #backToTop,
  .whatsapp-float,
  #menuToggle {
    display: none !important;
  }

  body {
    background: #fff !important;
    color: #000 !important;
  }

  .hero {
    background: none !important;
    padding: 20px 0 !important;
    min-height: auto !important;
  }

  .hero h1,
  .hero p,
  h1, h2, h3, h4 {
    color: #000 !important;
  }

  section {
    padding: 20px 0 !important;
  }

  a {
    color: #000 !important;
    text-decoration: underline;
  }
}

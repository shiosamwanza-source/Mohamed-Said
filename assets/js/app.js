// ======================================
// Mohamed Said Digital Historical Archive
// app.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Mohamed Said Digital Historical Archive Loaded");

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});


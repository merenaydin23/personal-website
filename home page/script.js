// Optimized scroll animation with throttle
let scrollTimeout = null;
function handleScrollAnimation() {
  if (scrollTimeout) return;

  scrollTimeout = requestAnimationFrame(() => {
    document.querySelectorAll("section:not(.hero)").forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
    scrollTimeout = null;
  });
}

// Throttled scroll event
document.addEventListener("scroll", handleScrollAnimation, { passive: true });

// Initial check for sections already in view
handleScrollAnimation();

// Optimized social links with smooth animation
document.querySelectorAll(".social-link").forEach((link) => {
  let isNavigating = false;

  link.addEventListener("click", (e) => {
    if (isNavigating) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    isNavigating = true;
    link.classList.add("clicked");

    // Navigate after short animation (matches CSS transition time)
    setTimeout(() => {
      const href = link.getAttribute("href");
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
      }

      // Reset after navigation
      setTimeout(() => {
        link.classList.remove("clicked");
        isNavigating = false;
      }, 300);
    }, 400); // Reduced from 1200ms to 400ms for smoother experience
  });
});

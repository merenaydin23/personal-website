// Blog & Apps Tab Switching
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Activate selected tab button
  const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (selectedBtn) {
    selectedBtn.classList.add("active");
  }

  // Scroll to tabs section
  document.querySelector(".tabs-section").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Blog Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      blogCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease-in";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // App Category Filter
  const categoryButtons = document.querySelectorAll(".category-btn");
  const appCards = document.querySelectorAll(".app-card");

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      appCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease-in";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// Fade in animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

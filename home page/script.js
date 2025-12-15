// Subscribe functions
function toggleSubscribe() {
  const widget = document.getElementById("subscribeWidget");
  if (widget) {
    widget.classList.toggle("active");
  }
}

async function subscribe() {
  const success = document.getElementById("subscribeSuccess");
  const input = document.querySelector(".subscribe-input");

  if (!input || !input.value.trim()) {
    return;
  }

  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    if (success) {
      success.textContent = "✗ Geçerli bir e-posta adresi giriniz.";
      success.style.color = "#ff6b6b";
      success.style.display = "block";
      setTimeout(() => {
        success.style.display = "none";
      }, 3000);
    }
    return;
  }

  // API'ye gönder
  // Production'da otomatik olarak backend URL'ini kullanır
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : "/api"; // Aynı domain'de ise relative path kullan

  try {
    const response = await fetch(`${API_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    if (data.success) {
      if (success) {
        success.textContent = "✓ " + data.message;
        success.style.color = "#00ffd5";
        success.style.display = "block";
      }
      input.value = "";
    } else {
      if (success) {
        success.textContent = "✗ " + data.message;
        success.style.color = "#ff6b6b";
        success.style.display = "block";
        setTimeout(() => {
          success.style.display = "none";
        }, 3000);
      }
    }
  } catch (error) {
    console.error("Subscribe error:", error);
    if (success) {
      success.textContent = "✗ Bağlantı hatası. Lütfen tekrar deneyin.";
      success.style.color = "#ff6b6b";
      success.style.display = "block";
      setTimeout(() => {
        success.style.display = "none";
      }, 3000);
    }
  }
}

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

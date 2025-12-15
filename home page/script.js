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

// Newsletter Form Handler - Google Sheets Integration
const newsletterForm = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email-input");
const formMessage = document.getElementById("form-message");

// ⚠️ ÖNEMLİ: Google Apps Script Web App URL'inizi buraya ekleyin
// Google Sheets için Apps Script oluşturduktan sonra Web App URL'ini buraya yapıştırın
const GOOGLE_SCRIPT_URL =
  "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const submitBtn = newsletterForm.querySelector(".submit-btn");

    // Validation
    if (!email || !email.includes("@")) {
      showMessage("Lütfen geçerli bir e-posta adresi girin!", "error");
      return;
    }

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

    try {
      // Send data to Google Sheets via Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // CORS için no-cors kullanıyoruz
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
        }),
      });

      // no-cors mode'da response göremiyoruz, bu yüzden her zaman başarılı sayıyoruz
      // Gerçek uygulamada Apps Script'te hata kontrolü yapılmalı
      showMessage(
        "✅ Kayıt başarılı! Güncellemelerden haberdar olacaksınız.",
        "success"
      );
      emailInput.value = "";
    } catch (error) {
      console.error("Error:", error);
      showMessage(
        "❌ Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kayıt Ol';
    }
  });
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none";
    formMessage.className = "form-message";
  }, 5000);
}

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

// Newsletter kayıtlarını localStorage'da sakla
const STORAGE_KEY = "newsletter_subscribers";

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const submitBtn = newsletterForm.querySelector(".submit-btn");

    // Validation
    if (!email || !email.includes("@")) {
      showMessage("Lütfen geçerli bir e-posta adresi girin!", "error");
      return;
    }

    // Mevcut kayıtları kontrol et
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const emailExists = existingData.some((item) => item.email === email);

    if (emailExists) {
      showMessage("Bu e-posta adresi zaten kayıtlı!", "error");
      emailInput.value = "";
      return;
    }

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

    try {
      // Yeni kayıt oluştur
      const now = new Date();
      const date = now.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const time = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newRecord = {
        id: Date.now(),
        email: email,
        date: date,
        time: time,
        timestamp: now.toISOString(),
      };

      // Kayıtları localStorage'a ekle
      existingData.push(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));

      // Debug: localStorage'ı kontrol et (sadece console'da)
      console.log("✅ Newsletter kaydı eklendi:", email);
      console.log("📊 Toplam kayıt sayısı:", existingData.length);

      // Sessizce kaydet - mesaj gösterme (canlıya alınca gerçek mail sistemi çalışacak)
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

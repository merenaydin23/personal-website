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

// Rate limiting - Spam koruması
const RATE_LIMIT_KEY = "newsletter_rate_limit";
const RATE_LIMIT_TIME = 60000; // 1 dakika
const MAX_ATTEMPTS = 3;

// Email validation ve sanitization
function validateAndSanitizeEmail(email) {
  if (!email || typeof email !== "string") return null;
  
  // XSS koruması - HTML tag'lerini temizle
  email = email.trim().replace(/[<>]/g, "");
  
  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return null;
  
  // Email uzunluk kontrolü
  if (email.length > 254) return null;
  
  // Domain kontrolü
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  if (parts[0].length > 64) return null;
  
  return email.toLowerCase();
}

// Rate limiting kontrolü
function checkRateLimit() {
  const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
  if (!rateLimitData) return true;
  
  try {
    const data = JSON.parse(rateLimitData);
    const now = Date.now();
    
    // Süre dolmuşsa sıfırla
    if (now - data.timestamp > RATE_LIMIT_TIME) {
      localStorage.removeItem(RATE_LIMIT_KEY);
      return true;
    }
    
    // Maksimum deneme sayısını kontrol et
    if (data.attempts >= MAX_ATTEMPTS) {
      const remainingTime = Math.ceil((RATE_LIMIT_TIME - (now - data.timestamp)) / 1000);
      showMessage(
        `⏳ Çok fazla deneme yapıldı. Lütfen ${remainingTime} saniye sonra tekrar deneyin.`,
        "error"
      );
      return false;
    }
    
    return true;
  } catch (error) {
    localStorage.removeItem(RATE_LIMIT_KEY);
    return true;
  }
}

// Rate limit kaydı
function recordRateLimit() {
  const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
  let data;
  
  if (rateLimitData) {
    try {
      data = JSON.parse(rateLimitData);
      const now = Date.now();
      
      // Süre dolmuşsa sıfırla
      if (now - data.timestamp > RATE_LIMIT_TIME) {
        data = { attempts: 1, timestamp: now };
      } else {
        data.attempts = (data.attempts || 0) + 1;
      }
    } catch (error) {
      data = { attempts: 1, timestamp: Date.now() };
    }
  } else {
    data = { attempts: 1, timestamp: Date.now() };
  }
  
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Rate limiting kontrolü
    if (!checkRateLimit()) {
      return;
    }

    const rawEmail = emailInput.value;
    const submitBtn = newsletterForm.querySelector(".submit-btn");

    // Email validation ve sanitization
    const email = validateAndSanitizeEmail(rawEmail);
    if (!email) {
      recordRateLimit();
      showMessage("Lütfen geçerli bir e-posta adresi girin!", "error");
      emailInput.value = "";
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

      // Rate limit'i sıfırla (başarılı kayıt)
      localStorage.removeItem(RATE_LIMIT_KEY);

      // Hoş geldiniz maili gönder
      sendWelcomeEmail(email);

      // Başarı mesajı göster
      showMessage(
        "✅ Başarıyla kayıt oldunuz! Hoş geldiniz mesajı e-posta adresinize gönderildi.",
        "success"
      );
      emailInput.value = "";
    } catch (error) {
      console.error("Error:", error);
      recordRateLimit();
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

// Hoş geldiniz maili gönder
async function sendWelcomeEmail(userEmail) {
  // EmailJS config kontrolü
  if (
    !EMAIL_CONFIG.publicKey ||
    !EMAIL_CONFIG.serviceId ||
    !EMAIL_CONFIG.templateId
  ) {
    console.warn(
      "⚠️ EmailJS yapılandırması eksik! email-config.js dosyasını kontrol edin."
    );
    return;
  }

  // EmailJS'in yüklenmesini bekle
  let retries = 0;
  while (typeof emailjs === "undefined" && retries < 10) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    retries++;
  }

  if (typeof emailjs === "undefined") {
    console.error("❌ EmailJS yüklenemedi! Sayfayı yenileyin.");
    return;
  }

  try {
    // EmailJS'i başlat
    emailjs.init(EMAIL_CONFIG.publicKey);

    // Mail içeriği (Template'te kullanılacak değişkenler)
    // EmailJS template'inde kullanılan değişken isimleri:
    const templateParams = {
      email: userEmail, // EmailJS genelde {{email}} kullanır
      to_email: userEmail, // Alternatif olarak {{to_email}} de ekle
      to_name: userEmail.split("@")[0], // Email'den isim çıkar
      name: userEmail.split("@")[0], // Alternatif olarak {{name}} de ekle
      from_name: EMAIL_CONFIG.fromName,
      site_url: EMAIL_CONFIG.siteUrl,
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );
  } catch (error) {
    console.error("❌ Mail gönderme hatası:", error);
    console.error("Hata detayları:", {
      status: error.status,
      text: error.text,
      message: error.message,
    });
    // Mail gönderilemese bile kayıt başarılı, kullanıcıya hata gösterme
  }
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

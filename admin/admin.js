// Admin Panel JavaScript - Optimized
// Config dosyasından ayarları alır

// Config kontrolü
if (typeof CONFIG === "undefined") {
  console.error(
    "❌ CONFIG yüklenemedi! config.js dosyasının yüklendiğinden emin olun."
  );
  alert("HATA: Admin paneli yapılandırması yüklenemedi!");
}

// Config'den ayarları al
const ADMIN_PASSWORD = CONFIG ? CONFIG.adminPassword : "admin123";
const STORAGE_KEY = CONFIG ? CONFIG.storageKey : "newsletter_subscribers";
const DEBUG_MODE = CONFIG ? CONFIG.debug : true;

// Brute force koruması
const BRUTE_FORCE_KEY = "admin_brute_force";
const BRUTE_FORCE_LOCK_TIME = 15 * 60 * 1000; // 15 dakika
const MAX_FAILED_ATTEMPTS = 5;

// Debug log fonksiyonu
function debugLog(...args) {
  if (DEBUG_MODE) console.log(...args);
}

// Brute force kontrolü
function checkBruteForce() {
  const bruteForceData = localStorage.getItem(BRUTE_FORCE_KEY);
  if (!bruteForceData) return true;

  try {
    const data = JSON.parse(bruteForceData);
    const now = Date.now();

    // Süre dolmuşsa sıfırla
    if (now - data.timestamp > BRUTE_FORCE_LOCK_TIME) {
      localStorage.removeItem(BRUTE_FORCE_KEY);
      return true;
    }

    // Maksimum deneme sayısını kontrol et
    if (data.attempts >= MAX_FAILED_ATTEMPTS) {
      const remainingMinutes = Math.ceil(
        (BRUTE_FORCE_LOCK_TIME - (now - data.timestamp)) / 60000
      );
      showErrorMessage(
        `🔒 Çok fazla başarısız deneme! Lütfen ${remainingMinutes} dakika sonra tekrar deneyin.`
      );
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem(BRUTE_FORCE_KEY);
    return true;
  }
}

// Başarısız deneme kaydı
function recordFailedAttempt() {
  const bruteForceData = localStorage.getItem(BRUTE_FORCE_KEY);
  let data;

  if (bruteForceData) {
    try {
      data = JSON.parse(bruteForceData);
      const now = Date.now();

      // Süre dolmuşsa sıfırla
      if (now - data.timestamp > BRUTE_FORCE_LOCK_TIME) {
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

  localStorage.setItem(BRUTE_FORCE_KEY, JSON.stringify(data));
}

// Başarılı giriş - brute force kaydını sıfırla
function clearBruteForce() {
  localStorage.removeItem(BRUTE_FORCE_KEY);
}

// DOM Elements cache
let loginScreen, adminPanel, loginForm, passwordInput, messageDiv;
let logoutBtn, refreshBtn, exportBtn, clearBtn, testBtn;
let dataTableBody, totalCount, todayCount;

// DOM elementlerini al
function initDOM() {
  loginScreen = document.getElementById("login-screen");
  adminPanel = document.getElementById("admin-panel");
  loginForm = document.getElementById("login-form");
  passwordInput = document.getElementById("admin-password");
  messageDiv = document.getElementById("login-message");
  logoutBtn = document.getElementById("logout-btn");
  refreshBtn = document.getElementById("refresh-btn");
  exportBtn = document.getElementById("export-btn");
  clearBtn = document.getElementById("clear-btn");
  testBtn = document.getElementById("test-btn");
  dataTableBody = document.getElementById("data-table-body");
  totalCount = document.getElementById("total-count");
  todayCount = document.getElementById("today-count");
}

// Şifre kontrolü ve giriş işlemi
function processLogin(password) {
  // Brute force kontrolü
  if (!checkBruteForce()) {
    return false;
  }

  // XSS koruması - şifrede HTML tag kontrolü
  if (
    password &&
    (password.includes("<") || password.includes(">") || password.includes("&"))
  ) {
    showErrorMessage("❌ Geçersiz karakter! Lütfen tekrar deneyin.");
    return false;
  }

  if (password === ADMIN_PASSWORD) {
    debugLog("✅ Şifre doğru, giriş yapılıyor");
    clearBruteForce(); // Başarılı giriş - brute force kaydını sıfırla
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminLoginTime", Date.now().toString());
    showAdminPanel();
    setTimeout(() => loadData(), 300);
    return true;
  } else {
    debugLog("❌ Yanlış şifre!");
    recordFailedAttempt(); // Başarısız deneme kaydı
    const bruteForceData = localStorage.getItem(BRUTE_FORCE_KEY);
    let attempts = 0;
    if (bruteForceData) {
      try {
        const data = JSON.parse(bruteForceData);
        attempts = data.attempts || 0;
      } catch (e) {}
    }

    if (attempts >= MAX_FAILED_ATTEMPTS) {
      showErrorMessage(
        "🔒 Çok fazla başarısız deneme! Hesap geçici olarak kilitlendi."
      );
    } else {
      showErrorMessage(
        `❌ Yanlış şifre! Kalan deneme hakkı: ${MAX_FAILED_ATTEMPTS - attempts}`
      );
    }
    return false;
  }
}

// Hata mesajı göster
function showErrorMessage(message) {
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = "form-message error";
    messageDiv.style.display = "block";
    setTimeout(() => {
      messageDiv.style.display = "none";
      messageDiv.className = "form-message";
    }, 3000);
  }
}

// Global login handler - HTML'den direkt çağrılabilir
function handleLogin(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  initDOM();
  if (!passwordInput) {
    console.error("❌ Password input bulunamadı!");
    alert("HATA: Şifre alanı bulunamadı!");
    return false;
  }

  const password = passwordInput.value.trim();
  if (processLogin(password)) {
    passwordInput.value = "";
  } else {
    passwordInput.value = "";
    passwordInput.focus();
  }
  return false;
}

// XSS koruması - HTML escape
function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

// Session timeout kontrolü (30 dakika)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika

function checkSessionTimeout() {
  const loginTime = localStorage.getItem("adminLoginTime");
  if (!loginTime) {
    showLoginScreen();
    return false;
  }

  const now = Date.now();
  const sessionAge = now - parseInt(loginTime, 10);

  if (sessionAge > SESSION_TIMEOUT) {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");
    showLoginScreen();
    showErrorMessage("⏰ Oturum süresi doldu. Lütfen tekrar giriş yapın.");
    return false;
  }

  return true;
}

// Admin paneli göster
function showAdminPanel() {
  if (loginScreen) loginScreen.style.display = "none";
  if (adminPanel) adminPanel.style.display = "block";

  // Session timeout kontrolünü başlat
  setInterval(() => {
    if (!checkSessionTimeout()) {
      return;
    }
  }, 60000); // Her 1 dakikada bir kontrol et
}

// Login ekranı göster
function showLoginScreen() {
  if (loginScreen) loginScreen.style.display = "flex";
  if (adminPanel) adminPanel.style.display = "none";
  if (dataTableBody) {
    dataTableBody.innerHTML =
      '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';
  }
}

// Event listeners kurulumu
function setupEventListeners() {
  initDOM();

  // Login form
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      initDOM();
      const password = passwordInput ? passwordInput.value.trim() : "";
      if (processLogin(password)) {
        if (passwordInput) passwordInput.value = "";
      } else {
        if (passwordInput) {
          passwordInput.value = "";
          passwordInput.focus();
        }
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      showLoginScreen();
    });
  }

  // Refresh
  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadData);
  }

  // Export
  if (exportBtn) {
    exportBtn.addEventListener("click", exportToCSV);
  }

  // Clear Data Button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const confirmClear = confirm(
        "⚠️ UYARI: Tüm test verileri silinecek!\n\nCanlıya alınca gerçek mail sistemi çalışacak. Devam etmek istiyor musunuz?"
      );
      if (confirmClear) {
        localStorage.removeItem(STORAGE_KEY);
        loadData();
        alert("✅ Test verileri temizlendi!");
      }
    });
  }

  // Test Button (sadece debug modunda)
  if (testBtn) {
    if (!DEBUG_MODE) {
      testBtn.style.display = "none";
    } else {
      testBtn.addEventListener("click", () => {
        debugLog("🧪 TEST:", {
          STORAGE_KEY,
          hasData: !!localStorage.getItem(STORAGE_KEY),
        });
        loadData();
      });
    }
  }
}

// Google Sheets'ten veri yükle
async function loadDataFromGoogleSheets() {
  if (!CONFIG || !CONFIG.googleSheetsWebAppUrl) {
    return null; // Google Sheets URL yoksa null döndür
  }

  try {
    const url = `${CONFIG.googleSheetsWebAppUrl}?action=getData`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    debugLog("📊 Google Sheets'ten veri yüklendi:", data.length, "kayıt");
    return data;
  } catch (error) {
    console.error("❌ Google Sheets veri yükleme hatası:", error);
    return null; // Hata durumunda null döndür, localStorage'a fallback yapılır
  }
}

// Veri yükleme (önce Google Sheets, yoksa localStorage)
async function loadData() {
  initDOM();

  if (!dataTableBody) {
    console.error("❌ dataTableBody bulunamadı!");
    setTimeout(() => {
      initDOM();
      if (dataTableBody) loadData();
      else alert("HATA: Tablo elementi bulunamadı! Sayfayı yenileyin (F5)");
    }, 500);
    return;
  }

  dataTableBody.innerHTML =
    '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';

  try {
    let data = null;

    // Önce Google Sheets'ten veri yüklemeyi dene
    if (CONFIG && CONFIG.googleSheetsWebAppUrl) {
      debugLog("📦 Google Sheets'ten veri yükleniyor...");
      data = await loadDataFromGoogleSheets();
    }

    // Google Sheets'ten veri gelmediyse localStorage'dan yükle
    if (!data || data.length === 0) {
      debugLog("📦 localStorage'dan veri yükleniyor...");
      const rawData = localStorage.getItem(STORAGE_KEY);
      debugLog("📦 Admin Panel - Veri yükleme:", {
        STORAGE_KEY,
        rawData: rawData ? "Veri var" : "Veri yok",
        rawDataLength: rawData ? rawData.length : 0,
      });

      if (
        !rawData ||
        rawData === "null" ||
        rawData === "undefined" ||
        rawData === ""
      ) {
        debugLog("⚠️ Admin Panel - localStorage'da veri yok");
        displayData([]);
        return;
      }

      data = JSON.parse(rawData);
    }

    debugLog("📊 Admin Panel - Parse edilen veri:", {
      isArray: Array.isArray(data),
      length: data ? data.length : 0,
    });

    if (data && Array.isArray(data) && data.length > 0) {
      displayData(data);
    } else {
      debugLog("⚠️ Admin Panel - Veri boş veya geçersiz");
      displayData([]);
    }
  } catch (error) {
    console.error("❌ Veri yükleme hatası:", error);
    if (dataTableBody) {
      dataTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="error-row">
            <i class="fas fa-exclamation-triangle"></i> Veriler yüklenirken hata oluştu.
            <br><small>${error.message}</small>
          </td>
        </tr>
      `;
    }
  }
}

// Verileri tabloda göster
function displayData(data) {
  initDOM();

  if (!dataTableBody) {
    console.error("❌ dataTableBody bulunamadı!");
    return;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    dataTableBody.innerHTML =
      '<tr><td colspan="4" class="empty-row">Henüz kayıt bulunmuyor.</td></tr>';
    if (totalCount) totalCount.textContent = "0";
    if (todayCount) todayCount.textContent = "0";
    return;
  }

  const today = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const reversedData = [...data].reverse();
  let html = "";

  reversedData.forEach((row, index) => {
    const rowNumber = reversedData.length - index;
    // XSS koruması - Tüm verileri escape et
    html += `
      <tr>
        <td>${escapeHtml(rowNumber)}</td>
        <td>${escapeHtml(row.email || "")}</td>
        <td>${escapeHtml(row.date || "")}</td>
        <td>${escapeHtml(row.time || "")}</td>
      </tr>
    `;
  });

  dataTableBody.innerHTML = html;

  // İstatistikleri güncelle
  if (totalCount) totalCount.textContent = data.length;
  const todayRecords = data.filter((row) => row.date === today).length;
  if (todayCount) todayCount.textContent = todayRecords;
}

// CSV export
function exportToCSV() {
  initDOM();

  if (!dataTableBody) {
    alert("Tablo bulunamadı!");
    return;
  }

  const rows = Array.from(dataTableBody.querySelectorAll("tr"));
  if (rows.length === 0) {
    alert("İndirilecek veri bulunmuyor.");
    return;
  }

  let csv = "Sıra,E-posta,Tarih,Saat\n";
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length === 4) {
      csv += `${cells[0].textContent},${cells[1].textContent},${cells[2].textContent},${cells[3].textContent}\n`;
    }
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `newsletter-kayitlari-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Sayfa yüklendiğinde çalış
function initAdmin() {
  initDOM();

  // Session timeout kontrolü
  if (localStorage.getItem("adminLoggedIn") === "true") {
    if (checkSessionTimeout()) {
      showAdminPanel();
      setTimeout(() => loadData(), 300);

      // Session timeout kontrolünü başlat
      setInterval(() => {
        if (!checkSessionTimeout()) {
          return;
        }
      }, 60000); // Her 1 dakikada bir kontrol et
    } else {
      // Session süresi dolmuş
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      showLoginScreen();
    }
  }

  setupEventListeners();
}

// Event listeners
document.addEventListener("DOMContentLoaded", initAdmin);
window.addEventListener("load", () => {
  initDOM();
  if (localStorage.getItem("adminLoggedIn") === "true") {
    if (checkSessionTimeout()) {
      setTimeout(() => loadData(), 100);
    } else {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      showLoginScreen();
    }
  }
});

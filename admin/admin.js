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

// Debug log fonksiyonu
function debugLog(...args) {
  if (DEBUG_MODE) console.log(...args);
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
  if (password === ADMIN_PASSWORD) {
    debugLog("✅ Şifre doğru, giriş yapılıyor");
    localStorage.setItem("adminLoggedIn", "true");
    showAdminPanel();
    setTimeout(() => loadData(), 300);
    return true;
  } else {
    debugLog("❌ Yanlış şifre!");
    showErrorMessage("❌ Yanlış şifre! Lütfen tekrar deneyin.");
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

// Admin paneli göster
function showAdminPanel() {
  if (loginScreen) loginScreen.style.display = "none";
  if (adminPanel) adminPanel.style.display = "block";
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
        console.log("🧪 TEST:", {
          STORAGE_KEY,
          data: localStorage.getItem(STORAGE_KEY),
          allStorage: { ...localStorage },
        });
        loadData();
      });
    }
  }
}

// Veri yükleme
function loadData() {
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
    const rawData = localStorage.getItem(STORAGE_KEY);
    debugLog("📦 Veri yükleniyor...", rawData ? "Veri bulundu" : "Veri yok");

    if (
      !rawData ||
      rawData === "null" ||
      rawData === "undefined" ||
      rawData === ""
    ) {
      displayData([]);
      return;
    }

    const data = JSON.parse(rawData);
    if (data && Array.isArray(data) && data.length > 0) {
      displayData(data);
    } else {
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
    html += `
      <tr>
        <td>${rowNumber}</td>
        <td>${row.email || ""}</td>
        <td>${row.date || ""}</td>
        <td>${row.time || ""}</td>
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

  if (localStorage.getItem("adminLoggedIn") === "true") {
    showAdminPanel();
    setTimeout(() => loadData(), 300);
  }

  setupEventListeners();
}

// Event listeners
document.addEventListener("DOMContentLoaded", initAdmin);
window.addEventListener("load", () => {
  initDOM();
  if (localStorage.getItem("adminLoggedIn") === "true") {
    setTimeout(() => loadData(), 100);
  }
});


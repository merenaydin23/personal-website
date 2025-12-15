// Admin Panel JavaScript
// ⚠️ ÖNEMLİ: Şifreyi değiştirin!
const ADMIN_PASSWORD = "admin123"; // Bu şifreyi değiştirin!

// Newsletter kayıtları localStorage'dan okunacak
const STORAGE_KEY = "newsletter_subscribers";

// DOM Elements - Sayfa yüklendikten sonra al
let loginScreen, adminPanel, loginForm, adminPasswordInput, loginMessage;
let logoutBtn, refreshBtn, exportBtn, dataTableBody, totalCount, todayCount;

// Sayfa yüklendiğinde çalış
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  loginScreen = document.getElementById("login-screen");
  adminPanel = document.getElementById("admin-panel");
  loginForm = document.getElementById("login-form");
  adminPasswordInput = document.getElementById("admin-password");
  loginMessage = document.getElementById("login-message");
  logoutBtn = document.getElementById("logout-btn");
  refreshBtn = document.getElementById("refresh-btn");
  exportBtn = document.getElementById("export-btn");
  dataTableBody = document.getElementById("data-table-body");
  totalCount = document.getElementById("total-count");
  todayCount = document.getElementById("today-count");

  // Check if already logged in
  if (localStorage.getItem("adminLoggedIn") === "true") {
    console.log("✅ Zaten giriş yapılmış, admin paneli gösteriliyor");
    showAdminPanel();
    // Sayfa yüklendiğinde verileri yükle
    setTimeout(() => {
      console.log("⏰ Veriler yükleniyor...");
      loadData();
    }, 500);
  } else {
    console.log("🔒 Giriş yapılmamış, login ekranı gösteriliyor");
  }

  // Event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Login Form Handler
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = adminPasswordInput.value.trim();

      if (password === ADMIN_PASSWORD) {
        console.log("✅ Şifre doğru, giriş yapılıyor");
        localStorage.setItem("adminLoggedIn", "true");
        showAdminPanel();
        // Giriş yaptıktan sonra verileri yükle
        setTimeout(() => {
          console.log("⏰ Giriş sonrası veriler yükleniyor...");
          loadData();
        }, 500);
        adminPasswordInput.value = "";
      } else {
        showMessage(
          loginMessage,
          "❌ Yanlış şifre! Lütfen tekrar deneyin.",
          "error"
        );
        adminPasswordInput.value = "";
        adminPasswordInput.focus();
      }
    });
  }

  // Logout Handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("adminLoggedIn");
      showLoginScreen();
    });
  }

  // Refresh Button
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadData();
    });
  }

  // Export Button
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      exportToCSV();
    });
  }

  // Test Button
  const testBtn = document.getElementById("test-btn");
  if (testBtn) {
    testBtn.addEventListener("click", () => {
      console.log("🧪 TEST BUTONU TIKLANDI");
      console.log("STORAGE_KEY:", STORAGE_KEY);
      console.log(
        "localStorage.getItem(STORAGE_KEY):",
        localStorage.getItem(STORAGE_KEY)
      );
      console.log("Tüm localStorage:", { ...localStorage });

      const testData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      console.log("Parse edilmiş test verisi:", testData);
      console.log("Veri tipi:", typeof testData);
      console.log("Array mi?", Array.isArray(testData));
      console.log("Uzunluk:", testData.length);

      if (testData.length > 0) {
        console.log("İlk kayıt:", testData[0]);
      }

      // Manuel olarak yükle
      loadData();
    });
  }
}

// Show Admin Panel
function showAdminPanel() {
  loginScreen.style.display = "none";
  adminPanel.style.display = "block";
}

// Show Login Screen
function showLoginScreen() {
  loginScreen.style.display = "flex";
  adminPanel.style.display = "none";
  dataTableBody.innerHTML =
    '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';
}

// Load Data from localStorage
function loadData() {
  if (!dataTableBody) {
    console.error("❌ dataTableBody bulunamadı!");
    return;
  }

  dataTableBody.innerHTML =
    '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';

  // Kısa bir gecikme ile DOM'un hazır olduğundan emin ol
  setTimeout(() => {
    try {
      // localStorage'dan verileri oku
      const rawData = localStorage.getItem(STORAGE_KEY);
      console.log("🔍 STORAGE_KEY:", STORAGE_KEY);
      console.log("📦 localStorage'dan okunan ham veri:", rawData);
      
      // Tüm localStorage anahtarlarını göster
      console.log("📊 Tüm localStorage anahtarları:", Object.keys(localStorage));
      
      // Her anahtarı kontrol et
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`🔑 Key[${i}]: ${key} = ${localStorage.getItem(key)?.substring(0, 100)}...`);
      }

      if (!rawData || rawData === "null" || rawData === "undefined" || rawData === "") {
        console.log("⚠️ Veri bulunamadı veya boş, boş array kullanılıyor");
        displayData([]);
        return;
      }

      const data = JSON.parse(rawData);
      console.log("✅ Parse edilmiş veri:", data);
      console.log("📈 Veri sayısı:", data.length);
      console.log("📋 Veri içeriği:", JSON.stringify(data, null, 2));

      if (data && Array.isArray(data) && data.length > 0) {
        console.log("✅ Veriler bulundu, tabloya yazılıyor...");
        displayData(data);
      } else {
        console.log("⚠️ Veri array değil veya boş");
        displayData([]);
      }
    } catch (error) {
      console.error("❌ Error loading data:", error);
      console.error("Error stack:", error.stack);
      if (dataTableBody) {
        dataTableBody.innerHTML = `
          <tr>
            <td colspan="4" class="error-row">
              <i class="fas fa-exclamation-triangle"></i> Veriler yüklenirken hata oluştu.
              <br><small>${error.message}</small>
              <br><small>Console'u kontrol edin (F12)</small>
            </td>
          </tr>
        `;
      }
    }
  }, 200);
}

// Display Data in Table
function displayData(data) {
  console.log("🎨 displayData çağrıldı, veri:", data);

  if (!dataTableBody) {
    console.error("dataTableBody bulunamadı!");
    return;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log("📭 Veri yok, boş mesaj gösteriliyor");
    dataTableBody.innerHTML =
      '<tr><td colspan="4" class="empty-row">Henüz kayıt bulunmuyor.</td></tr>';
    if (totalCount) totalCount.textContent = "0";
    if (todayCount) todayCount.textContent = "0";
    return;
  }

  // Reverse to show newest first
  const reversedData = [...data].reverse();

  let html = "";
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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

  // Update stats
  totalCount.textContent = data.length;
  const todayRecords = data.filter((row) => row.date === today).length;
  todayCount.textContent = todayRecords;
}

// Export to CSV
function exportToCSV() {
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
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `newsletter-kayitlari-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Show Message
function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message ${type}`;
  element.style.display = "block";

  setTimeout(() => {
    element.style.display = "none";
    element.className = "form-message";
  }, 3000);
}

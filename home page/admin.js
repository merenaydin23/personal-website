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
    showAdminPanel();
    // Sayfa yüklendiğinde verileri yükle
    setTimeout(() => {
      loadData();
    }, 100);
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
        localStorage.setItem("adminLoggedIn", "true");
        showAdminPanel();
        // Giriş yaptıktan sonra verileri yükle
        setTimeout(() => {
          loadData();
        }, 100);
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
  dataTableBody.innerHTML =
    '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';

  try {
    // localStorage'dan verileri oku
    const rawData = localStorage.getItem(STORAGE_KEY);
    console.log("localStorage'dan okunan veri:", rawData);
    
    const data = JSON.parse(rawData || "[]");
    console.log("Parse edilmiş veri:", data);
    console.log("Veri sayısı:", data.length);
    
    displayData(data);
  } catch (error) {
    console.error("Error loading data:", error);
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

// Display Data in Table
function displayData(data) {
  if (!data || !data.length) {
    dataTableBody.innerHTML =
      '<tr><td colspan="4" class="empty-row">Henüz kayıt bulunmuyor.</td></tr>';
    totalCount.textContent = "0";
    todayCount.textContent = "0";
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

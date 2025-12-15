// Admin Panel JavaScript
// ⚠️ ÖNEMLİ: Şifreyi değiştirin!
const ADMIN_PASSWORD = "admin123"; // Bu şifreyi değiştirin!

// Google Sheets API URL (read-only için)
// Google Apps Script'te doGet fonksiyonu ile verileri JSON olarak döndürmelisiniz
const GOOGLE_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbwPTDos3jCiAk3_S4taASg_6uPBg1ChFSjrDQd0uHRNfnv_GSWhGAswbwcQoIsudci7/exec";

// DOM Elements
const loginScreen = document.getElementById("login-screen");
const adminPanel = document.getElementById("admin-panel");
const loginForm = document.getElementById("login-form");
const adminPasswordInput = document.getElementById("admin-password");
const loginMessage = document.getElementById("login-message");
const logoutBtn = document.getElementById("logout-btn");
const refreshBtn = document.getElementById("refresh-btn");
const exportBtn = document.getElementById("export-btn");
const dataTableBody = document.getElementById("data-table-body");
const totalCount = document.getElementById("total-count");
const todayCount = document.getElementById("today-count");

// Check if already logged in
if (localStorage.getItem("adminLoggedIn") === "true") {
  showAdminPanel();
  loadData();
}

// Login Form Handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = adminPasswordInput.value.trim();

  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    showAdminPanel();
    loadData();
    adminPasswordInput.value = "";
  } else {
    showMessage(loginMessage, "❌ Yanlış şifre! Lütfen tekrar deneyin.", "error");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }
});

// Logout Handler
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminLoggedIn");
  showLoginScreen();
});

// Refresh Button
refreshBtn.addEventListener("click", () => {
  loadData();
});

// Export Button
exportBtn.addEventListener("click", () => {
  exportToCSV();
});

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

// Load Data from Google Sheets
async function loadData() {
  dataTableBody.innerHTML =
    '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';

  try {
    // Google Apps Script'ten veri çekme
    // Not: Google Apps Script'te doGet fonksiyonunu güncellemeniz gerekecek
    const response = await fetch(GOOGLE_SHEETS_API_URL + "?action=getData", {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }

    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error loading data:", error);
    dataTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="error-row">
          <i class="fas fa-exclamation-triangle"></i> Veriler yüklenirken hata oluştu.
          <br><small>Google Apps Script'te doGet fonksiyonunu kontrol edin.</small>
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
  let today = new Date().toLocaleDateString("tr-TR");

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
  link.setAttribute("download", `newsletter-kayitlari-${new Date().toISOString().split("T")[0]}.csv`);
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

// Admin Panel JavaScript
// ⚠️ ÖNEMLİ: Şifreyi değiştirin!
const ADMIN_PASSWORD = "admin123"; // Bu şifreyi değiştirin!

// Newsletter kayıtları localStorage'dan okunacak
const STORAGE_KEY = "newsletter_subscribers";

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
    showMessage(
      loginMessage,
      "❌ Yanlış şifre! Lütfen tekrar deneyin.",
      "error"
    );
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

// Load Data from localStorage
function loadData() {
  dataTableBody.innerHTML =
    '<tr><td colspan="4" class="loading-row"><i class="fas fa-spinner fa-spin"></i> Veriler yükleniyor...</td></tr>';

  try {
    // localStorage'dan verileri oku
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    displayData(data);
  } catch (error) {
    console.error("Error loading data:", error);
    dataTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="error-row">
          <i class="fas fa-exclamation-triangle"></i> Veriler yüklenirken hata oluştu.
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

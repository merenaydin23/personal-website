// Admin Panel Configuration
// Production ve Development ortamları için ayarlar

const CONFIG = {
  // Ortam: 'development' veya 'production'
  environment: "development", // Canlıya alırken 'production' yapın

  // Google Sheets Web App URL (Production'da değiştirin)
  googleSheetsWebAppUrl: "", // Production'da buraya Web App URL'inizi yazın

  // Admin şifresi (Production'da mutlaka değiştirin!)
  adminPassword: "admin123", // ⚠️ CANLIYA ALMADAN ÖNCE DEĞİŞTİRİN!

  // localStorage key
  storageKey: "newsletter_subscribers",

  // Debug mode (Production'da false yapın)
  debug: true,

  // API timeout (ms)
  apiTimeout: 10000,
};

// Production kontrolü
if (CONFIG.environment === "production") {
  CONFIG.debug = false;

  // Production'da şifre kontrolü
  if (CONFIG.adminPassword === "admin123") {
    console.warn(
      "⚠️ UYARI: Production ortamında varsayılan şifre kullanılıyor! Güvenlik riski!"
    );
  }

  // Production'da Web App URL kontrolü
  if (!CONFIG.googleSheetsWebAppUrl) {
    console.error(
      "❌ HATA: Production ortamında Google Sheets Web App URL tanımlanmamış!"
    );
  }
}

// Export config
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}

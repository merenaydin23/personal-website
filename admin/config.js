// Admin Panel Configuration
// Production ve Development ortamları için ayarlar

const CONFIG = {
  // Ortam: 'development' veya 'production'
  environment: "production", // Canlıya alırken 'production' yapın

  // Google Sheets Web App URL (Production'da değiştirin)
  googleSheetsWebAppUrl: "", // Production'da buraya Web App URL'inizi yazın

  // Admin şifresi (Production'da mutlaka değiştirin!)
  adminPassword: "2386387.gS", // ⚠️ CANLIYA ALMADAN ÖNCE DEĞİŞTİRİN!

  // localStorage key
  storageKey: "newsletter_subscribers",

  // Debug mode (Production'da false yapın)
  debug: false, // Production'da false - sadece development'ta true yapın

  // API timeout (ms)
  apiTimeout: 10000,
};

// Production kontrolü
if (CONFIG.environment === "production") {
  CONFIG.debug = false;

  // Production'da şifre kontrolü (sadece development'ta uyarı göster)
  // Production'da console.warn güvenlik riski oluşturabilir
  // if (CONFIG.adminPassword === "admin123") {
  //   console.warn(
  //     "⚠️ UYARI: Production ortamında varsayılan şifre kullanılıyor! Güvenlik riski!"
  //   );
  // }

  // Production'da Web App URL kontrolü (opsiyonel - sadece kullanılıyorsa)
  // Google Sheets kullanmıyorsanız bu kontrolü görmezden gelebilirsiniz
  // if (!CONFIG.googleSheetsWebAppUrl) {
  //   console.warn(
  //     "⚠️ NOT: Google Sheets Web App URL tanımlanmamış. Newsletter kayıtları localStorage'da saklanıyor."
  //   );
  // }
}

// Export config
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}

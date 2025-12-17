// EmailJS Configuration
// EmailJS hesabınızdan alacağınız bilgileri buraya ekleyin
// https://www.emailjs.com/

const EMAIL_CONFIG = {
  // EmailJS Public Key
  publicKey: "OuZgLsn6Uj_OYNfld", // EmailJS hesabınızdan alın (Public Key) - Account > API Keys

  // EmailJS Service ID
  serviceId: "service_837jusb", // EmailJS servis ID'niz

  // EmailJS Template ID
  templateId: "template_42zi0mn", // Hoş geldiniz maili için template ID

  // Gönderen email (EmailJS'te ayarladığınız email)
  fromEmail: "muhammederenaydin7@gmail.com", // EmailJS'te bağladığınız email

  // Gönderen isim
  fromName: "Muhammed Eren Aydın",

  // Site URL
  siteUrl: "https://muhammederenaydin.com", // Canlı domain
};

// EmailJS yüklendi mi kontrol et (sadece development'ta uyarı göster)
if (typeof emailjs === "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
  console.warn("⚠️ EmailJS yüklenmedi! Email gönderimi çalışmayacak.");
}

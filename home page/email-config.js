// EmailJS Configuration
// EmailJS hesabınızdan alacağınız bilgileri buraya ekleyin
// https://www.emailjs.com/

const EMAIL_CONFIG = {
  // EmailJS Public Key
  publicKey: "", // EmailJS hesabınızdan alın (Public Key)

  // EmailJS Service ID
  serviceId: "", // EmailJS servis ID'niz

  // EmailJS Template ID
  templateId: "", // Hoş geldiniz maili için template ID

  // Gönderen email (EmailJS'te ayarladığınız email)
  fromEmail: "muhammederenaydin7@gmail.com", // EmailJS'te bağladığınız email
  
  // Gönderen isim
  fromName: "Muhammed Eren Aydın",
  
  // Site URL
  siteUrl: "https://muhammederenaydin.com", // Canlı domain
};

// EmailJS yüklendi mi kontrol et
if (typeof emailjs === "undefined") {
  console.warn("⚠️ EmailJS yüklenmedi! Email gönderimi çalışmayacak.");
}

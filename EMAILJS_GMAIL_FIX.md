# 🔧 EmailJS Gmail Bağlantı Hatası Çözümü

## ❌ Hata: 412 - Invalid grant. Please reconnect your Gmail account

Bu hata, EmailJS'in Gmail hesabınızla bağlantısının kopmuş olduğunu gösterir.

## ✅ Çözüm Adımları

### 1. EmailJS Dashboard'a Giriş Yapın
- https://dashboard.emailjs.com/ adresine gidin
- Hesabınıza giriş yapın

### 2. Email Services Bölümüne Gidin
- Sol menüden **"Email Services"** seçeneğine tıklayın
- Gmail servisinizi bulun (Service ID: `service_837jusb`)

### 3. Gmail Servisini Yeniden Bağlayın
- Gmail servisinizin yanındaki **"Reconnect"** veya **"Edit"** butonuna tıklayın
- Gmail hesabınızı yeniden yetkilendirin
- İzinleri onaylayın

### 4. Test Edin
- Servis bağlantısı tamamlandıktan sonra test email gönderin
- Web sitenizdeki newsletter formunu test edin

## 🔍 Hata Kontrolü

Eğer hata devam ederse:

1. **Service ID Kontrolü:**
   - `home page/email-config.js` dosyasında `serviceId: "service_837jusb"` doğru mu kontrol edin

2. **Template ID Kontrolü:**
   - `home page/email-config.js` dosyasında `templateId: "template_42zi0mn"` doğru mu kontrol edin

3. **Public Key Kontrolü:**
   - EmailJS Dashboard > Account > API Keys
   - `home page/email-config.js` dosyasındaki `publicKey` ile eşleşiyor mu kontrol edin

## 📝 Notlar

- Gmail bağlantısı genellikle şu durumlarda kopar:
  - Şifre değişikliği
  - 2FA (İki faktörlü doğrulama) ayarları değişikliği
  - Uzun süre kullanılmama
  - Google güvenlik ayarları değişikliği

- Bağlantıyı yeniledikten sonra birkaç dakika bekleyin, değişikliklerin yayılması zaman alabilir.

## 🆘 Hala Çalışmıyorsa

1. EmailJS Dashboard'da servis durumunu kontrol edin
2. Gmail hesabınızın aktif olduğundan emin olun
3. EmailJS destek ekibiyle iletişime geçin: https://www.emailjs.com/support/

---

**Son Güncelleme:** Gmail bağlantı hatası için otomatik tespit ve loglama eklendi.

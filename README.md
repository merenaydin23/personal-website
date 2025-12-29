# 🌐 Muhammed Eren Aydın - Personal Website

Modern, responsive ve SEO uyumlu kişisel web sitesi. Projeler, blog ve newsletter sistemi içeren tam özellikli bir portföy sitesi.

## ✨ Özellikler

- 🏠 **Ana Sayfa**: Profil, hakkımda bölümü ve sosyal medya bağlantıları
- 📁 **Projeler Sayfası**: GitHub projelerinin detaylı gösterimi
- 📝 **Blog & Apps**: Blog yazıları ve mini uygulamalar
- 📧 **Newsletter Sistemi**: EmailJS ile e-posta kayıt sistemi
- 🔐 **Admin Panel**: Newsletter kayıtlarını görüntüleme ve yönetim paneli
- 📊 **Google Sheets Entegrasyonu**: Merkezi veri depolama
- 🎨 **Modern UI**: Glassmorphism efektleri ve responsive tasarım
- 🔒 **Güvenlik**: Production-ready güvenlik ayarları

## 🚀 Teknolojiler

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Email**: EmailJS v4
- **Storage**: Google Sheets API (Google Apps Script)
- **Deployment**: Vercel
- **Icons**: Font Awesome 6.5

## 📁 Proje Yapısı

```
personal-website/
├── home page/              # Ana sayfa dosyaları
│   ├── index.html         # Ana sayfa
│   ├── projects.html      # Projeler sayfası
│   ├── blog.html          # Blog & Apps sayfası
│   ├── style.css          # Ana stil dosyası
│   ├── script.js          # Ana JavaScript dosyası
│   ├── blog.js            # Blog JavaScript
│   ├── email-config.js    # EmailJS yapılandırması
│   ├── profile.jpg        # Profil fotoğrafı
│   └── favicon.svg        # Site ikonu
├── admin/                 # Admin panel
│   ├── index.html         # Admin panel ana sayfası
│   ├── admin.js           # Admin panel JavaScript
│   ├── admin.css          # Admin panel stilleri
│   ├── config.js          # Admin yapılandırması
│   └── README.md          # Admin panel dokümantasyonu
├── vercel.json            # Vercel routing yapılandırması
├── _redirects             # Vercel redirects
├── sitemap.xml           # SEO sitemap
├── robots.txt            # SEO robots.txt
├── google-apps-script-code.js  # Google Sheets Apps Script kodu
└── README.md              # Bu dosya
```

## 🛠️ Kurulum

### 1. Repository'yi Klonlayın

```bash
git clone https://github.com/merenaydin23/personal-website.git
cd personal-website
```

### 2. EmailJS Yapılandırması

`home page/email-config.js` dosyasını düzenleyin:

```javascript
const EMAIL_CONFIG = {
  serviceID: "YOUR_SERVICE_ID",
  templateID: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
  googleSheetsWebAppUrl: "YOUR_GOOGLE_SHEETS_WEB_APP_URL",
};
```

### 3. Admin Panel Yapılandırması

`admin/config.js` dosyasını düzenleyin:

```javascript
const CONFIG = {
  adminPassword: "GÜÇLÜ_ŞİFRENİZ", // ⚠️ MUTLAKA DEĞİŞTİRİN!
  storageKey: "newsletter_subscribers",
  debug: false, // Production'da false
  googleSheetsWebAppUrl: "YOUR_GOOGLE_SHEETS_WEB_APP_URL",
};
```

### 4. Google Sheets Entegrasyonu (Opsiyonel)

Google Sheets entegrasyonu için:

1. Google Sheets'te yeni bir sayfa oluşturun (A1: Email, B1: Tarih, C1: Saat)
2. Google Sheets'te **Uzantılar > Apps Script** menüsüne gidin
3. `google-apps-script-code.js` dosyasındaki kodu Apps Script editörüne yapıştırın
4. **Kaydet** butonuna tıklayın
5. **Dağıt > Yeni dağıtım > Web uygulaması** seçin
6. **Erişebilenler**: "Herkes" seçin
7. **Dağıt** butonuna tıklayın ve Web App URL'ini kopyalayın
8. Web App URL'ini `email-config.js` ve `admin/config.js` dosyalarına ekleyin

**Not:** Admin panel detayları için `admin/README.md` dosyasına bakın.

## 🌐 Deployment

### Vercel ile Deploy

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "Add New Project" butonuna tıklayın
3. GitHub repository'nizi seçin ve import edin
4. **Framework Preset**: Other
5. **Root Directory**: `personal-website` (eğer repo root'ta değilse)
6. "Deploy" butonuna tıklayın

### Custom Domain

1. Vercel Dashboard > Project Settings > Domains
2. Custom domain ekleyin
3. DNS ayarlarını yapın (Vercel size talimat verecek)

## 📍 URL Yapısı

- Ana Sayfa: `https://muhammederenaydin.com/`
- Projeler: `https://muhammederenaydin.com/projects`
- Blog: `https://muhammederenaydin.com/blog`
- Admin Panel: `https://muhammederenaydin.com/admin`

## 🔒 Güvenlik

- ✅ Production-ready güvenlik başlıkları (CSP, XSS Protection, etc.)
- ✅ Admin panel şifre koruması
- ✅ Brute force koruması
- ✅ Session timeout (30 dakika)
- ✅ XSS koruması
- ✅ Console log'lar production'da gizli

## 📧 Newsletter Sistemi

Newsletter sistemi EmailJS ve Google Sheets kullanarak çalışır:

1. Kullanıcı e-posta adresini girer
2. EmailJS ile hoş geldin e-postası gönderilir
3. Veri Google Sheets'e kaydedilir (merkezi depolama)
4. Admin panelden tüm kayıtlar görüntülenebilir

## 🎨 Özelleştirme

### Renkler ve Stiller

`home page/style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #357abd;
  /* ... */
}
```

### İçerik

- Ana sayfa: `home page/index.html`
- Projeler: `home page/projects.html`
- Blog: `home page/blog.html`

## 📝 Lisans

Bu proje açık kaynaklıdır ve özgürce kullanılabilir.

## 👨‍💻 Geliştirici

**Muhammed Eren Aydın**

- 🌐 Website: [muhammederenaydin.com](https://muhammederenaydin.com)
- 💼 GitHub: [@merenaydin23](https://github.com/merenaydin23)
- 💼 LinkedIn: [muhammederen23](https://www.linkedin.com/in/muhammederen23/)
- 📷 Instagram: [@erenaydinn23](https://www.instagram.com/erenaydinn23)

## 🐛 Sorun Giderme

### Newsletter çalışmıyor

- EmailJS yapılandırmasını kontrol edin
- Browser console'u kontrol edin (F12)
- EmailJS dashboard'da servis bağlantılarını kontrol edin

### Admin paneline erişemiyorum

- URL'nin doğru olduğundan emin olun: `/admin/`
- `admin/config.js` dosyasındaki şifreyi kontrol edin
- Browser cache'ini temizleyin

### Google Sheets entegrasyonu çalışmıyor

- Web App URL'inin doğru olduğundan emin olun
- Google Apps Script'te Web App'in "Herkes" olarak yayınlandığından emin olun
- Browser console'u kontrol edin

## 🔄 Güncelleme Notları

### v2.0.0

- Google Sheets entegrasyonu eklendi
- Production güvenlik ayarları iyileştirildi
- Admin panel geliştirildi
- Newsletter sistemi optimize edildi

### v1.0.0

- İlk sürüm
- Temel sayfalar ve newsletter sistemi

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!



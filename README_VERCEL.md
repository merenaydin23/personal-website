# 🚀 Vercel Deployment Rehberi

## 📋 Vercel'e Deploy Etme Adımları

### 1. GitHub Repository'yi Hazırlayın

- Tüm dosyalarınız GitHub'da olmalı
- Repository public veya private olabilir

### 2. Vercel'e Bağlayın

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "Add New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Import edin

### 3. Build Ayarları

Vercel otomatik olarak static site olarak algılayacak. Ekstra build ayarı gerekmez.

**Framework Preset:** Other
**Root Directory:** `personal-website` (eğer repo root'ta değilse)

### 4. Environment Variables (Gerekirse)

Şu an için environment variable gerekmiyor. Tüm config dosyalarda mevcut.

### 5. Custom Domain Bağlama

1. Vercel Dashboard > Project Settings > Domains
2. Custom domain ekleyin: `muhammederenaydin.com`
3. DNS ayarlarını yapın (Vercel size talimat verecek)

### 6. Deploy

- "Deploy" butonuna tıklayın
- İlk deploy birkaç dakika sürebilir
- Deploy tamamlandıktan sonra siteniz canlıda olacak!

---

## 📁 Dosya Yapısı

```
personal-website/
├── vercel.json          # Vercel routing yapılandırması
├── _redirects           # Vercel redirects
├── home page/           # Ana sayfa dosyaları
│   ├── index.html
│   ├── projects.html
│   ├── blog.html
│   ├── style.css
│   ├── script.js
│   ├── email-config.js
│   └── profile.jpg
├── admin/               # Admin panel
│   ├── index.html
│   ├── admin.js
│   ├── admin.css
│   └── config.js
└── README_VERCEL.md     # Bu dosya
```

---

## 🔗 URL Yapısı

Vercel'de deploy edildikten sonra:

- Ana Sayfa: `https://muhammederenaydin.com/`
- Projects: `https://muhammederenaydin.com/projects`
- Blog: `https://muhammederenaydin.com/blog`
- Admin Panel: `https://muhammederenaydin.com/admin`

---

## ⚙️ Vercel.json Açıklaması

`vercel.json` dosyası şunları yapar:

1. **Rewrites:** URL'leri dosya yollarına yönlendirir
2. **Headers:** Admin panel için SEO koruması ekler
3. **Clean URLs:** `.html` uzantısı olmadan çalışır
4. **Trailing Slash:** URL sonunda `/` olmadan çalışır

---

## ✅ Deploy Sonrası Kontroller

1. **Ana Sayfa:** `https://muhammederenaydin.com/` açılıyor mu?
2. **Projects Sayfası:** `https://muhammederenaydin.com/projects` çalışıyor mu?
3. **Blog Sayfası:** `https://muhammederenaydin.com/blog` çalışıyor mu?
4. **Admin Panel:** `https://muhammederenaydin.com/admin` çalışıyor mu?
5. **Newsletter Formu:** Email gönderimi çalışıyor mu?
6. **Mobil Uyumluluk:** Tüm sayfalar mobilde düzgün görünüyor mu?

---

## 🐛 Sorun Giderme

### CSS/JS Dosyaları Yüklenmiyor

- Dosya yollarının göreceli olduğundan emin olun
- Browser Console'u açın (F12) ve hataları kontrol edin

### 404 Hatası

- `vercel.json` dosyasının root'ta olduğundan emin olun
- Routing ayarlarını kontrol edin

### Admin Panel Erişilemiyor

- `admin/config.js` dosyasında `environment: "production"` olduğundan emin olun
- Şifrenin doğru olduğundan emin olun

---

## 📞 Destek

Sorun yaşarsanız:

1. Vercel Dashboard > Deployments > Logs'u kontrol edin
2. Browser Console'u açın (F12) ve hataları kontrol edin
3. Vercel dokümantasyonunu inceleyin: https://vercel.com/docs

---

**Hazırlayan:** Sistem optimizasyonu tamamlandı ✅


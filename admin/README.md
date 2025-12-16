# 🔐 Admin Panel

Bu klasör admin paneli dosyalarını içerir. Canlıya alırken güvenlik için ayrı tutulmuştur.

## 📁 Dosya Yapısı

```
admin/
├── index.html      # Admin panel ana sayfası
├── admin.css       # Admin panel stilleri
├── admin.js        # Admin panel JavaScript kodu
├── config.js       # Yapılandırma dosyası (şifre, ortam ayarları)
└── README.md        # Bu dosya
```

## 🚀 Canlıya Alma Öncesi Kontrol Listesi

### 1. ⚠️ Şifreyi Değiştirin!

`config.js` dosyasını açın ve şifreyi değiştirin:

```javascript
adminPassword: 'GÜÇLÜ_ŞİFRENİZ_BURAYA', // ⚠️ MUTLAKA DEĞİŞTİRİN!
```

**Güvenlik İpuçları:**

- En az 12 karakter kullanın
- Büyük harf, küçük harf, rakam ve özel karakter karışımı
- Kişisel bilgiler kullanmayın
- Şifreyi güvenli bir yerde saklayın

### 2. 🔧 Ortam Ayarlarını Güncelleyin

`config.js` dosyasında:

```javascript
environment: 'production', // 'development' yerine 'production' yapın
debug: false,              // Production'da false olmalı
```

### 3. 📊 Google Sheets Web App URL

Eğer Google Sheets kullanıyorsanız, `config.js` dosyasına Web App URL'inizi ekleyin:

```javascript
googleSheetsWebAppUrl: 'https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec',
```

## 🌐 Canlıya Alma

### Yöntem 1: Doğrudan Erişim

Admin paneline şu URL ile erişebilirsiniz:

```
https://yourdomain.com/admin/
```

veya

```
https://yourdomain.com/admin/index.html
```

### Yöntem 2: .htaccess ile Korumalı Erişim (Önerilen)

Apache sunucular için `admin/.htaccess` dosyası oluşturun:

```apache
# Admin klasörünü koru
AuthType Basic
AuthName "Admin Panel - Giriş Gerekli"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

**Not:** Bu yöntem için `.htpasswd` dosyası oluşturmanız gerekir.

### Yöntem 3: robots.txt ile Gizleme

`robots.txt` dosyasına ekleyin:

```
User-agent: *
Disallow: /admin/
```

## 🔒 Güvenlik Önerileri

1. ✅ **Şifreyi mutlaka değiştirin** - Varsayılan şifre: `admin123`
2. ✅ **Production'da debug modunu kapatın** - `config.js` içinde `debug: false`
3. ✅ **HTTPS kullanın** - Şifrelerin şifrelenmiş bağlantı üzerinden gönderilmesi
4. ✅ **Admin URL'ini paylaşmayın** - Sadece güvendiğiniz kişilerle paylaşın
5. ✅ **Düzenli yedek alın** - Newsletter kayıtlarını düzenli olarak CSV olarak indirin
6. ✅ **Güncellemeleri takip edin** - Güvenlik güncellemelerini düzenli kontrol edin

## 📝 Kullanım

1. Admin paneline giriş yapın: `https://yourdomain.com/admin/`
2. Şifrenizi girin
3. Newsletter kayıtlarını görüntüleyin
4. İstatistikleri kontrol edin
5. CSV olarak indirin (gerekirse)

## 🐛 Sorun Giderme

### Admin paneline erişemiyorum

- URL'nin doğru olduğundan emin olun: `/admin/` veya `/admin/index.html`
- Dosya yollarının doğru olduğundan emin olun
- Browser console'u kontrol edin (F12)

### Şifre çalışmıyor

- `config.js` dosyasındaki şifreyi kontrol edin
- Şifrede boşluk olmadığından emin olun
- Browser cache'ini temizleyin
- localStorage'ı temizleyin: `localStorage.clear()`

### Veriler görünmüyor

- Browser console'u kontrol edin (F12)
- localStorage'da veri olup olmadığını kontrol edin
- `config.js` dosyasındaki `storageKey` değerini kontrol edin

## 📞 Destek

Sorun yaşarsanız:

1. Browser console'u kontrol edin (F12)
2. Hata mesajlarını not edin
3. `config.js` ayarlarını kontrol edin

## 🔄 Güncelleme Notları

- **v1.0.0** - İlk sürüm, ayrı klasör yapısı
- Admin paneli artık `admin/` klasöründe
- Config dosyası ile yapılandırma yönetimi
- Production/Development ortam desteği

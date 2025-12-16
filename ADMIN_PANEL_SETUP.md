# Admin Panel Kurulum Rehberi

## 📋 Özellikler

- 🔐 Şifre korumalı giriş
- 📊 Newsletter kayıtlarını görüntüleme
- 📈 İstatistikler (Toplam kayıt, bugünkü kayıt)
- 🔄 Verileri yenileme
- 📥 CSV formatında indirme
- 🛡️ Production/Development ortam desteği
- 📁 Ayrı klasör yapısı (canlıya alma için optimize edilmiş)

## 📁 Dosya Yapısı

Admin paneli artık `admin/` klasöründe ayrı tutulmaktadır:

```
admin/
├── index.html      # Admin panel ana sayfası
├── admin.css       # Admin panel stilleri
├── admin.js        # Admin panel JavaScript kodu
├── config.js       # Yapılandırma dosyası (şifre, ortam ayarları)
├── README.md       # Detaylı dokümantasyon
├── .htaccess       # Apache güvenlik ayarları
└── robots.txt      # Arama motoru gizleme
```

## 🔧 Kurulum Adımları

### 1. Google Apps Script'i Güncelleme (Eğer kullanıyorsanız)

1. Google Sheets'te **Uzantılar** > **Apps Script** seçeneğine gidin
2. Mevcut `doGet` fonksiyonunu silin
3. `google-apps-script-code.js` dosyasındaki güncellenmiş `doGet` fonksiyonunu yapıştırın
4. **Kaydet** (Ctrl+S)
5. **Dağıt** > **Dağıtımı yönet** > Mevcut dağıtımı düzenleyin
6. **Sürüm** numarasını artırın (örn: 1 → 2)
7. **Dağıt** butonuna tıklayın
8. Web App URL'ini kopyalayın ve `admin/config.js` dosyasına ekleyin

### 2. Admin Şifresini Değiştirme ⚠️ ÖNEMLİ!

1. `admin/config.js` dosyasını açın
2. Şu satırı bulun:

```javascript
adminPassword: 'admin123', // ⚠️ CANLIYA ALMADAN ÖNCE DEĞİŞTİRİN!
```

3. Şifreyi istediğiniz güçlü bir şifre ile değiştirin
4. **ÖNEMLİ:** Şifreyi güvenli tutun ve kimseyle paylaşmayın!

**Güvenlik İpuçları:**

- En az 12 karakter kullanın
- Büyük harf, küçük harf, rakam ve özel karakter karışımı
- Kişisel bilgiler kullanmayın

### 3. Ortam Ayarlarını Yapılandırma

`admin/config.js` dosyasında:

```javascript
environment: 'development', // Canlıya alırken 'production' yapın
debug: true,               // Production'da false olmalı
```

**Canlıya almadan önce:**

- `environment: 'production'` yapın
- `debug: false` yapın
- `googleSheetsWebAppUrl` (eğer kullanıyorsanız) ekleyin

### 4. Admin Paneline Erişim

1. Web sitenizin URL'sine `/admin/` ekleyin
   - Örnek: `https://yourwebsite.com/admin/`
   - Veya: `https://yourwebsite.com/admin/index.html`
2. Admin şifresini girin
3. Newsletter kayıtlarını görüntüleyin

## 🔒 Güvenlik Notları

- ⚠️ **Şifreyi mutlaka değiştirin!** Varsayılan şifre: `admin123`
- 🔐 Güçlü bir şifre kullanın (en az 12 karakter, harf, rakam, özel karakter)
- 🚫 Admin paneli URL'sini herkese açık paylaşmayın
- 📝 Şifreyi güvenli bir yerde saklayın
- 🔒 Production'da debug modunu kapatın (`config.js` içinde `debug: false`)
- 🌐 HTTPS kullanın (şifrelerin şifrelenmiş bağlantı üzerinden gönderilmesi)
- 🛡️ `.htaccess` dosyası ile ekstra koruma ekleyebilirsiniz (opsiyonel)

## 📊 Veri Görüntüleme

Admin paneli Google Sheets'ten verileri otomatik olarak çeker. Eğer veriler görünmüyorsa:

1. Google Apps Script'te `doGet` fonksiyonunun güncellendiğinden emin olun
2. Web App'in "Herkes" için erişilebilir olduğunu kontrol edin
3. Browser Console'da (F12) hataları kontrol edin

## 🐛 Sorun Giderme

### Veriler görünmüyor

- Google Apps Script'te `doGet` fonksiyonunu kontrol edin
- Web App URL'sinin doğru olduğundan emin olun
- Browser Console'da hataları kontrol edin

### Şifre çalışmıyor

- `admin/config.js` dosyasındaki şifreyi kontrol edin
- Şifrede boşluk olmadığından emin olun
- Browser cache'ini temizleyin
- localStorage'ı temizleyin: `localStorage.clear()`

### CSV indirme çalışmıyor

- Browser'ın pop-up blocker'ını kontrol edin
- Verilerin yüklendiğinden emin olun

## 📝 Notlar

- Admin paneli localStorage kullanarak oturum yönetimi yapar
- Çıkış yapmak için "Çıkış" butonuna tıklayın
- Veriler gerçek zamanlı değildir, "Yenile" butonuna tıklayarak güncelleyin
- Admin paneli artık `admin/` klasöründe ayrı tutulmaktadır
- Detaylı dokümantasyon için `admin/README.md` dosyasına bakın

## 🚀 Canlıya Alma Öncesi Kontrol Listesi

- [ ] `admin/config.js` dosyasında şifreyi değiştirdim
- [ ] `environment: 'production'` yaptım
- [ ] `debug: false` yaptım
- [ ] Google Sheets Web App URL'ini ekledim (eğer kullanıyorsam)
- [ ] `.htaccess` dosyasını kontrol ettim
- [ ] `robots.txt` dosyasını kontrol ettim
- [ ] HTTPS kullanıyorum
- [ ] Admin URL'ini güvenli tutuyorum

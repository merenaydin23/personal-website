# Admin Panel Kurulum Rehberi

## 📋 Özellikler

- 🔐 Şifre korumalı giriş
- 📊 Newsletter kayıtlarını görüntüleme
- 📈 İstatistikler (Toplam kayıt, bugünkü kayıt)
- 🔄 Verileri yenileme
- 📥 CSV formatında indirme

## 🔧 Kurulum Adımları

### 1. Google Apps Script'i Güncelleme

1. Google Sheets'te **Uzantılar** > **Apps Script** seçeneğine gidin
2. Mevcut `doGet` fonksiyonunu silin
3. `google-apps-script-code.js` dosyasındaki güncellenmiş `doGet` fonksiyonunu yapıştırın
4. **Kaydet** (Ctrl+S)
5. **Dağıt** > **Dağıtımı yönet** > Mevcut dağıtımı düzenleyin
6. **Sürüm** numarasını artırın (örn: 1 → 2)
7. **Dağıt** butonuna tıklayın

### 2. Admin Şifresini Değiştirme

1. `admin.js` dosyasını açın
2. Şu satırı bulun:

```javascript
const ADMIN_PASSWORD = "admin123";
```

3. Şifreyi istediğiniz güçlü bir şifre ile değiştirin
4. **ÖNEMLİ:** Şifreyi güvenli tutun ve kimseyle paylaşmayın!

### 3. Admin Paneline Erişim

1. Web sitenizin URL'sine `/admin.html` ekleyin
   - Örnek: `https://yourwebsite.com/admin.html`
   - Veya: `https://yourwebsite.com/home page/admin.html`
2. Admin şifresini girin
3. Newsletter kayıtlarını görüntüleyin

## 🔒 Güvenlik Notları

- ⚠️ **Şifreyi mutlaka değiştirin!** Varsayılan şifre: `admin123`
- 🔐 Güçlü bir şifre kullanın (en az 8 karakter, harf, rakam, özel karakter)
- 🚫 Admin paneli URL'sini herkese açık paylaşmayın
- 📝 Şifreyi güvenli bir yerde saklayın

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

- `admin.js` dosyasındaki şifreyi kontrol edin
- Şifrede boşluk olmadığından emin olun
- Browser cache'ini temizleyin

### CSV indirme çalışmıyor

- Browser'ın pop-up blocker'ını kontrol edin
- Verilerin yüklendiğinden emin olun

## 📝 Notlar

- Admin paneli localStorage kullanarak oturum yönetimi yapar
- Çıkış yapmak için "Çıkış" butonuna tıklayın
- Veriler gerçek zamanlı değildir, "Yenile" butonuna tıklayarak güncelleyin

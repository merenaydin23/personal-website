# 📊 Google Sheets Entegrasyonu Kurulum Rehberi

Bu rehber, newsletter kayıtlarının tüm bilgisayarlardan görünebilmesi için Google Sheets entegrasyonunu kurmanızı sağlar.

## 🎯 Neden Google Sheets?

- ✅ Tüm bilgisayarlardan aynı verileri görürsünüz
- ✅ Veriler merkezi bir yerde saklanır
- ✅ Admin panel her yerden aynı kayıtları gösterir
- ✅ localStorage'a fallback (Google Sheets çalışmazsa)

## 📋 Adım 1: Google Sheets Tablosu Oluşturma

1. [Google Sheets](https://sheets.google.com) adresine gidin
2. Yeni bir tablo oluşturun
3. İlk satıra başlıkları ekleyin:
   - **A1:** `Email`
   - **B1:** `Tarih`
   - **C1:** `Saat`

## 📋 Adım 2: Google Apps Script Oluşturma

1. Google Sheets'te **Uzantılar** > **Apps Script** seçeneğine tıklayın
2. Açılan editöre `google-apps-script-code.js` dosyasındaki kodu yapıştırın
3. Dosyayı kaydedin (Ctrl+S veya Cmd+S)

## 📋 Adım 3: Web App Olarak Yayınlama

1. Apps Script editöründe **Dağıt** > **Yeni dağıtım** seçeneğine tıklayın
2. **Tür seç** açılır menüsünden **Web uygulaması** seçin
3. Ayarları yapın:
   - **Açıklama**: "Newsletter Form API"
   - **Yürütme kimliği**: "Benim olarak yürüt"
   - **Erişebilenler**: "Herkes" (anonim erişim için)
4. **Dağıt** butonuna tıklayın
5. **Web uygulaması URL'sini** kopyalayın (örnek: `https://script.google.com/macros/s/ABC123.../exec`)

## 📋 Adım 4: URL'i Yapılandırmaya Ekleme

### Ana Sayfa İçin:

1. `home page/email-config.js` dosyasını açın
2. `googleSheetsWebAppUrl` değerini güncelleyin:

```javascript
googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
```

### Admin Panel İçin:

1. `admin/config.js` dosyasını açın
2. `googleSheetsWebAppUrl` değerini güncelleyin:

```javascript
googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
```

## ✅ Test Etme

1. Web sitenizde newsletter formunu test edin
2. Bir email adresi ile kayıt olun
3. Google Sheets'te yeni kaydın göründüğünü kontrol edin
4. Admin panelden kayıtları görüntüleyin (tüm bilgisayarlardan aynı veriler görünmeli)

## 🔄 Fallback Mekanizması

- Google Sheets URL'i yoksa veya hata olursa, sistem otomatik olarak localStorage kullanır
- Bu sayede sistem her zaman çalışır
- Google Sheets çalıştığında veriler oraya kaydedilir ve admin panelden görünür

## 🆘 Sorun Giderme

### Google Sheets'e veri kaydedilmiyor

1. Web App URL'inin doğru olduğundan emin olun
2. Web App'in "Herkes" erişimine açık olduğundan emin olun
3. Browser console'da (F12) hata mesajlarını kontrol edin

### Admin panelde veriler görünmüyor

1. Google Sheets'te verilerin olduğundan emin olun
2. Admin panel config'de URL'in doğru olduğundan emin olun
3. Browser console'da (F12) hata mesajlarını kontrol edin

## 📝 Notlar

- Google Sheets ücretsizdir ve günlük 20,000 istek limiti vardır
- Veriler Google hesabınızda güvenli bir şekilde saklanır
- Admin panel her açıldığında Google Sheets'ten verileri çeker

---

**Son Güncelleme:** Google Sheets entegrasyonu eklendi, tüm bilgisayarlardan aynı veriler görünüyor.

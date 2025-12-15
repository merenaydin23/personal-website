# Google Sheets Newsletter Entegrasyonu Kurulum Rehberi

Bu rehber, newsletter formunun Google Sheets'e veri kaydetmesi için gerekli adımları içerir.

## 📋 Adım 1: Google Sheets Tablosu Oluşturma

1. [Google Sheets](https://sheets.google.com) adresine gidin
2. Yeni bir tablo oluşturun
3. İlk satıra başlıkları ekleyin:
   - A1: `Email`
   - B1: `Tarih`
   - C1: `Zaman`

## 📋 Adım 2: Google Apps Script Oluşturma

1. Google Sheets'te **Uzantılar** > **Apps Script** seçeneğine tıklayın
2. Açılan editöre aşağıdaki kodu yapıştırın:

```javascript
function doPost(e) {
  try {
    // Google Sheets'i aç
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Gelen veriyi parse et
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = new Date(data.timestamp);

    // Tarih ve saat formatla
    const date = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      "dd.MM.yyyy"
    );
    const time = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      "HH:mm:ss"
    );

    // Yeni satıra veri ekle
    sheet.appendRow([email, date, time]);

    // Başarılı yanıt döndür
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Email başarıyla kaydedildi" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Hata durumunda
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "Newsletter API is running"
  ).setMimeType(ContentService.MimeType.TEXT);
}
```

## 📋 Adım 3: Web App Olarak Yayınlama

1. Apps Script editöründe **Dağıt** > **Yeni dağıtım** seçeneğine tıklayın
2. **Tür seç** açılır menüsünden **Web uygulaması** seçin
3. Ayarları yapın:
   - **Açıklama**: "Newsletter Form API"
   - **Yürütme kullanıcısı**: "Benim" seçin
   - **Erişim**: "Herkes" seçin (anonim kullanıcılar için)
4. **Dağıt** butonuna tıklayın
5. İlk kez dağıtıyorsanız yetkilendirme isteyecek, **Yetkilendir** butonuna tıklayın
6. Google hesabınızı seçin ve **Gelişmiş** > **Güvenli olmayan sayfaya git** seçeneğine tıklayın
7. **İzin ver** butonuna tıklayın
8. Dağıtım tamamlandığında **Web uygulaması URL'si** görünecek, bu URL'yi kopyalayın

## 📋 Adım 4: Web Sitesine URL Ekleme

1. `script.js` dosyasını açın
2. `GOOGLE_SCRIPT_URL` değişkenini bulun
3. Kopyaladığınız Web App URL'sini yapıştırın:

```javascript
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

## ✅ Test Etme

1. Web sitenizi açın
2. Newsletter formuna bir e-posta adresi girin
3. **Kayıt Ol** butonuna tıklayın
4. Google Sheets tablosunu kontrol edin - yeni e-posta kaydı görünmeli

## 🔒 Güvenlik Notları

- Web App URL'nizi herkese açık yapmayın (isteğe bağlı olarak erişimi sınırlandırabilirsiniz)
- Spam koruması için Google reCAPTCHA ekleyebilirsiniz
- E-posta doğrulama sistemi ekleyebilirsiniz

## 🐛 Sorun Giderme

- **CORS hatası**: `mode: "no-cors"` kullanıldığı için response göremeyebilirsiniz, bu normaldir
- **Veri kaydedilmiyor**: Apps Script'in doğru çalıştığından ve yetkilendirmelerin tamamlandığından emin olun
- **403 hatası**: Web App'in "Herkes" için erişilebilir olduğundan emin olun

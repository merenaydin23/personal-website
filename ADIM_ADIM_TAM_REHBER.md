# 📊 Google Sheets Kurulumu - EN BAŞTAN TAM REHBER

Bu rehber, hiçbir şey bilmeyenler için hazırlanmıştır. Her adım çok detaylı anlatılmıştır.

---

## 🎯 NE YAPACAĞIZ?

Newsletter formundan gelen email kayıtlarını Google Sheets'te saklayacağız. Böylece tüm bilgisayarlardan aynı kayıtları görebileceksiniz.

---

## 📋 ADIM 1: Google Sheets Tablosu Oluşturma

### ADIM 1.1: Google Sheets'e Giriş Yapma

1. **Tarayıcınızı açın** (Chrome, Firefox, Edge - hangisini kullanıyorsanız)
2. Adres çubuğuna (üstteki uzun kutu) şunu yazın: `sheets.google.com`
3. **Enter** tuşuna basın
4. Eğer Google hesabınızla giriş yapmadıysanız:
   - Sağ üst köşede **"Giriş yap"** (Sign in) butonuna tıklayın
   - Email adresinizi yazın (örneğin: `muhammederenaydin7@gmail.com`)
   - **"İleri"** (Next) butonuna tıklayın
   - Şifrenizi yazın
   - **"İleri"** (Next) butonuna tıklayın

**✅ ADIM 1.1 TAMAMLANDI!** Google Sheets'e giriş yaptınız.

---

### ADIM 1.2: Yeni Tablo Oluşturma

1. Google Sheets ana sayfasında, sol üst köşede **"Boş"** (Blank) yazısına tıklayın
   - Veya sayfanın ortasında **"+"** (artı) işaretine tıklayın
2. Yeni bir boş tablo açılacak
3. Bu tablo otomatik olarak Google Drive'ınıza kaydedilir

**✅ ADIM 1.2 TAMAMLANDI!** Yeni tablo oluşturuldu.

---

### ADIM 1.3: Başlıkları Ekleme

**A1 Hücresine "Email" Yazmak:**

1. Tablonun en üstünde, sol tarafta **"A"** yazan sütuna bakın
2. En üstte, sol tarafta **"1"** yazan satıra bakın
3. **A sütunu** ile **1. satırın** kesiştiği yere tıklayın (bu A1 hücresidir)
   - Hücre mavi bir çerçeve ile seçilecek
4. Klavyenizden şunu yazın: `Email`
5. **Enter** tuşuna basın

**B1 Hücresine "Tarih" Yazmak:**

1. A1'in hemen sağındaki hücreye tıklayın (bu B1 hücresidir)
2. Klavyenizden şunu yazın: `Tarih`
3. **Enter** tuşuna basın

**C1 Hücresine "Saat" Yazmak:**

1. B1'in hemen sağındaki hücreye tıklayın (bu C1 hücresidir)
2. Klavyenizden şunu yazın: `Saat`
3. **Enter** tuşuna basın

**Şimdi tablonuz şöyle görünmeli:**

```
A1: Email    B1: Tarih    C1: Saat
```

**Eğer görünmüyorsa:**

- Hücreleri seçin (A1, B1, C1)
- Sağ tıklayın > **"Formatı temizle"** (Clear formatting)
- Metin rengini kontrol edin (üst menüden A harfi simgesi) > Siyah seçin
- Font boyutunu 12 yapın

**✅ ADIM 1.3 TAMAMLANDI!** Başlıklar eklendi.

---

### ADIM 1.4: Tabloyu İsimlendirme

1. Sol üst köşede **"Adsız elektronik tablo"** (Untitled spreadsheet) yazısına tıklayın
2. Bu yazı seçili hale gelecek
3. Klavyenizden şunu yazın: `Newsletter Kayıtları`
4. **Enter** tuşuna basın
5. Tablo otomatik olarak kaydedilir (Google Drive'ınıza)

**✅ ADIM 1 TAMAMLANDI!** Tablonuz hazır.

---

## 📋 ADIM 2: Google Apps Script Oluşturma

### ADIM 2.1: Apps Script Editörünü Açma

1. Google Sheets tablonuzda, **üst menü çubuğuna** bakın
2. **"Uzantılar"** (Extensions) yazısına tıklayın
3. Açılan menüden **"Apps Script"** seçeneğine tıklayın
4. Yeni bir sekme açılacak (Apps Script editörü)
   - Eğer açılmazsa, tarayıcı ayarlarınızı kontrol edin (pop-up engelleyici)

**✅ ADIM 2.1 TAMAMLANDI!** Apps Script editörü açıldı.

---

### ADIM 2.2: Varsayılan Kodu Silme

1. Apps Script editöründe, varsayılan kod varsa (örneğin: `function myFunction() {}`), **tümünü seçin**:
   - **Ctrl+A** tuşlarına basın (tüm kodu seçer)
2. **Delete** tuşuna basın (siler)
3. Editör boş olmalı

**✅ ADIM 2.2 TAMAMLANDI!** Varsayılan kod silindi.

---

### ADIM 2.3: Kodu Yapıştırma

**Aşağıdaki kodu TAMAMEN kopyalayın:**

```javascript
function doPost(e) {
  try {
    // Google Sheets'i aç
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Gelen veriyi parse et (hem JSON hem form data desteği)
    let data;
    if (e.postData && e.postData.contents) {
      // JSON formatında geliyorsa
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Form data formatında geliyorsa
      data = {
        email: e.parameter.email,
        timestamp: e.parameter.timestamp || new Date().toISOString(),
      };
    } else {
      throw new Error("No data received");
    }

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
  try {
    // Admin panelinden veri okuma isteği
    if (e.parameter.action === "getData") {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const data = sheet.getDataRange().getValues();

      // İlk satırı (başlıkları) atla
      const rows = data.slice(1);

      // Verileri JSON formatına çevir
      const result = rows.map((row, index) => {
        return {
          id: index + 1,
          email: row[0] || "",
          date: row[1] || "",
          time: row[2] || "",
        };
      });

      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Varsayılan yanıt
    return ContentService.createTextOutput(
      JSON.stringify({
        message: "Newsletter API is running",
        action: "Use ?action=getData to get data",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Yapıştırma Adımları:**

1. Yukarıdaki kodu **TAMAMEN** seçin (baştan sona)
2. **Ctrl+C** tuşlarına basın (kopyalar)
3. Apps Script editörüne geri dönün
4. Editörde boş alana tıklayın
5. **Ctrl+V** tuşlarına basın (yapıştırır)

**Kod şu şekilde görünmeli:**

- İki fonksiyon olmalı: `function doPost` ve `function doGet`
- Toplam 88 satır kod olmalı

**✅ ADIM 2.3 TAMAMLANDI!** Kod yapıştırıldı.

---

### ADIM 2.4: Dosyayı Kaydetme

1. Apps Script editöründe, **üst menüden** **"Kaydet"** (Save) butonuna tıklayın
   - Veya **Ctrl+S** tuşlarına basın
2. Sol üst köşede proje ismi isteyecek
3. Klavyenizden şunu yazın: `Newsletter API`
4. **Enter** tuşuna basın veya **"Tamam"** (OK) butonuna tıklayın
5. Sol üst köşede **"Newsletter API"** yazısı görünmeli

**✅ ADIM 2 TAMAMLANDI!** Kodunuz hazır ve kaydedildi.

---

## 📋 ADIM 3: Web App Olarak Yayınlama

### ADIM 3.1: Dağıtım Ayarlarını Açma

1. Apps Script editöründe, **üst menüden** **"Dağıt"** (Deploy) butonuna tıklayın
2. Açılan menüden **"Yeni dağıtım"** (New deployment) seçeneğine tıklayın
3. Bir pencere açılacak

**✅ ADIM 3.1 TAMAMLANDI!** Dağıtım penceresi açıldı.

---

### ADIM 3.2: Web Uygulaması Seçimi

1. Açılan pencerede, **"Tür seç"** (Select type) yazısının yanında bir **⚙️ (dişli çark) ikonu** var
2. Bu ikona tıklayın
3. Açılan listeden **"Web uygulaması"** (Web app) seçeneğini seçin
4. Pencere güncellenecek

**✅ ADIM 3.2 TAMAMLANDI!** Web uygulaması seçildi.

---

### ADIM 3.3: Ayarları Yapma

**Açıklama (Description) Ekleme:**

1. **"Açıklama"** (Description) kutusuna tıklayın
2. Şunu yazın: `Newsletter Form API`
3. **Enter** tuşuna basın

**Yürütme kimliği (Execute as) Seçimi:**

1. **"Yürütme kimliği"** (Execute as) açılır menüsüne tıklayın
2. **"Benim olarak yürüt"** (Me) seçeneğini seçin
   - ⚠️ ÖNEMLİ: "Kullanıcı olarak yürüt" seçeneğini seçmeyin!

**Erişebilenler (Who has access) Seçimi:**

1. **"Erişebilenler"** (Who has access) açılır menüsüne tıklayın
2. **"Herkes"** (Anyone) seçeneğini seçin
   - ⚠️ ÇOK ÖNEMLİ: Anonim erişim için mutlaka "Herkes" seçilmeli!

**✅ ADIM 3.3 TAMAMLANDI!** Ayarlar yapıldı.

---

### ADIM 3.4: Dağıtımı Yapma

1. Tüm ayarları yaptıktan sonra, **"Dağıt"** (Deploy) butonuna tıklayın
2. İlk kez yapıyorsanız, Google'dan izin isteyecek

**İzin Verme Adımları (ÇOK ÖNEMLİ!):**

1. **"Yetkilendirme gerekli"** (Authorization required) yazısı görünecek
2. **"Yetkilendir"** (Authorize) butonuna tıklayın
3. Google hesabınızı seçin (eğer birden fazla hesabınız varsa)
4. **"Gelişmiş"** (Advanced) linkine tıklayın
5. **"[Proje adınız] güvenli olmayan bir sayfaya gidiyor"** yazısı görünecek
6. **"Devam et"** (Go to...) linkine tıklayın
7. **"İzin ver"** (Allow) butonuna tıklayın
8. **"Kapat"** (Close) butonuna tıklayın

**✅ ADIM 3.4 TAMAMLANDI!** İzinler verildi.

---

### ADIM 3.5: Web App URL'ini Kopyalama

1. İzin verdikten sonra, bir pencere açılacak
2. Bu pencerede **"Web uygulaması URL'si"** (Web app URL) başlığı görünecek
3. Bu başlığın altında bir URL var (örneğin: `https://script.google.com/macros/s/ABC123.../exec`)
4. Bu URL'in üzerine tıklayın (tamamı seçilecek - mavi olacak)
5. **Ctrl+C** tuşlarına basın (kopyalar)
6. Bu URL'i bir yere kaydedin:
   - Not Defteri açın
   - **Ctrl+V** yapın (yapıştırır)
   - Dosyayı kaydedin (örneğin: `url.txt`)

**⚠️ ÖNEMLİ:** Bu URL'i kaybetmeyin! İleride kullanacağız.

**✅ ADIM 3 TAMAMLANDI!** Web App URL'iniz hazır.

---

## 📋 ADIM 4: URL'i Yapılandırmaya Ekleme

### ADIM 4.1: Ana Sayfa İçin (email-config.js)

**Dosyayı Açma:**

1. Projenizde `home page` klasörüne gidin
2. `email-config.js` dosyasını bulun
3. Dosyaya çift tıklayın veya sağ tıklayıp **"Aç"** (Open) seçin
4. Dosya bir editörde açılacak (Notepad, VS Code, vb.)

**URL'i Ekleme:**

1. Dosyada `googleSheetsWebAppUrl` satırını bulun (26. satır civarı)
2. Bu satır şöyle görünür:
   ```javascript
   googleSheetsWebAppUrl: "",
   ```
3. Tırnak işaretleri (`""`) arasına, kopyaladığınız Web App URL'ini yapıştırın:
   - Tırnak işaretleri arasına tıklayın
   - **Ctrl+V** yapın (URL'i yapıştırır)
4. Şöyle görünmeli:
   ```javascript
   googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
   ```
5. Dosyayı kaydedin:
   - **Ctrl+S** tuşlarına basın
   - Veya **"Dosya"** > **"Kaydet"** (File > Save)

**✅ ADIM 4.1 TAMAMLANDI!** Ana sayfa URL'i eklendi.

---

### ADIM 4.2: Admin Panel İçin (config.js)

**Dosyayı Açma:**

1. Projenizde `admin` klasörüne gidin
2. `config.js` dosyasını bulun
3. Dosyaya çift tıklayın veya sağ tıklayıp **"Aç"** (Open) seçin
4. Dosya bir editörde açılacak

**URL'i Ekleme:**

1. Dosyada `googleSheetsWebAppUrl` satırını bulun (9. satır civarı)
2. Bu satır şöyle görünür:
   ```javascript
   googleSheetsWebAppUrl: "",
   ```
3. Tırnak işaretleri (`""`) arasına, **aynı Web App URL'ini** yapıştırın:
   - Tırnak işaretleri arasına tıklayın
   - **Ctrl+V** yapın (URL'i yapıştırır)
4. Şöyle görünmeli:
   ```javascript
   googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
   ```
5. Dosyayı kaydedin:
   - **Ctrl+S** tuşlarına basın
   - Veya **"Dosya"** > **"Kaydet"** (File > Save)

**⚠️ ÖNEMLİ:** Her iki dosyada da **aynı URL** olmalı!

**✅ ADIM 4 TAMAMLANDI!** URL'ler eklendi.

---

## ✅ ADIM 5: Test Etme

### ADIM 5.1: Newsletter Formunu Test Etme

1. Web sitenizi açın (tarayıcınızda)
2. Newsletter formunu bulun (genellikle sayfanın alt kısmında)
3. Forma bir test email adresi girin (örneğin: `test@example.com`)
4. **"Kayıt Ol"** butonuna tıklayın
5. **"✅ Başarıyla kayıt oldunuz!"** mesajını bekleyin

**✅ ADIM 5.1 TAMAMLANDI!** Form test edildi.

---

### ADIM 5.2: Google Sheets'te Kontrol

1. Google Sheets tablonuzu açın
2. Sayfayı yenileyin:
   - **F5** tuşuna basın
   - Veya tarayıcıdaki yenile butonuna tıklayın
3. **2. satıra** bakın (A2, B2, C2 hücreleri):
   - **A2:** Test email adresiniz görünmeli (örneğin: `test@example.com`)
   - **B2:** Bugünün tarihi görünmeli (örneğin: `25.12.2024`)
   - **C2:** Saat görünmeli (örneğin: `14:30:25`)

**Eğer görünmüyorsa:**

- Birkaç saniye bekleyin ve tekrar yenileyin (F5)
- Browser console'u açın (F12 > Console) ve hata var mı kontrol edin

**✅ ADIM 5.2 TAMAMLANDI!** Google Sheets'te veri göründü.

---

### ADIM 5.3: Admin Panelden Kontrol

1. Admin paneline giriş yapın:
   - Tarayıcınızda `/admin` adresine gidin
   - Veya web sitenizin URL'sinin sonuna `/admin` ekleyin
2. Şifrenizi girin
3. Newsletter kayıtları tablosunda test email'inizi görün
4. **"Yenile"** (Refresh) butonuna tıklayın
5. Google Sheets'ten verilerin geldiğini doğrulayın

**✅ ADIM 5 TAMAMLANDI!** Her şey çalışıyor!

---

## 🎉 TEBRİKLER!

Artık Google Sheets entegrasyonunuz hazır! Tüm bilgisayarlardan aynı kayıtları görebileceksiniz.

---

## 🆘 SORUN OLURSA

### Sorun: Google Sheets'te başlıklar görünmüyor?

**Çözüm:**

1. Hücreleri seçin (A1, B1, C1)
2. Sağ tıklayın > **"Formatı temizle"** (Clear formatting)
3. Metin rengini kontrol edin (üst menüden A harfi simgesi) > Siyah seçin
4. Font boyutunu 12 yapın

### Sorun: Apps Script editörü açılmıyor?

**Çözüm:**

1. Google Sheets'te **"Uzantılar"** > **"Apps Script"** seçeneğine tekrar tıklayın
2. Yeni bir sekme açılmazsa, tarayıcı ayarlarınızı kontrol edin (pop-up engelleyici)
3. Alternatif: `script.google.com` adresine gidin ve projenizi oradan açın

### Sorun: "Yetkilendirme gerekli" hatası?

**Çözüm:**

1. Apps Script'te **"Dağıt"** > **"Dağıtımı yönet"** (Manage deployments) seçin
2. Mevcut dağıtımın yanındaki **⚙️ (dişli çark) ikonuna** tıklayın
3. **"Sil"** (Delete) butonuna tıklayın
4. Yeni bir dağıtım oluşturun (ADIM 3'ü tekrar edin)
5. İzinleri tekrar verin

### Sorun: Veriler Google Sheets'e kaydedilmiyor?

**Çözüm:**

1. Browser console'u açın (F12 > Console)
2. Hata mesajlarını kontrol edin
3. Web App URL'inin doğru olduğundan emin olun
4. Web App'in "Herkes" erişimine açık olduğundan emin olun
5. Config dosyalarını kaydettiğinizden emin olun

---

## 📝 ÖNEMLİ NOTLAR

- ✅ Google Sheets ücretsizdir
- ✅ Günlük 20,000 istek limiti vardır (normal kullanım için yeterli)
- ✅ Veriler Google hesabınızda güvenli bir şekilde saklanır
- ✅ Admin panel her açıldığında Google Sheets'ten verileri çeker
- ✅ Google Sheets URL'i yoksa, sistem otomatik olarak localStorage kullanır (sorun değil)
- ⚠️ Web App URL'ini asla paylaşmayın (güvenlik riski)

---

**Son Güncelleme:** En baştan tam rehber eklendi - Her adım çok detaylı anlatıldı.



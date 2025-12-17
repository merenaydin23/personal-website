# 📊 Google Sheets Kurulumu - Sıfırdan Başlangıç Rehberi

Bu rehber, Google Sheets'i hiç bilmeyenler için hazırlanmıştır. Her adım çok detaylı anlatılmıştır.

---

## 🎯 NE YAPACAĞIZ?

Newsletter formundan gelen email kayıtlarını Google Sheets'te saklayacağız. Böylece tüm bilgisayarlardan aynı kayıtları görebileceksiniz.

---

## 📋 ADIM 1: Google Sheets Tablosu Oluşturma

### 1.1. Google Sheets'e Nasıl Giriş Yapılır?

1. **Tarayıcınızı açın** (Chrome, Firefox, Edge - hangisini kullanıyorsanız)
2. Adres çubuğuna şunu yazın: `sheets.google.com`
3. **Enter** tuşuna basın
4. Eğer Google hesabınızla giriş yapmadıysanız:
   - Sağ üst köşede **"Giriş yap"** (Sign in) butonuna tıklayın
   - Email adresinizi yazın (örneğin: `muhammederenaydin7@gmail.com`)
   - Şifrenizi yazın
   - **"İleri"** (Next) butonuna tıklayın

### 1.2. Yeni Tablo Nasıl Oluşturulur?

1. Google Sheets ana sayfasında, sol üst köşede **"Boş"** (Blank) yazısına tıklayın
   - Veya **"+"** (artı) işaretine tıklayın
2. Yeni bir boş tablo açılacak
3. Bu tablo otomatik olarak Google Drive'ınıza kaydedilir

### 1.3. Başlıkları Nasıl Eklerim?

**A1 Hücresine "Email" Yazmak:**
1. Tablonun en üstünde, sol tarafta **"A"** yazan sütuna bakın
2. En üstte, sol tarafta **"1"** yazan satıra bakın
3. **A sütunu** ile **1. satırın** kesiştiği yere tıklayın (bu A1 hücresidir)
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

### 1.4. Tabloyu Nasıl İsimlendiririm?

1. Sol üst köşede **"Adsız elektronik tablo"** (Untitled spreadsheet) yazısına tıklayın
2. Bu yazı seçili hale gelecek
3. Klavyenizden şunu yazın: `Newsletter Kayıtları`
4. **Enter** tuşuna basın
5. Tablo otomatik olarak kaydedilir (Google Drive'ınıza)

**✅ ADIM 1 TAMAMLANDI!** Tablonuz hazır.

---

## 📋 ADIM 2: Google Apps Script Oluşturma

### 2.1. Apps Script Nedir?

Apps Script, Google Sheets'e özel kodlar yazmanızı sağlayan bir araçtır. Bu kod sayesinde web sitenizden gelen veriler Google Sheets'e kaydedilecek.

### 2.2. Apps Script Editörünü Nasıl Açarım?

1. Google Sheets tablonuzda, **üst menü çubuğuna** bakın
2. **"Uzantılar"** (Extensions) yazısına tıklayın
3. Açılan menüden **"Apps Script"** seçeneğine tıklayın
4. Yeni bir sekme açılacak (Apps Script editörü)

### 2.3. Kodu Nasıl Yapıştırırım?

**Önce Kodu Kopyalayın:**
1. Projenizde `google-apps-script-code.js` dosyasını açın
2. **Ctrl+A** tuşlarına basın (tüm kodu seçer)
3. **Ctrl+C** tuşlarına basın (kodu kopyalar)

**Sonra Apps Script'e Yapıştırın:**
1. Apps Script editörüne geri dönün
2. Editörde varsayılan kod varsa (örneğin: `function myFunction() {}`), **tümünü seçin** (Ctrl+A)
3. **Delete** tuşuna basın (siler)
4. **Ctrl+V** tuşlarına basın (kodu yapıştırır)

**Kod şu şekilde görünmeli:**
```javascript
function doPost(e) {
  try {
    // Google Sheets'i aç
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // ... daha fazla kod ...
  }
}

function doGet(e) {
  // ... kod ...
}
```

### 2.4. Dosyayı Nasıl Kaydederim?

1. Apps Script editöründe, **üst menüden** **"Kaydet"** (Save) butonuna tıklayın
   - Veya **Ctrl+S** tuşlarına basın
2. Sol üst köşede proje ismi isteyecek
3. Klavyenizden şunu yazın: `Newsletter API`
4. **Enter** tuşuna basın veya **"Tamam"** (OK) butonuna tıklayın

**✅ ADIM 2 TAMAMLANDI!** Kodunuz hazır.

---

## 📋 ADIM 3: Web App Olarak Yayınlama

### 3.1. Web App Nedir?

Web App, kodunuzun internet üzerinden erişilebilir hale gelmesidir. Böylece web siteniz bu kodu kullanarak Google Sheets'e veri kaydedebilir.

### 3.2. Dağıtım Ayarlarını Nasıl Açarım?

1. Apps Script editöründe, **üst menüden** **"Dağıt"** (Deploy) butonuna tıklayın
2. Açılan menüden **"Yeni dağıtım"** (New deployment) seçeneğine tıklayın
3. Bir pencere açılacak

### 3.3. Web Uygulaması Nasıl Seçilir?

1. Açılan pencerede, **"Tür seç"** (Select type) yazısının yanında bir **⚙️ (dişli çark) ikonu** var
2. Bu ikona tıklayın
3. Açılan listeden **"Web uygulaması"** (Web app) seçeneğini seçin

### 3.4. Ayarları Nasıl Yaparım?

**Açıklama (Description):**
1. **"Açıklama"** (Description) kutusuna tıklayın
2. Şunu yazın: `Newsletter Form API`
3. **Enter** tuşuna basın

**Yürütme kimliği (Execute as):**
1. **"Yürütme kimliği"** (Execute as) açılır menüsüne tıklayın
2. **"Benim olarak yürüt"** (Me) seçeneğini seçin
   - ⚠️ ÖNEMLİ: "Kullanıcı olarak yürüt" seçeneğini seçmeyin!

**Erişebilenler (Who has access):**
1. **"Erişebilenler"** (Who has access) açılır menüsüne tıklayın
2. **"Herkes"** (Anyone) seçeneğini seçin
   - ⚠️ ÇOK ÖNEMLİ: Anonim erişim için mutlaka "Herkes" seçilmeli!

### 3.5. Dağıtımı Nasıl Yaparım?

1. Tüm ayarları yaptıktan sonra, **"Dağıt"** (Deploy) butonuna tıklayın
2. İlk kez yapıyorsanız, Google'dan izin isteyecek

**İzin Verme Adımları:**
1. **"Yetkilendirme gerekli"** (Authorization required) yazısı görünecek
2. **"Yetkilendir"** (Authorize) butonuna tıklayın
3. Google hesabınızı seçin
4. **"Gelişmiş"** (Advanced) linkine tıklayın
5. **"[Proje adınız] güvenli olmayan bir sayfaya gidiyor"** yazısı görünecek
6. **"Devam et"** (Go to...) linkine tıklayın
7. **"İzin ver"** (Allow) butonuna tıklayın
8. **"Kapat"** (Close) butonuna tıklayın

### 3.6. Web App URL'ini Nasıl Kopyalarım?

1. İzin verdikten sonra, bir pencere açılacak
2. Bu pencerede **"Web uygulaması URL'si"** (Web app URL) başlığı görünecek
3. Bu başlığın altında bir URL var (örneğin: `https://script.google.com/macros/s/ABC123.../exec`)
4. Bu URL'in üzerine tıklayın (tamamı seçilecek)
5. **Ctrl+C** tuşlarına basın (kopyalar)
6. Bu URL'i bir yere kaydedin:
   - Not Defteri açın
   - **Ctrl+V** yapın (yapıştırır)
   - Dosyayı kaydedin

**✅ ADIM 3 TAMAMLANDI!** Web App URL'iniz hazır.

---

## 📋 ADIM 4: URL'i Yapılandırmaya Ekleme

### 4.1. Ana Sayfa İçin (email-config.js)

**Dosyayı Nasıl Açarım?**
1. Projenizde `home page` klasörüne gidin
2. `email-config.js` dosyasını açın (çift tıklayın veya sağ tıklayıp "Aç" seçin)

**URL'i Nasıl Eklerim?**
1. Dosyada `googleSheetsWebAppUrl` satırını bulun (26. satır civarı)
2. Bu satır şöyle görünür:
   ```javascript
   googleSheetsWebAppUrl: "",
   ```
3. Tırnak işaretleri (`""`) arasına, kopyaladığınız Web App URL'ini yapıştırın
4. Şöyle görünmeli:
   ```javascript
   googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
   ```
5. Dosyayı kaydedin (**Ctrl+S**)

### 4.2. Admin Panel İçin (config.js)

**Dosyayı Nasıl Açarım?**
1. Projenizde `admin` klasörüne gidin
2. `config.js` dosyasını açın

**URL'i Nasıl Eklerim?**
1. Dosyada `googleSheetsWebAppUrl` satırını bulun (9. satır civarı)
2. Bu satır şöyle görünür:
   ```javascript
   googleSheetsWebAppUrl: "",
   ```
3. Tırnak işaretleri (`""`) arasına, **aynı Web App URL'ini** yapıştırın
4. Şöyle görünmeli:
   ```javascript
   googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
   ```
5. Dosyayı kaydedin (**Ctrl+S**)

**⚠️ ÖNEMLİ:** Her iki dosyada da **aynı URL** olmalı!

**✅ ADIM 4 TAMAMLANDI!** URL'ler eklendi.

---

## ✅ ADIM 5: Test Etme

### 5.1. Newsletter Formunu Nasıl Test Ederim?

1. Web sitenizi açın (tarayıcınızda)
2. Newsletter formunu bulun (genellikle sayfanın alt kısmında)
3. Forma bir test email adresi girin (örneğin: `test@example.com`)
4. **"Kayıt Ol"** butonuna tıklayın
5. **"✅ Başarıyla kayıt oldunuz!"** mesajını bekleyin

### 5.2. Google Sheets'te Nasıl Kontrol Ederim?

1. Google Sheets tablonuzu açın
2. Sayfayı yenileyin (**F5** tuşuna basın veya yenile butonuna tıklayın)
3. **2. satıra** bakın (A2, B2, C2 hücreleri):
   - **A2:** Test email adresiniz görünmeli
   - **B2:** Bugünün tarihi görünmeli (örneğin: `25.12.2024`)
   - **C2:** Saat görünmeli (örneğin: `14:30:25`)

**Eğer görünmüyorsa:**
- Birkaç saniye bekleyin ve tekrar yenileyin
- Browser console'u açın (F12 > Console) ve hata var mı kontrol edin

### 5.3. Admin Panelden Nasıl Kontrol Ederim?

1. Admin paneline giriş yapın (`/admin` adresine gidin)
2. Şifrenizi girin
3. Newsletter kayıtları tablosunda test email'inizi görün
4. **"Yenile"** (Refresh) butonuna tıklayın
5. Google Sheets'ten verilerin geldiğini doğrulayın

**✅ ADIM 5 TAMAMLANDI!** Her şey çalışıyor!

---

## 🆘 SIK SORULAN SORULAR

### Soru: Google Sheets'te başlıklar görünmüyor?

**Çözüm:**
1. Hücreleri seçin (A1, B1, C1)
2. Sağ tıklayın > **"Formatı temizle"** (Clear formatting)
3. Metin rengini kontrol edin (üst menüden A harfi simgesi)
4. Siyah renk seçin
5. Font boyutunu 12 yapın

### Soru: Apps Script editörü açılmıyor?

**Çözüm:**
1. Google Sheets'te **"Uzantılar"** > **"Apps Script"** seçeneğine tekrar tıklayın
2. Yeni bir sekme açılmazsa, tarayıcı ayarlarınızı kontrol edin (pop-up engelleyici)
3. Alternatif: `script.google.com` adresine gidin ve projenizi oradan açın

### Soru: "Yetkilendirme gerekli" hatası alıyorum?

**Çözüm:**
1. Apps Script'te **"Dağıt"** > **"Dağıtımı yönet"** (Manage deployments) seçin
2. Mevcut dağıtımın yanındaki **⚙️ (dişli çark) ikonuna** tıklayın
3. **"Sil"** (Delete) butonuna tıklayın
4. Yeni bir dağıtım oluşturun (ADIM 3'ü tekrar edin)
5. İzinleri tekrar verin

### Soru: Web App URL'i çalışmıyor?

**Çözüm:**
1. URL'in doğru kopyalandığından emin olun
2. URL'in sonunda `/exec` olduğundan emin olun
3. Config dosyalarında tırnak işaretlerinin doğru olduğundan emin olun
4. Dosyaları kaydettiğinizden emin olun

### Soru: Veriler Google Sheets'e kaydedilmiyor?

**Çözüm:**
1. Browser console'u açın (F12 > Console)
2. Hata mesajlarını kontrol edin
3. Web App URL'inin doğru olduğundan emin olun
4. Web App'in "Herkes" erişimine açık olduğundan emin olun
5. Apps Script'te **"Görüntüle"** (View) > **"Günlükler"** (Logs) ile hataları kontrol edin

---

## 📝 ÖNEMLİ NOTLAR

- ✅ Google Sheets ücretsizdir
- ✅ Günlük 20,000 istek limiti vardır (normal kullanım için yeterli)
- ✅ Veriler Google hesabınızda güvenli bir şekilde saklanır
- ✅ Admin panel her açıldığında Google Sheets'ten verileri çeker
- ✅ Google Sheets URL'i yoksa, sistem otomatik olarak localStorage kullanır (sorun değil)
- ⚠️ Web App URL'ini asla paylaşmayın (güvenlik riski)

---

## 🎉 TEBRİKLER!

Artık Google Sheets entegrasyonunuz hazır! Tüm bilgisayarlardan aynı kayıtları görebileceksiniz.

**Sorunuz olursa:** Bu rehberi tekrar okuyun veya browser console'daki (F12) hata mesajlarını kontrol edin.

---

**Son Güncelleme:** Sıfırdan başlangıç rehberi eklendi - Her adım çok detaylı anlatıldı.

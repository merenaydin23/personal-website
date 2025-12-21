# 📊 Google Sheets Entegrasyonu - Detaylı Kurulum Rehberi

Bu rehber, newsletter kayıtlarının tüm bilgisayarlardan görünebilmesi için Google Sheets entegrasyonunu adım adım kurmanızı sağlar.

---

## 📋 ADIM 1: Google Sheets Tablosu Oluşturma

### 1.1. Google Sheets'e Giriş

1. Tarayıcınızda [Google Sheets](https://sheets.google.com) adresine gidin
2. Google hesabınızla giriş yapın

### 1.2. Yeni Tablo Oluşturma

1. Sol üst köşedeki **"Boş"** (Blank) seçeneğine tıklayın
2. Yeni bir boş tablo açılacak

### 1.3. Başlıkları Ekleme

1. **A1** hücresine tıklayın ve yazın: `Email`
2. **B1** hücresine tıklayın ve yazın: `Tarih`
3. **C1** hücresine tıklayın ve yazın: `Saat`
4. Her hücreyi yazdıktan sonra **Enter** tuşuna basın

**ÖNEMLİ:** Başlıkların görünür olduğundan emin olun:

- Metin rengi siyah olmalı
- Font boyutu en az 10 olmalı
- Hücreler boş görünüyorsa, hücreleri seçip formatı temizleyin

### 1.4. Tabloyu Kaydetme

1. Sol üst köşedeki **"Adsız elektronik tablo"** (Untitled spreadsheet) yazısına tıklayın
2. Tabloya bir isim verin, örneğin: `Newsletter Kayıtları`
3. Tablo otomatik olarak Google Drive'ınıza kaydedilir

---

## 📋 ADIM 2: Google Apps Script Oluşturma

### 2.1. Apps Script Editörünü Açma

1. Google Sheets'te üst menüden **"Uzantılar"** (Extensions) menüsüne tıklayın
2. Açılan menüden **"Apps Script"** seçeneğine tıklayın
3. Yeni bir sekmede Apps Script editörü açılacak

### 2.2. Kodu Yapıştırma

1. Apps Script editöründe varsayılan kod (`function myFunction() {}`) varsa, **tümünü silin**
2. Projenizdeki `google-apps-script-code.js` dosyasını açın
3. **Tüm kodu kopyalayın** (Ctrl+A, sonra Ctrl+C)
4. Apps Script editörüne **yapıştırın** (Ctrl+V)

**Kod şu şekilde görünmeli:**

```javascript
function doPost(e) {
  // ... kod ...
}

function doGet(e) {
  // ... kod ...
}
```

### 2.3. Dosyayı Kaydetme

1. Üst menüden **"Kaydet"** (Save) butonuna tıklayın veya **Ctrl+S** tuşlarına basın
2. Projeye bir isim verin, örneğin: `Newsletter API`
3. **"Tamam"** (OK) butonuna tıklayın

---

## 📋 ADIM 3: Web App Olarak Yayınlama

### 3.1. Dağıtım Ayarlarını Açma

1. Apps Script editöründe üst menüden **"Dağıt"** (Deploy) butonuna tıklayın
2. Açılan menüden **"Yeni dağıtım"** (New deployment) seçeneğine tıklayın

### 3.2. Web Uygulaması Seçimi

1. Açılan pencerede **"Tür seç"** (Select type) yazısının yanındaki **⚙️ (Ayarlar) ikonuna** tıklayın
2. Açılan listeden **"Web uygulaması"** (Web app) seçeneğini seçin

### 3.3. Dağıtım Ayarları

Aşağıdaki ayarları yapın:

1. **Açıklama** (Description):

   - `Newsletter Form API` yazın

2. **Yürütme kimliği** (Execute as):

   - **"Benim olarak yürüt"** (Me) seçeneğini seçin
   - ⚠️ Bu önemli! "Kullanıcı olarak yürüt" seçeneğini seçmeyin

3. **Erişebilenler** (Who has access):
   - **"Herkes"** (Anyone) seçeneğini seçin
   - ⚠️ Bu çok önemli! Anonim erişim için "Herkes" seçilmeli

### 3.4. Dağıtımı Yapma

1. **"Dağıt"** (Deploy) butonuna tıklayın
2. İlk kez yapıyorsanız, Google'dan izin isteyecek:
   - **"Yetkilendir"** (Authorize) butonuna tıklayın
   - Google hesabınızı seçin
   - **"Gelişmiş"** (Advanced) linkine tıklayın
   - **"[Proje adınız] güvenli olmayan bir sayfaya gidiyor"** yazısından **"Devam et"** (Go to...) linkine tıklayın
   - **"İzin ver"** (Allow) butonuna tıklayın

### 3.5. Web App URL'ini Kopyalama

1. Dağıtım başarılı olduktan sonra bir pencere açılacak
2. **"Web uygulaması URL'si"** (Web app URL) başlığının altındaki URL'i **kopyalayın**
   - URL şu şekilde olmalı: `https://script.google.com/macros/s/ABC123.../exec`
3. Bu URL'i bir yere kaydedin (Not Defteri veya bir metin dosyası)

**ÖNEMLİ:** Bu URL'i kaybetmeyin! İleride kullanacağız.

---

## 📋 ADIM 4: URL'i Yapılandırmaya Ekleme

### 4.1. Ana Sayfa İçin (email-config.js)

1. Projenizde `home page/email-config.js` dosyasını açın
2. `googleSheetsWebAppUrl` satırını bulun (26. satır)
3. Boş tırnak işaretleri (`""`) arasına Web App URL'inizi yapıştırın:

```javascript
googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
```

**Örnek:**

```javascript
googleSheetsWebAppUrl: "https://script.google.com/macros/s/AKfycby1234567890abcdefghijklmnop/exec",
```

4. Dosyayı kaydedin

### 4.2. Admin Panel İçin (config.js)

1. Projenizde `admin/config.js` dosyasını açın
2. `googleSheetsWebAppUrl` satırını bulun (9. satır)
3. Boş tırnak işaretleri (`""`) arasına **aynı Web App URL'ini** yapıştırın:

```javascript
googleSheetsWebAppUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
```

**Örnek:**

```javascript
googleSheetsWebAppUrl: "https://script.google.com/macros/s/AKfycby1234567890abcdefghijklmnop/exec",
```

4. Dosyayı kaydedin

**ÖNEMLİ:** Her iki dosyada da **aynı URL** olmalı!

---

## ✅ ADIM 5: Test Etme

### 5.1. Newsletter Formunu Test Etme

1. Web sitenizi açın
2. Newsletter formuna bir test email adresi girin (örneğin: `test@example.com`)
3. **"Kayıt Ol"** butonuna tıklayın
4. Başarı mesajını bekleyin

### 5.2. Google Sheets'te Kontrol

1. Google Sheets tablosunu açın
2. **Yenile** (Refresh) butonuna tıklayın veya sayfayı yenileyin (F5)
3. **2. satırda** (A2, B2, C2) test email'inizin göründüğünü kontrol edin:
   - A2: Test email adresiniz
   - B2: Bugünün tarihi (dd.MM.yyyy formatında)
   - C2: Saat (HH:mm:ss formatında)

### 5.3. Admin Panelden Kontrol

1. Admin paneline giriş yapın
2. Newsletter kayıtları tablosunda test email'inizin göründüğünü kontrol edin
3. **"Yenile"** butonuna tıklayarak Google Sheets'ten verilerin geldiğini doğrulayın

---

## 🔄 Güncelleme Yapıldığında

Eğer Apps Script kodunda değişiklik yaptıysanız:

1. Apps Script editöründe **"Dağıt"** > **"Dağıtımı yönet"** (Manage deployments) seçin
2. Mevcut dağıtımın yanındaki **⚙️ (Ayarlar) ikonuna** tıklayın
3. **"Yeni sürüm"** (New version) seçeneğini seçin
4. **"Dağıt"** butonuna tıklayın
5. Yeni sürüm numarası oluşturulacak

---

## 🆘 Sorun Giderme

### Sorun: Google Sheets'e veri kaydedilmiyor

**Çözüm:**

1. Web App URL'inin doğru olduğundan emin olun
2. Web App'in "Herkes" erişimine açık olduğundan emin olun
3. Browser console'da (F12 > Console) hata mesajlarını kontrol edin
4. Apps Script'te **"Görüntüle"** (View) > **"Günlükler"** (Logs) ile hataları kontrol edin

### Sorun: Admin panelde veriler görünmüyor

**Çözüm:**

1. Google Sheets'te verilerin olduğundan emin olun
2. Admin panel config'de URL'in doğru olduğundan emin olun
3. Browser console'da (F12 > Console) hata mesajlarını kontrol edin
4. **"Yenile"** butonuna tıklayın

### Sorun: "Yetkilendirme gerekli" hatası

**Çözüm:**

1. Apps Script'te **"Dağıt"** > **"Dağıtımı yönet"** seçin
2. Mevcut dağıtımı silin
3. Yeni bir dağıtım oluşturun ve izinleri tekrar verin

---

## 📝 Önemli Notlar

- ✅ Google Sheets ücretsizdir ve günlük 20,000 istek limiti vardır
- ✅ Veriler Google hesabınızda güvenli bir şekilde saklanır
- ✅ Admin panel her açıldığında Google Sheets'ten verileri çeker
- ✅ Google Sheets URL'i yoksa, sistem otomatik olarak localStorage kullanır
- ⚠️ Web App URL'ini asla paylaşmayın (güvenlik riski)

---

**Son Güncelleme:** Detaylı adım adım kurulum rehberi eklendi.



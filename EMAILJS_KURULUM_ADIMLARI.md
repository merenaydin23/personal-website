# 📧 EmailJS Kurulum Rehberi - Adım Adım

Bu rehber, otomatik hoş geldiniz maili için EmailJS kurulumunu adım adım açıklar.

## 🎯 Ne Yapacağız?

Newsletter'a kayıt olan herkese otomatik olarak hoş geldiniz maili göndereceğiz.

---

## 📋 ADIM 1: EmailJS Hesabı Oluşturma

1. **EmailJS sitesine gidin:** https://www.emailjs.com/
2. **"Sign Up"** butonuna tıklayın
3. Email adresinizle kayıt olun (ücretsiz - ayda 200 mail)
4. Email'inize gelen doğrulama linkine tıklayın
5. Giriş yapın

✅ **Hesabınız hazır!**

---

## 📋 ADIM 2: Email Servisi Ekleme (Gmail Örneği)

1. EmailJS dashboard'da sol menüden **"Email Services"** seçin
2. **"Add New Service"** butonuna tıklayın
3. **"Gmail"** seçin (veya kendi email sağlayıcınızı)
4. **"Connect Account"** butonuna tıklayın
5. Gmail hesabınızı seçin ve izin verin
6. **Service ID**'yi kopyalayın (örnek: `service_abc123`)
   - Bu ID'yi bir yere not edin!

✅ **Email servisi bağlandı!**

---

## 📋 ADIM 3: Email Template Oluşturma

1. Sol menüden **"Email Templates"** seçin
2. **"Create New Template"** butonuna tıklayın
3. **Template Name:** "Hoş Geldiniz Maili" yazın

### 3.1. Subject (Konu) Bölümü:
```
Hoş geldiniz! 👋 - MuhammedErenAydin.com
```

### 3.2. Content (İçerik) Bölümü:
Aşağıdaki metni tamamen kopyalayıp yapıştırın:

```
Hoş geldiniz! 👋

{{to_name}},

MuhammedErenAydin.com'a katıldığınız için çok mutluyum.
Aramıza hoş geldiniz!

Bu platformda; yazılım geliştirme, yapay zekâ ve güncel teknolojileri birlikte keşfedecek, yeni çıkan araçları deneyecek ve gerçek projeler üzerinden öğrenme sürecini paylaşacağız.

Teknolojiyi sadece takip eden değil, deneyen ve üreten bir topluluğun parçası olduğunuz için teşekkür ederim.
Güzel şeyler öğreneceğimiz ve üreteceğimiz bir yolculuk bizi bekliyor 🚀

Saygılarımla,
{{from_name}}
{{site_url}}
```

### 3.3. Template'i Kaydedin:
- **"Save"** butonuna tıklayın
- **Template ID**'yi kopyalayın (örnek: `template_xyz789`)
   - Bu ID'yi bir yere not edin!

✅ **Template hazır!**

---

## 📋 ADIM 4: Public Key Alma

1. Sol menüden **"Account"** seçin
2. **"General"** sekmesinde **"API Keys"** bölümünü bulun
3. **"Public Key"** değerini kopyalayın (örnek: `abcdefghijklmnop`)
   - Bu key'i bir yere not edin!

✅ **Public Key alındı!**

---

## 📋 ADIM 5: Config Dosyasını Doldurma

1. Projenizde `home page/email-config.js` dosyasını açın
2. Aşağıdaki bilgileri doldurun:

```javascript
const EMAIL_CONFIG = {
  publicKey: "BURAYA_PUBLIC_KEY_YAZIN",        // Adım 4'ten aldığınız
  serviceId: "BURAYA_SERVICE_ID_YAZIN",        // Adım 2'den aldığınız
  templateId: "BURAYA_TEMPLATE_ID_YAZIN",      // Adım 3'ten aldığınız
  fromEmail: "noreply@muhammederenaydin.com",  // EmailJS'te bağladığınız email
  fromName: "Muhammed Eren Aydın",
  siteUrl: "https://muhammederenaydin.com",    // Canlı domain'iniz
};
```

**Örnek:**
```javascript
const EMAIL_CONFIG = {
  publicKey: "abcdefghijklmnop",
  serviceId: "service_abc123",
  templateId: "template_xyz789",
  fromEmail: "noreply@muhammederenaydin.com",
  fromName: "Muhammed Eren Aydın",
  siteUrl: "https://muhammederenaydin.com",
};
```

✅ **Config dosyası hazır!**

---

## 📋 ADIM 6: Test Etme

1. Web sitenizi açın
2. Newsletter formuna bir test email'i girin
3. **"Kayıt Ol"** butonuna tıklayın
4. Başarı mesajını görün: "✅ Başarıyla kayıt oldunuz!"
5. Test email'inizi kontrol edin
6. Hoş geldiniz maili gelmiş olmalı! 🎉

✅ **Test başarılı!**

---

## 🔧 Sorun Giderme

### ❌ Mail gelmiyor

1. **Browser Console'u açın (F12)**
   - Hata mesajı var mı kontrol edin
   - "EmailJS yapılandırması eksik" uyarısı görüyorsanız config dosyasını kontrol edin

2. **EmailJS Dashboard'u kontrol edin**
   - **"Logs"** sekmesine gidin
   - Mail gönderim loglarını kontrol edin
   - Hata varsa ne olduğunu görebilirsiniz

3. **Config dosyasını kontrol edin**
   - Public Key, Service ID, Template ID doğru mu?
   - Tırnak işaretleri içinde mi?
   - Virgüller doğru mu?

### ❌ "EmailJS yapılandırması eksik" hatası

- `email-config.js` dosyasındaki değerlerin doldurulduğundan emin olun
- Boş string (`""`) kalmamalı

### ❌ Rate Limit hatası

- EmailJS ücretsiz planında **ayda 200 mail** limiti var
- Limit aşıldıysa bir sonraki aya kadar bekleyin veya premium plana geçin

---

## 📊 EmailJS Dashboard'da Kontrol

1. **Logs** sekmesi: Tüm mail gönderimlerini görebilirsiniz
2. **Usage** sekmesi: Aylık mail kullanımınızı görebilirsiniz
3. **Settings** sekmesi: Rate limiting ve diğer ayarları yapabilirsiniz

---

## ✅ Kurulum Tamamlandı!

Artık her newsletter kaydında otomatik olarak hoş geldiniz maili gönderilecek!

**Önemli Notlar:**
- ⚠️ Config dosyasındaki bilgileri GitHub'a commit etmeyin (güvenlik için)
- 🔒 Public Key'i güvenli tutun
- 📊 Aylık mail limitinizi takip edin
- 🚀 Canlıya alınca `siteUrl`'i güncelleyin

---

## 🆘 Yardım Gerekiyor mu?

- EmailJS Dokümantasyon: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

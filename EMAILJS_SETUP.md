# EmailJS Kurulum Rehberi - Otomatik Hoş Geldiniz Maili

Bu rehber, newsletter kayıtlarında otomatik hoş geldiniz maili göndermek için EmailJS kurulumunu açıklar.

## 📋 Adım 1: EmailJS Hesabı Oluşturma

1. [EmailJS](https://www.emailjs.com/) adresine gidin
2. Ücretsiz hesap oluşturun (ayda 200 mail ücretsiz)
3. Giriş yapın

## 📋 Adım 2: Email Servisi Ekleme

1. EmailJS dashboard'da **Email Services** sekmesine gidin
2. **Add New Service** butonuna tıklayın
3. Email sağlayıcınızı seçin (Gmail, Outlook, vb.)
4. Email hesabınızı bağlayın
5. **Service ID**'yi not edin (örnek: `service_xxxxx`)

## 📋 Adım 3: Email Template Oluşturma

1. **Email Templates** sekmesine gidin
2. **Create New Template** butonuna tıklayın
3. Template adı: "Hoş Geldiniz Maili"
4. Aşağıdaki template'i kullanın:

### Template İçeriği:

**Subject (Konu):**

```
Hoş geldiniz! 👋 - MuhammedErenAydin.com
```

**Content (İçerik):**

```
Hoş geldiniz! 👋

MuhammedErenAydin.com'a katıldığınız için çok mutluyum.
Aramıza hoş geldiniz!

Bu platformda; yazılım geliştirme, yapay zekâ ve güncel teknolojileri birlikte keşfedecek, yeni çıkan araçları deneyecek ve gerçek projeler üzerinden öğrenme sürecini paylaşacağız.

Teknolojiyi sadece takip eden değil, deneyen ve üreten bir topluluğun parçası olduğunuz için teşekkür ederim.
Güzel şeyler öğreneceğimiz ve üreteceğimiz bir yolculuk bizi bekliyor 🚀

Saygılarımla,
{{from_name}}
{{site_url}}
```

**Template Variables (Değişkenler):**

- `{{to_name}}` - Kullanıcı adı (email'den otomatik çıkarılır)
- `{{to_email}}` - Kullanıcı email'i
- `{{from_name}}` - Gönderen isim (Muhammed Eren Aydın)
- `{{site_url}}` - Site URL'i

**Not:** Mesaj içeriği template'te sabit olarak yazılmıştır, değişken olarak gönderilmez.

5. **Template ID**'yi not edin (örnek: `template_xxxxx`)

## 📋 Adım 4: Public Key Alma

1. **Account** sekmesine gidin
2. **API Keys** bölümünden **Public Key**'i kopyalayın (örnek: `xxxxxxxxxxxxx`)

## 📋 Adım 5: Config Dosyasını Güncelleme

`home page/email-config.js` dosyasını açın ve bilgileri doldurun:

```javascript
const EMAIL_CONFIG = {
  publicKey: "YOUR_PUBLIC_KEY", // EmailJS Public Key
  serviceId: "YOUR_SERVICE_ID", // EmailJS Service ID
  templateId: "YOUR_TEMPLATE_ID", // EmailJS Template ID
  fromEmail: "noreply@muhammederenaydin.com", // Gönderen email
  fromName: "Muhammed Eren Aydın",
  siteUrl: "https://muhammederenaydin.com", // Canlı domain
};
```

## 📋 Adım 6: Test Etme

1. Web sitenizde newsletter formunu test edin
2. Bir email adresi ile kayıt olun
3. Email kutunuzu kontrol edin
4. Hoş geldiniz maili gelmiş olmalı

## 🔒 Güvenlik Notları

- ⚠️ **Public Key**'i güvenli tutun
- 🔐 EmailJS dashboard'da rate limiting ayarlarını kontrol edin
- 📊 Aylık mail limitinizi takip edin (ücretsiz: 200 mail/ay)
- 🚫 Spam koruması için EmailJS ayarlarını yapılandırın

## 🐛 Sorun Giderme

### Mail gönderilmiyor

1. Browser console'u kontrol edin (F12)
2. EmailJS yapılandırmasını kontrol edin
3. Service ID ve Template ID'nin doğru olduğundan emin olun
4. EmailJS dashboard'da gönderim loglarını kontrol edin

### Template değişkenleri çalışmıyor

- Template'te değişken isimlerinin doğru yazıldığından emin olun
- `{{to_name}}`, `{{to_email}}` gibi formatı kontrol edin

### Rate limit hatası

- EmailJS ücretsiz planında ayda 200 mail limiti var
- Limit aşıldıysa premium plana geçin veya bekleyin

## 📝 Notlar

- EmailJS ücretsiz planında ayda 200 mail gönderebilirsiniz
- Mail gönderimi asenkron çalışır, kayıt başarılı olsa bile mail gönderilemeyebilir
- Mail gönderilemese bile kullanıcıya hata gösterilmez (kayıt başarılı sayılır)


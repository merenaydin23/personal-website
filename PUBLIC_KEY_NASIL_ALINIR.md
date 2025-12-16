# 🔑 Public Key Nasıl Alınır?

## 📍 Public Key Nerede?

EmailJS dashboard'da Public Key'i bulmak için:

### Adım 1: EmailJS'e Giriş Yapın
1. https://www.emailjs.com/ adresine gidin
2. Giriş yapın

### Adım 2: Account Sekmesine Gidin
1. Sol menüden **"Account"** seçeneğine tıklayın
2. Üstte **"General"** sekmesi açık olmalı (varsayılan)

### Adım 3: API Keys Bölümünü Bulun
1. Sayfayı aşağı kaydırın
2. **"API Keys"** bölümünü bulun
3. Bu bölümde **"Public Key"** yazısını göreceksiniz
4. Yanında uzun bir string var (örnek: `abcdefghijklmnop1234567890`)

### Adım 4: Public Key'i Kopyalayın
1. Public Key'in yanındaki **kopyala butonuna** tıklayın (veya metni seçip Ctrl+C)
2. Kopyaladığınız key'i bir yere not edin

### Adım 5: Config Dosyasına Ekleyin
1. Projenizde `home page/email-config.js` dosyasını açın
2. `publicKey: ""` kısmını bulun
3. Tırnak işaretleri arasına Public Key'i yapıştırın:

```javascript
publicKey: "BURAYA_PUBLIC_KEY_YAPISTIRIN",
```

**Örnek:**
```javascript
publicKey: "abcdefghijklmnop1234567890",
```

## ✅ Tamamlandı!

Public Key'i ekledikten sonra mail sistemi çalışmaya hazır olacak!

## 🔍 Bulamıyorsanız

Eğer API Keys bölümünü bulamıyorsanız:
1. EmailJS dashboard'da sol üstteki menüyü açın
2. **"Account"** seçeneğine tıklayın
3. **"General"** sekmesine gidin
4. Sayfayı aşağı kaydırın - API Keys bölümü sayfanın alt kısmında

## 📸 Görsel Yardım

EmailJS dashboard'da şu sırayla görünür:
- **Account** (sol menü)
- **General** (üst sekme)
- **API Keys** (sayfa içinde, aşağıda)
  - Public Key: `[uzun string]`
  - Private Key: `[gizli - kullanmayın]`

**Not:** Sadece **Public Key**'i kullanın, Private Key'i kullanmayın!

# 📦 JSONBin.io Kurulum Rehberi

JSONBin.io, newsletter kayıtlarını saklamak için kullanılan ücretsiz JSON storage servisidir.

## 🚀 Adım 1: JSONBin.io Hesabı Oluşturun

1. [JSONBin.io](https://jsonbin.io/) adresine gidin
2. "Sign Up" butonuna tıklayın
3. Ücretsiz hesap oluşturun (email ile kayıt olun)

## 🔑 Adım 2: API Key Alın

1. JSONBin.io'ya giriş yapın
2. Dashboard'a gidin
3. **"API Keys"** bölümüne gidin
4. **"Create API Key"** butonuna tıklayın
5. API Key'i kopyalayın (örnek: `$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

## 📝 Adım 3: Bin Oluşturun

1. JSONBin.io dashboard'da **"Create Bin"** butonuna tıklayın
2. İçeriğe boş bir array yazın: `[]`
3. **"Create"** butonuna tıklayın
4. Oluşturulan bin'in **ID'sini** kopyalayın (örnek: `507f1f77bcf86cd799439011`)

## ⚙️ Adım 4: Vercel Environment Variables Ekleyin

1. [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** bölümüne gidin
4. Şu 3 environment variable'ı ekleyin:

### Variable 1:
- **Name**: `JSONBIN_API_URL`
- **Value**: `https://api.jsonbin.io/v3/b`
- **Environment**: Production, Preview, Development (hepsini seçin)

### Variable 2:
- **Name**: `JSONBIN_BIN_ID`
- **Value**: `507f1f77bcf86cd799439011` (kendi bin ID'nizi yapıştırın)
- **Environment**: Production, Preview, Development (hepsini seçin)

### Variable 3:
- **Name**: `JSONBIN_API_KEY`
- **Value**: `$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (kendi API key'inizi yapıştırın)
- **Environment**: Production, Preview, Development (hepsini seçin)

## ✅ Adım 5: Deploy Edin

1. Environment variables'ı ekledikten sonra
2. Vercel'de **"Redeploy"** yapın (veya yeni bir commit push edin)
3. Deploy tamamlandıktan sonra test edin

## 🧪 Test

1. Ana sayfadan bir e-posta adresi ile kayıt olun
2. Admin panelden kontrol edin
3. Farklı bir cihazdan da test edin

## 📊 JSONBin.io Limitleri (Ücretsiz Plan)

- ✅ Sınırsız bin
- ✅ Sınırsız request (makul kullanım)
- ✅ 32KB veri limiti (bin başına)
- ✅ Public/Private bin desteği

## 🔒 Güvenlik

- API Key'inizi asla GitHub'a commit etmeyin
- Environment variables kullanın
- API Key'i sadece Vercel dashboard'da saklayın

## 🐛 Sorun Giderme

### "JSONBin.io yapılandırılmamış" hatası
- Environment variables'ın doğru eklendiğinden emin olun
- Redeploy yaptığınızdan emin olun

### "JSONBin.io kayıt hatası" hatası
- API Key'in doğru olduğundan emin olun
- Bin ID'sinin doğru olduğundan emin olun
- JSONBin.io dashboard'da bin'in mevcut olduğunu kontrol edin

---

**Not:** Bu sistem Google Sheets'ten daha güvenilir ve kolay kurulumlu bir alternatiftir.

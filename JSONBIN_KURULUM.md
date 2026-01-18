# 📦 JSONBin.io Kurulum - Basit Rehber

## 🚀 Adım 1: Hesap Oluştur

1. https://jsonbin.io/ → "Sign Up" → Email ile kayıt ol

## 🔑 Adım 2: API Key Al

1. Dashboard → "API Keys" → "Create API Key"
2. API Key'i kopyala (uzun bir kod olacak)

## 📝 Adım 3: Bin Oluştur

1. JSONBin.io dashboard'unda (giriş yaptıktan sonra ana sayfa)
2. Sol tarafta veya üstte **"Create Bin"** veya **"New Bin"** butonuna tıkla
3. Açılan editörde içine şunu yaz: `[]` (boş array - köşeli parantezler)
4. Sağ üstte **"Create"** veya **"Save"** butonuna tıkla
5. Bin oluşturulduktan sonra URL'de veya bin detay sayfasında **Bin ID** görünecek (uzun bir kod, örnek: `507f1f77bcf86cd799439011`)
6. Bu **Bin ID**'yi kopyala

## ⚙️ Adım 4: Vercel'e Ekle

1. https://vercel.com/dashboard → Projeni seç
2. Settings → Environment Variables
3. Şu 3 değişkeni ekle:

**1. Değişken:**

- Name: `JSONBIN_API_URL`
- Value: `https://api.jsonbin.io/v3/b`

**2. Değişken:**

- Name: `JSONBIN_BIN_ID`
- Value: (Adım 3'te kopyaladığın Bin ID)

**3. Değişken:**

- Name: `JSONBIN_API_KEY`
- Value: (Adım 2'de kopyaladığın API Key)

**ÖNEMLİ:** Her değişkeni eklerken "Production, Preview, Development" hepsini seç!

## ✅ Adım 5: Redeploy

1. Vercel'de "Redeploy" butonuna tıkla
2. Bitti! Artık çalışıyor.

---

**Sorun mu var?** Environment variables'ı ekledikten sonra mutlaka redeploy yap!



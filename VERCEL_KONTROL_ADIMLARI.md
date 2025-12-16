# 🔍 Vercel'de Kontrol Edilecek Yerler - Adım Adım

## 📍 1. BUILD LOGS (Hata Mesajları)

### Adımlar:

1. **Vercel Dashboard**'a gidin: https://vercel.com/dashboard
2. **Projenize tıklayın** (personal-website)
3. Üstte **"Deployments"** sekmesine tıklayın
4. **En üstteki (en yeni) deployment'a tıklayın**
5. Açılan sayfada **"Build Logs"** sekmesine tıklayın
6. Orada **kırmızı renkli hata mesajları** var mı bakın
7. Varsa, **tüm hata mesajını kopyalayıp bana gönderin**

**Görsel Yol:**

```
Dashboard → Projeniz → Deployments → Son Deployment → Build Logs
```

---

## 📍 2. ROOT DIRECTORY AYARI

### Adımlar:

1. **Vercel Dashboard** > **Projenize tıklayın**
2. Üstte **"Settings"** sekmesine tıklayın
3. Sol menüden **"General"** seçeneğine tıklayın
4. Sayfada **"Root Directory"** yazan bir alan var
5. Orada ne yazıyor? Şunlardan biri olmalı:
   - Boş (hiçbir şey yok)
   - `./`
   - `./personal-website`
6. **Ne yazıyor söyleyin**

**Görsel Yol:**

```
Dashboard → Projeniz → Settings → General → Root Directory
```

---

## 📍 3. DEPLOYMENT DURUMU

### Adımlar:

1. **Vercel Dashboard** > **Projenize tıklayın**
2. **"Deployments"** sekmesine tıklayın
3. En üstteki deployment'ın yanında:
   - ✅ **Yeşil tik** = Başarılı
   - ❌ **Kırmızı X** = Hata var
   - ⏳ **Sarı saat** = Hala çalışıyor
4. **Hangi durumda olduğunu söyleyin**

---

## 📍 4. DOSYA YAPISI KONTROLÜ

### Adımlar:

1. **Vercel Dashboard** > **Projenize tıklayın**
2. **"Deployments"** sekmesine tıklayın
3. **En üstteki deployment'a tıklayın**
4. Açılan sayfada **"Source"** veya **"Files"** sekmesine tıklayın
5. Şu dosyalar görünüyor mu kontrol edin:
   - `vercel.json` ✅
   - `home page/` klasörü ✅
   - `admin/` klasörü ✅
6. **Hangi dosyalar görünüyor söyleyin**

---

## 📍 5. DOMAIN AYARLARI (Eğer Custom Domain Kullandıysanız)

### Adımlar:

1. **Vercel Dashboard** > **Projenize tıklayın**
2. **"Settings"** sekmesine tıklayın
3. Sol menüden **"Domains"** seçeneğine tıklayın
4. Orada domain'iniz var mı? (`muhammederenaydin.com`)
5. **Domain durumunu söyleyin**

---

## 🎯 HIZLI KONTROL LİSTESİ

Bana şunları söyleyin:

1. ✅ **Build Logs'ta hata var mı?** (Varsa mesajı kopyalayın)
2. ✅ **Root Directory ne yazıyor?** (Boş mu, `./` mi, `./personal-website` mi?)
3. ✅ **Deployment durumu nedir?** (Başarılı mı, hata mı?)
4. ✅ **vercel.json dosyası görünüyor mu?** (Source/Files sekmesinde)
5. ✅ **Hangi URL'yi açmaya çalışıyorsunuz?** (Ana sayfa mı, admin mi?)

---

## 📸 EKRAN GÖRÜNTÜSÜ İSTERSENİZ

Eğer yukarıdaki adımları takip edemiyorsanız:

1. Vercel Dashboard'u açın
2. Projenize tıklayın
3. **Ekran görüntüsü alın** (Windows: Win + Shift + S)
4. Bana gönderin, ben bakayım

---

**Not:** En önemlisi **Build Logs** sekmesindeki hata mesajları. Oraya bakın ve hata varsa bana gönderin! 🔍

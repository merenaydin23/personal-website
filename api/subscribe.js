// Vercel Serverless Function - Newsletter kayıt ekleme
// POST /api/subscribe
// JSONBin.io kullanarak veri saklama

const JSONBIN_API_URL =
  process.env.JSONBIN_API_URL || "https://api.jsonbin.io/v3/b";
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || "";
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || "";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS isteği için
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Sadece POST isteklerine izin ver
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, timestamp } = req.body;

    // Email validasyonu ve sanitization
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        error: "Geçersiz e-posta adresi",
      });
    }

    // XSS koruması - HTML tag'lerini temizle
    const sanitizedEmail = email.trim().replace(/[<>]/g, "").toLowerCase();

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz e-posta formatı",
      });
    }

    // Email uzunluk kontrolü (RFC 5321 - max 254 karakter)
    if (sanitizedEmail.length > 254) {
      return res.status(400).json({
        success: false,
        error: "E-posta adresi çok uzun",
      });
    }

    // Domain kontrolü
    const parts = sanitizedEmail.split("@");
    if (parts.length !== 2 || parts[0].length > 64) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz e-posta formatı",
      });
    }

    // Timestamp kontrolü ve validasyonu
    let recordTimestamp;
    if (timestamp && typeof timestamp === "string") {
      const timestampDate = new Date(timestamp);
      // Geçerli bir tarih mi kontrol et
      if (isNaN(timestampDate.getTime())) {
        recordTimestamp = new Date().toISOString();
      } else {
        // Gelecek tarih kontrolü (spam koruması)
        const now = new Date();
        const maxFutureTime = new Date(now.getTime() + 5 * 60 * 1000); // 5 dakika tolerans
        if (timestampDate > maxFutureTime) {
          recordTimestamp = new Date().toISOString();
        } else {
          recordTimestamp = timestamp;
        }
      }
    } else {
      recordTimestamp = new Date().toISOString();
    }

    // Tarih ve saat formatla
    const dateObj = new Date(recordTimestamp);
    const date = dateObj.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const time = dateObj.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Yeni kayıt oluştur
    const newRecord = {
      id: Date.now(),
      email: sanitizedEmail,
      date: date,
      time: time,
      timestamp: recordTimestamp,
    };

    // JSONBin.io kullanarak veri saklama
    if (JSONBIN_BIN_ID && JSONBIN_API_KEY) {
      try {
        // Mevcut verileri al
        const getResponse = await fetch(
          `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}/latest`,
          {
            headers: {
              "X-Master-Key": JSONBIN_API_KEY,
              "X-Bin-Meta": "false",
            },
          }
        );

        let existingData = [];
        if (getResponse.ok) {
          const data = await getResponse.json();
          existingData = Array.isArray(data) ? data : [];
        }

        // Email zaten var mı kontrol et
        if (existingData.some((item) => item.email === newRecord.email)) {
          return res.status(200).json({
            success: true,
            message: "Bu e-posta adresi zaten kayıtlı",
            data: newRecord,
          });
        }

        // Yeni kaydı ekle
        existingData.push(newRecord);

        // JSONBin.io'ya kaydet
        const putResponse = await fetch(
          `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": JSONBIN_API_KEY,
            },
            body: JSON.stringify(existingData),
          }
        );

        if (putResponse.ok) {
          return res.status(200).json({
            success: true,
            message: "Kayıt başarıyla eklendi",
            data: newRecord,
          });
        } else {
          const errorText = await putResponse.text();
          throw new Error(
            `JSONBin.io kayıt hatası: ${putResponse.status} - ${errorText}`
          );
        }
      } catch (binError) {
        console.error("JSONBin.io hatası:", binError);
        // JSONBin hatası olsa bile başarılı say (fallback)
        return res.status(200).json({
          success: true,
          message: "Kayıt alındı (depolama hatası olabilir)",
          data: newRecord,
        });
      }
    } else {
      // JSONBin yapılandırılmamışsa sadece başarılı yanıt döndür
      console.warn(
        "⚠️ JSONBin.io yapılandırılmamış! Environment variables kontrol edin."
      );
      return res.status(200).json({
        success: true,
        message: "Kayıt alındı (depolama yapılandırılmamış)",
        data: newRecord,
      });
    }
  } catch (error) {
    console.error("Subscribe API hatası:", error);
    return res.status(500).json({
      success: false,
      error: "Sunucu hatası",
      message: error.message,
    });
  }
}



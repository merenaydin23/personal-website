// Vercel Serverless Function - Newsletter kayıt ekleme
// POST /api/subscribe
// JSONBin.io kullanarak veri saklama

const JSONBIN_API_URL = process.env.JSONBIN_API_URL || "https://api.jsonbin.io/v3/b";
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

    // Email validasyonu
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz e-posta adresi",
      });
    }

    // Timestamp kontrolü
    const recordTimestamp = timestamp || new Date().toISOString();

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
      email: email.trim().toLowerCase(),
      date: date,
      time: time,
      timestamp: recordTimestamp,
    };

    // JSONBin.io kullanarak veri saklama
    if (JSONBIN_BIN_ID && JSONBIN_API_KEY) {
      try {
        // Mevcut verileri al
        const getResponse = await fetch(`${JSONBIN_API_URL}/${JSONBIN_BIN_ID}/latest`, {
          headers: {
            "X-Master-Key": JSONBIN_API_KEY,
            "X-Bin-Meta": "false",
          },
        });

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
        const putResponse = await fetch(`${JSONBIN_API_URL}/${JSONBIN_BIN_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": JSONBIN_API_KEY,
          },
          body: JSON.stringify(existingData),
        });

        if (putResponse.ok) {
          return res.status(200).json({
            success: true,
            message: "Kayıt başarıyla eklendi",
            data: newRecord,
          });
        } else {
          const errorText = await putResponse.text();
          throw new Error(`JSONBin.io kayıt hatası: ${putResponse.status} - ${errorText}`);
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
      console.warn("⚠️ JSONBin.io yapılandırılmamış! Environment variables kontrol edin.");
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

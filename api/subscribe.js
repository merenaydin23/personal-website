// Vercel Serverless Function - Newsletter kayıt ekleme
// POST /api/subscribe
// Google Sheets Web App üzerinden veri kaydetme

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycby08b6w6Ajpfhv-qf8qoYJsRI70dP1gOBEAw7cLT7_y0GrJ4ROqMD-pKg2EWCT1tM-4Wg/exec";

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

    const sanitizedEmail = email.trim().replace(/[<>]/g, "").toLowerCase();

    // Timestamp kontrolü ve validasyonu
    const recordTimestamp = timestamp || new Date().toISOString();

    // Yeni kayıt oluştur
    const newRecord = {
      email: sanitizedEmail,
      timestamp: recordTimestamp,
    };

    // Google Sheets'e post atıyoruz
    const fetchResponse = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      redirect: "follow",
      // Google Apps Script içerisinden problemsiz okunması için text/plain
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(newRecord)
    });

    if (fetchResponse.ok) {
      return res.status(200).json({
        success: true,
        data: newRecord,
      });
    } else {
      const errorText = await fetchResponse.text();
      console.error(`Google Sheets proxy hatası: ${fetchResponse.status} - ${errorText}`);
      // Kaydedilmese bile frontend'in bozulmaması için
      return res.status(200).json({
        success: true,
        message: "Kayıt alındı (depolama hatası olabilir)",
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

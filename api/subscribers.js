// Vercel Serverless Function - Newsletter kayıtlarını getirme
// GET /api/subscribers
// Google Sheets Web App üzerinden veri okuma

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycby08b6w6Ajpfhv-qf8qoYJsRI70dP1gOBEAw7cLT7_y0GrJ4ROqMD-pKg2EWCT1tM-4Wg/exec";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS isteği için
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Sadece GET isteklerine izin ver
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Google Sheets'ten veriyi fetch ile çekiyoruz
    const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getData`, {
      method: "GET",
      redirect: "follow",
    });

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      const errorText = await response.text();
      console.error(`Google Sheets HTTP hatası: ${response.status} - ${errorText}`);
      return res.status(200).json([]);
    }
  } catch (error) {
    console.error("Subscribers API hatası:", error);
    return res.status(500).json({
      success: false,
      error: "Sunucu hatası",
      message: error.message,
    });
  }
}

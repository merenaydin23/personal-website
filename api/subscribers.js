// Vercel Serverless Function - Newsletter kayıtlarını getirme
// GET /api/subscribers
// JSONBin.io kullanarak veri okuma

const JSONBIN_API_URL =
  process.env.JSONBIN_API_URL || "https://api.jsonbin.io/v3/b";
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || "";
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || "";

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
    // JSONBin.io'dan veri çek
    if (JSONBIN_BIN_ID && JSONBIN_API_KEY) {
      try {
        const response = await fetch(
          `${JSONBIN_API_URL}/${JSONBIN_BIN_ID}/latest`,
          {
            headers: {
              "X-Master-Key": JSONBIN_API_KEY,
              "X-Bin-Meta": "false",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const subscribers = Array.isArray(data) ? data : [];

          // Veri formatını düzelt
          const formattedData = subscribers.map((item, index) => ({
            id: item.id || index + 1,
            email: item.email || "",
            date: item.date || "",
            time: item.time || "",
          }));

          return res.status(200).json(formattedData);
        } else {
          const errorText = await response.text();
          console.error(
            `JSONBin.io HTTP hatası: ${response.status} - ${errorText}`
          );
          return res.status(200).json([]);
        }
      } catch (binError) {
        console.error("JSONBin.io okuma hatası:", binError);
        return res.status(200).json([]);
      }
    } else {
      // JSONBin yapılandırılmamışsa boş array döndür
      console.warn(
        "⚠️ JSONBin.io yapılandırılmamış! Environment variables kontrol edin."
      );
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



// Vercel Serverless Function - Newsletter kayıtlarını getirme
// GET /api/subscribers
// Basit JSON dosyası ile veri okuma

import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

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
    // Veri dosyasını oku
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(200).json([]);
    }

    try {
      const fileContent = fs.readFileSync(DATA_FILE, "utf8");
      const data = JSON.parse(fileContent);

      if (!Array.isArray(data)) {
        return res.status(200).json([]);
      }

      // Veri formatını düzelt
      const formattedData = data.map((item, index) => ({
        id: item.id || index + 1,
        email: item.email || "",
        date: item.date || "",
        time: item.time || "",
      }));

      return res.status(200).json(formattedData);
    } catch (readError) {
      console.error("Veri dosyası okuma hatası:", readError);
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

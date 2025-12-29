// Vercel Serverless Function - Newsletter kayıt ekleme
// POST /api/subscribe
// Basit JSON dosyası ile veri saklama (Vercel KV yerine)

import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

// Veri dosyasını oluştur (yoksa)
function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf8");
  }
}

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

    // Veri dosyasını oluştur
    ensureDataFile();

    // Mevcut verileri oku
    let existingData = [];
    try {
      const fileContent = fs.readFileSync(DATA_FILE, "utf8");
      existingData = JSON.parse(fileContent);
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
    } catch (readError) {
      console.error("Veri dosyası okuma hatası:", readError);
      existingData = [];
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

    // Veri dosyasına kaydet
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2), "utf8");
      return res.status(200).json({
        success: true,
        message: "Kayıt başarıyla eklendi",
        data: newRecord,
      });
    } catch (writeError) {
      console.error("Veri dosyası yazma hatası:", writeError);
      return res.status(500).json({
        success: false,
        error: "Veri kaydedilemedi",
        message: writeError.message,
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

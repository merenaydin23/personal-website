function doPost(e) {
  try {
    // Google Sheets'i aç
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Gelen veriyi parse et (hem JSON hem form data desteği)
    let data;
    if (e.postData && e.postData.contents) {
      // JSON formatında geliyorsa
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Form data formatında geliyorsa
      data = {
        email: e.parameter.email,
        timestamp: e.parameter.timestamp || new Date().toISOString(),
      };
    } else {
      throw new Error("No data received");
    }

    const email = data.email;
    const timestamp = new Date(data.timestamp);

    // Tarih ve saat formatla
    const date = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      "dd.MM.yyyy"
    );
    const time = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      "HH:mm:ss"
    );

    // Yeni satıra veri ekle
    sheet.appendRow([email, date, time]);

    // Başarılı yanıt döndür
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Email başarıyla kaydedildi" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Hata durumunda
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    // Admin panelinden veri okuma isteği
    if (e.parameter.action === "getData") {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const data = sheet.getDataRange().getValues();
      
      // İlk satırı (başlıkları) atla
      const rows = data.slice(1);
      
      // Verileri JSON formatına çevir
      const result = rows.map((row, index) => {
        return {
          id: index + 1,
          email: row[0] || "",
          date: row[1] || "",
          time: row[2] || "",
        };
      });
      
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Varsayılan yanıt
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Newsletter API is running", action: "Use ?action=getData to get data" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

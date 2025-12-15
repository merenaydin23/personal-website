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
  return ContentService.createTextOutput(
    "Newsletter API is running"
  ).setMimeType(ContentService.MimeType.TEXT);
}

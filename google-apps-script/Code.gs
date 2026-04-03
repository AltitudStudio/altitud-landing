// Altitud Studio - Google Apps Script Integration
const FOLDER_ID = "YOUR_DRIVE_FOLDER_ID"; // Reemplaza con el ID de la carpeta de Google Drive
const SHEET_NAME = "Feedback"; // Asegúrate de que tu hoja de cálculo se llame así

function doGet(e) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const files = folder.getFiles();
    const images = [];

    while (files.hasNext()) {
      const file = files.next();
      // Obtenemos solo el ID para construir URLs públicas (asegúrate de que la carpeta sea pública)
      const url = "https://drive.google.com/uc?id=" + file.getId();
      images.push(url);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, images }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error("Sheet '" + SHEET_NAME + "' not found.");
    }

    // Datos parseados desde la web (Next.js)
    const data = JSON.parse(e.postData.contents);
    
    // Columnas esperadas: [Fecha, Nombre, Comentario, Rating]
    sheet.appendRow([new Date(), data.nombre, data.comentario, data.rating]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
//  GOOGLE SHEETS — Guardar citas via Apps Script endpoint
// ============================================================

const Sheets = {

  // Guardar cita enviando al Apps Script
  async saveCita(cita) {
    try {
      const res = await fetch(CONFIG.sheets.scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(cita),
        mode: "no-cors"
      });
      console.log("Cita enviada al Apps Script");
      return true;
    } catch(e) {
      console.error("Error guardando cita:", e);
      return false;
    }
  },

  // Leer citas (para el admin) — usa API Key solo para lectura
  async getCitas() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheets.sheetId}/values/${CONFIG.sheets.sheetName}!A2:O1000?key=${CONFIG.sheets.apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.values) return [];
      return data.values.map(row => ({
        id:          row[0]  || "",
        agendado:    row[1]  || "",
        nombre:      row[2]  || "",
        telefono:    row[3]  || "",
        correo:      row[4]  || "",
        servicio:    row[5]  || "",
        categoria:   row[6]  || "",
        precioTotal: row[7]  || "",
        abono:       row[8]  || "",
        restante:    row[9]  || "",
        fecha:       row[10] || "",
        hora:        row[11] || "",
        nota:        row[12] || "",
        estado:      row[13] || "",
        comprobante: row[14] || "",
      }));
    } catch(e) {
      console.error("Error leyendo citas:", e);
      return [];
    }
  },

  // Inicializar (no hace nada, el Apps Script crea los headers)
  async initSheet() {
    console.log("Sheet conectado via Apps Script ✓");
  },
};

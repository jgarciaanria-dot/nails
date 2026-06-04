// ============================================================
//  GOOGLE SHEETS — Guardar y leer citas
// ============================================================

const Sheets = {

  // Encabezados de la hoja
  HEADERS: [
    "ID Cita", "Fecha Agendado", "Nombre Cliente", "Teléfono",
    "Correo", "Servicio", "Categoría", "Precio Total", "Abono",
    "Restante", "Fecha Cita", "Hora", "Nota", "Estado", "Comprobante Yappy"
  ],

  // Inicializar hoja con encabezados (llamar una vez)
  async initSheet() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheets.sheetId}/values/${CONFIG.sheets.sheetName}!A1:O1?key=${CONFIG.sheets.apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.values) {
        await this.appendRow(this.HEADERS);
      }
    } catch (e) {
      console.error("Error inicializando sheet:", e);
    }
  },

  // Guardar una cita nueva
  async saveCita(cita) {
    const id = "CITA-" + Date.now();
    const ahora = new Date().toLocaleString("es-PA", { timeZone: "America/Panama" });
    const row = [
      id,
      ahora,
      cita.nombre,
      cita.telefono,
      cita.correo || "",
      cita.servicio,
      cita.categoria,
      "$" + cita.precioTotal.toFixed(2),
      "$15.00",
      "$" + (cita.precioTotal - 15).toFixed(2),
      cita.fecha,
      cita.hora,
      cita.nota || "",
      "Pendiente confirmación",
      cita.comprobante || ""
    ];
    await this.appendRow(row);
    return id;
  },

  // Agregar fila al sheet
  async appendRow(values) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheets.sheetId}/values/${CONFIG.sheets.sheetName}!A1:append?valueInputOption=USER_ENTERED&key=${CONFIG.sheets.apiKey}`;
    const body = { values: [values] };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return await res.json();
    } catch (e) {
      console.error("Error guardando en sheet:", e);
    }
  },

  // Leer todas las citas (para el admin)
  async getCitas() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheets.sheetId}/values/${CONFIG.sheets.sheetName}!A2:O1000?key=${CONFIG.sheets.apiKey}`;
    try {
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
    } catch (e) {
      console.error("Error leyendo citas:", e);
      return [];
    }
  },

};

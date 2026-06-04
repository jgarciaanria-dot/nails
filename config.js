// ============================================================
//  VICELLY SÁNCHEZ STUDIO NAILS — Configuración
//  Reemplaza los valores TU_... con tus datos reales
// ============================================================

const CONFIG = {

  // ── YAPPY COMERCIAL ─────────────────────────────────────
  yappy: {
    apiKey:     "RQDVX-56670388",        // API Key de Yappy Comercial
    secretKey:  "WVBfOTEwNUUxMzItMzFDNC0zQkRELTg4NTYtNzRDNDJEN0IwMzFERQDVX-56670388",  // Clave Secreta de Yappy Comercial
    seedCode:   "QJHHW-29025149", // Código de Semilla de Yappy Comercial
    baseUrl:    "https://api.yappy.com.pa",
    // Link de pago Yappy (lo encuentras en tu portal Yappy Comercial → Botón de pago)
    paymentLinkBase: "https://link.yappy.com.pa/dyn/iNP04vBMZH6BYy6jcTLMthSk16Vdr9BZvaim7nGhYrA%3D",
  },

  // ── WHATSAPP NOTIFICACIONES ──────────────────────────────
  whatsapp: {
    number: "+50765224575",  // Tu número con código de país
  },

  // ── GOOGLE SHEETS ────────────────────────────────────────
  sheets: {
    // ID del Google Sheet (está en la URL: .../spreadsheets/d/ESTE_ID/edit)
    sheetId: "1AjLRrAbwhsq-hu4hMBdJJdC4mfZ8hLLVDedYT4iLeik",
    // Nombre de la hoja (pestaña)
    sheetName: "Citas",
    // API Key de Google (Google Cloud Console → APIs → Sheets API → Credenciales)
    apiKey: "AIzaSyDjFFbvoK8AY6nxbqlobaJEh4e-bDDYke4",
  },

  // ── NEGOCIO ──────────────────────────────────────────────
  business: {
    name:    "Vicelly Sánchez Studio Nails",
    tagline: "¡Bienvenidas! Selecciona el servicio que necesitas para tus uñas.",
    whatsapp: "+50765224575",
    abono:   15.00,
    abonoExpireMinutes: 60,
  },

};

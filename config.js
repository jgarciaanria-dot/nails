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
  scriptUrl: "https://script.google.com/macros/s/AKfycbzoLzn5BL0-LXxx2mnUkv4N2-lG7qyrswbhKVc6FhBd2EnbYMC-Uhst2YHQl8DKXqe8og/exec",
  sheetName: "Citas",
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

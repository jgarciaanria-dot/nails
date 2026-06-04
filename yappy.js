// ============================================================
//  YAPPY — Integración de pagos
// ============================================================

const Yappy = {

  token: null,

  // Generar hash SHA-256 (API Key + Fecha + Secret Key como clave)
  async generateHash() {
    const fecha = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const mensaje = CONFIG.yappy.apiKey + fecha;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(CONFIG.yappy.secretKey);
    const msgData = encoder.encode(mensaje);
    const cryptoKey = await crypto.subtle.importKey(
      "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  },

  // Iniciar sesión en Yappy Comercial
  async login() {
    try {
      const hash = await this.generateHash();
      const res = await fetch(`${CONFIG.yappy.baseUrl}/v1/session/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": CONFIG.yappy.apiKey,
          "Secret-Key": CONFIG.yappy.secretKey,
        },
        body: JSON.stringify({ body: { seed: hash, clientId: CONFIG.yappy.apiKey } })
      });
      const data = await res.json();
      if (data.token) {
        this.token = data.token;
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error login Yappy:", e);
      return false;
    }
  },

  // Generar link de pago Yappy para el abono
  // Yappy Comercial genera links de pago desde el portal o via botón de pago
  generatePaymentLink(monto, descripcion, referencia) {
    // Formato de link de pago Yappy: alias + monto + descripción
    const base = CONFIG.yappy.paymentLinkBase;
    const params = new URLSearchParams({
      amount: monto.toFixed(2),
      description: descripcion,
      reference: referencia,
    });
    return `${base}?${params.toString()}`;
  },

  // Verificar si un pago fue completado consultando el historial
  async verificarPago(referencia) {
    if (!this.token) await this.login();
    if (!this.token) return null;
    try {
      const res = await fetch(`${CONFIG.yappy.baseUrl}/v1/movement/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
          "Api-Key": CONFIG.yappy.apiKey,
        },
        body: JSON.stringify({
          body: {
            filters: [{ id: "ROLE", value: "CREDIT" }]
          }
        })
      });
      const data = await res.json();
      if (data.movements) {
        const pago = data.movements.find(m =>
          m.metadata && m.metadata.some(meta => meta.value === referencia)
        );
        return pago || null;
      }
      return null;
    } catch (e) {
      console.error("Error verificando pago:", e);
      return null;
    }
  },

  // Generar link de WhatsApp con instrucciones de pago
  generarMensajeWhatsApp(cita, monto, linkPago) {
    const msg = `Hola Vicelly! 💅 Acabo de agendar una cita:\n\n` +
      `*Servicio:* ${cita.servicio}\n` +
      `*Fecha:* ${cita.fecha}\n` +
      `*Hora:* ${cita.hora}\n` +
      `*Abono:* $${monto.toFixed(2)}\n\n` +
      `Te envío el comprobante del pago por Yappy 🙏`;
    return `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
  },

  // Notificar a Vicelly por WhatsApp cuando llega una cita
  generarNotificacionAdmin(cita) {
    const msg = `🌸 *Nueva cita agendada!*\n\n` +
      `*Clienta:* ${cita.nombre}\n` +
      `*Tel:* ${cita.telefono}\n` +
      `*Servicio:* ${cita.servicio}\n` +
      `*Fecha:* ${cita.fecha} a las ${cita.hora}\n` +
      `*Total:* $${cita.precioTotal.toFixed(2)}\n` +
      `*Abono:* $15.00\n` +
      `*Restante:* $${(cita.precioTotal - 15).toFixed(2)}\n` +
      (cita.nota ? `*Nota:* ${cita.nota}\n` : "") +
      `\n_Revisa el panel admin para confirmar._`;
    return `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
  },
};

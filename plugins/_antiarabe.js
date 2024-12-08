export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;

  let forbidPrefixes = ["212", "965", "973", "971", "20", "964", "963", "966", "971", "968", "255", "249", "971", "971", "962"];
  
  const senderNumber = m.sender.split('@')[0];
  const hasForbiddenPrefix = forbidPrefixes.some(prefix => senderNumber.startsWith(prefix));

  if (hasForbiddenPrefix) {
    await m.reply(`> "🥵 puta @${senderNumber}, Lo Siento No Esta 🌹Permitido Escribirme Al Privado 🌷Por Lo Cual Seras Bloqueado/A\n\n> *🍒Puedes Unirte Al Grupo Oficial De La Bot🪷* 👇\n\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
    return !1;
  }

  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiarabe && !isOwner && !isROwner) {
    return !1;
  }
  
  return !0;
}
const fetch = require('node-fetch');

module.exports = {
  name: 'tempo',
  async execute({ message, args }) {
    const cidade = args.join(' ') || 'São Paulo';
    try {
      const url = `https://wttr.in/${encodeURIComponent(cidade)}?format=%l:+%C+🌡️%t+💧%h+💨%w`;
      const res = await fetch(url);
      const clima = await res.text();
      message.reply(`🌤️ ${clima}`);
    } catch (e) {
      message.reply('Erro ao buscar o tempo.');
    }
  }
};
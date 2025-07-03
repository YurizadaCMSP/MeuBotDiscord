const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'uptime',
  async execute({ client, message, moment }) {

    // Processar tempo
    const duration = moment.duration(client.uptime).format('D[d] H[h] m[m] s[s]');
    const started = moment(Date.now() - client.uptime).format('LLL');

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle('🟣 | Status do Bot - Servidor Khaos')
      .setDescription('✅ O bot está funcionando normalmente.\nAqui estão as informações atualizadas:')
      .addFields(
        { name: '🕒 | Online há', value: `\`${duration}\``, inline: true },
        { name: '🗓️ | Iniciado em', value: `\`${started}\``, inline: true }
      )
      .setColor('#8e44ad')
      .setFooter({ text: 'Servidor Khaos | Monitoramento do Bot' })
      .setTimestamp();

    // Responder ao usuário
    await message.reply({ embeds: [embed] });
  }
};
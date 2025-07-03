const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'botinfo',
  async execute({ client, message, commandsInfo, moment }) {

    // Formatar tempo de atividade
    const uptime = moment.duration(client.uptime).format('D[d] H[h] m[m] s[s]');
    const memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;

    const embed = new MessageEmbed()
      .setTitle('💜 | Informações do Bot - Servidor Khaos')
      .setColor('#8e44ad')
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription('🤖 Este bot foi desenvolvido exclusivamente para o servidor **Khaos**.\n\nVeja as informações detalhadas abaixo:')
      .addFields(
        { name: '👤 Criador', value: 'YurizadaCMSP', inline: true },
        { name: '🌐 Servidores Ativos', value: `${client.guilds.cache.size}`, inline: true },
        { name: '👥 Usuários Atendidos', value: `${client.users.cache.size}`, inline: true },
        { name: '⏳ Online há', value: uptime, inline: true },
        { name: '💾 Memória', value: memory, inline: true },
        { name: '🟢 Node.js', value: process.version, inline: true },
        { name: '📦 Discord.js', value: require('discord.js').version, inline: true },
        { name: '📜 Comandos', value: `${commandsInfo.length}`, inline: true }
      )
      .setFooter({ text: `🤖 ID do Bot: ${client.user.id} • Desenvolvido por YurizadaCMSP` })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }
};
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const os = require('os');

module.exports = {
  name: 'painel',
  async execute({ client, message, moment }) {

    // Somente você pode acessar
    if (message.author.id !== '1291813395850465291') {
      return message.reply('❗ Você não tem permissão para acessar este painel.');
    }

    // Coleta de informações
    const uptime = moment.duration(client.uptime).format('D[d] H[h] m[m] s[s]');
    const started = moment(Date.now() - client.uptime).format('LLL');
    const memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
    const totalMem = `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;
    const cpu = os.cpus()[0].model;
    const cpuUsage = process.cpuUsage();
    const platform = os.platform();
    const nodeVersion = process.version;
    const discordVersion = require('discord.js').version;
    const pingAPI = Math.round(client.ws.ping);

    // Calcular tempo de resposta do host
    const startPing = Date.now();
    await message.channel.sendTyping();
    const hostPing = Date.now() - startPing;

    // Criar embed do painel
    const embed = new MessageEmbed()
      .setTitle('🛠️ | Painel Administrativo Exclusivo')
      .setColor('#8e44ad')
      .setDescription('📊 Informações detalhadas do sistema e do bot.')
      .addFields(
        { name: '🕒 | Uptime', value: uptime, inline: true },
        { name: '📅 | Iniciado em', value: started, inline: true },
        { name: '📡 | Ping API', value: `${pingAPI}ms`, inline: true },
        { name: '⚙️ | Ping do Host', value: `${hostPing}ms`, inline: true },
        { name: '💾 | Memória Usada', value: `${memory} / ${totalMem}`, inline: true },
        { name: '🖥️ | CPU', value: cpu, inline: true },
        { name: '💻 | Plataforma', value: platform, inline: true },
        { name: '🟣 | Node.js', value: nodeVersion, inline: true },
        { name: '🔗 | Discord.js', value: discordVersion, inline: true },
        { name: '🏠 | Servidores', value: `${client.guilds.cache.size}`, inline: true },
        { name: '👥 | Usuários', value: `${client.users.cache.size}`, inline: true },
        { name: '💬 | Canais', value: `${client.channels.cache.size}`, inline: true }
      )
      .setFooter({ text: 'Servidor Khaos | Painel Exclusivo do Desenvolvedor' })
      .setTimestamp();

    // Criar botão de reinício
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton().setCustomId('reiniciar').setLabel('🔄 Reiniciar Bot').setStyle('DANGER')
      );

    // Enviar painel
    const painelMsg = await message.reply({ embeds: [embed], components: [row] });

    // Coletar interação
    const collector = painelMsg.createMessageComponentCollector({ time: 60000 });

    collector.on('collect', async interaction => {
      if (interaction.user.id !== '1291813395850465291') {
        return interaction.reply({ content: '❗ Você não pode usar esse painel.', ephemeral: true });
      }

      if (interaction.customId === 'reiniciar') {
        await interaction.update({ content: '♻️ Reiniciando o bot...', components: [] });
        console.log('Bot reiniciado pelo administrador.');

        // Reiniciar o bot (finaliza o processo)
        process.exit();
      }
    });

    collector.on('end', () => {
      painelMsg.edit({ components: [] }).catch(() => { });
    });
  }
};
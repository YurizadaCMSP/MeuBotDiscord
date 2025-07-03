const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  async execute({ client, message, moment }) {

    // Mensagem inicial de carregamento
    const msg = await message.reply('🏓 Calculando a velocidade...');

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle('🏓 | Teste de Velocidade - Servidor Khaos')
      .setDescription('Confira abaixo os detalhes da conexão:')
      .addFields(
        { name: '🤖 Latência do Bot', value: `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, inline: true },
        { name: '🌐 Latência da API Discord', value: `\`${Math.round(client.ws.ping)}ms\``, inline: true },
        { name: '💾 Uso de Memória', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: '⏳ Tempo de Atividade', value: moment.duration(client.uptime).format('D[d] H[h] m[m] s[s]'), inline: true }
      )
      .setColor('#8e44ad')
      .setFooter({ text: 'Servidor Khaos | Sistema de Monitoramento' })
      .setTimestamp();

    // Editar resposta com embed
    await msg.edit({ content: null, embeds: [embed] });
  }
};
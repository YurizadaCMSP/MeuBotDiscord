const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'ajuda',
  async execute({ client, message, commandsInfo }) {

    // Troque pela URL da imagem do servidor Khaos
    const serverThumbnail = 'https://link-da-imagem-do-servidor.png';

    const embed = new MessageEmbed()
      .setTitle('💜 | Comandos do Bot - Servidor Khaos')
      .setColor('#8e44ad') // Roxo elegante
      .setThumbnail(serverThumbnail)
      .setDescription('✨ Este bot é **exclusivo do servidor Khaos!**\n\n🔧 **Prefixo:** `!`\n\nVeja abaixo os comandos disponíveis:')
      .addFields(commandsInfo.map(c => ({
        name: `🔹 ${c.name}`,
        value: `${c.desc}`,
        inline: false
      })))
      .setFooter({ text: `🤖 Desenvolvido por YurizadaCMSP | Total: ${commandsInfo.length} comandos` })
      .setTimestamp();

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('➕ Adicionar o Bot')
          .setStyle('LINK')
          .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),
        new MessageButton()
          .setLabel('💬 Suporte')
          .setStyle('LINK')
          .setURL('https://discord.gg/seuLinkDeSuporte') // Troque pelo link do suporte se desejar
      );

    message.reply({ embeds: [embed], components: [row] });
  }
};
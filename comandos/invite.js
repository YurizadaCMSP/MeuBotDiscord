const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'invite',
  async execute({ client, message }) {

    // Gerar link de convite
    const url = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle('💜 | Convite do Bot - Servidor Khaos')
      .setDescription('🚀 Adicione este bot incrível ao seu servidor e aproveite todas as funcionalidades exclusivas!\n\nClique no botão abaixo para convidar.')
      .setColor('#8e44ad')
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: 'Servidor Khaos | Sistema de Convite' })
      .setTimestamp();

    // Criar botão de convite
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('➕ Convidar o Bot')
          .setStyle('LINK')
          .setURL(url)
      );

    // Enviar resposta com embed e botão
    await message.reply({ embeds: [embed], components: [row] });
  }
};
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'avatar',
  async execute({ message }) {
    const user = message.mentions.users.first() || message.author;

    const embed = new MessageEmbed()
      .setTitle(`🖼️ | Avatar de ${user.username}`)
      .setColor('#8e44ad') // Roxo elegante
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription('✨ Este é o avatar em alta qualidade.\n\n🔮 Comando exclusivo do servidor **Khaos**!')
      .setFooter({ text: `🆔 ID do usuário: ${user.id}` })
      .setTimestamp();

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('🔍 Download em HD')
          .setStyle('LINK')
          .setURL(user.displayAvatarURL({ dynamic: true, size: 4096 }))
      );

    await message.reply({ embeds: [embed], components: [row] });
  }
};
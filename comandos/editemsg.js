const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'editemsg',
  async execute({ message }) {
    const embed = new MessageEmbed()
      .setDescription('Mensagem original')
      .setColor('#95a5a6');
    const msg = await message.channel.send({ embeds: [embed] });
    setTimeout(() => {
      embed.setDescription('Mensagem editada!').setColor('#27ae60');
      msg.edit({ embeds: [embed] });
    }, 3000);
  }
};
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'say',
  async execute({ message, args }) {

    // Verificar se o usuário digitou algo
    if (!args.length) {
      return message.reply('❗ Você precisa digitar algo para eu falar.');
    }

    // Juntar o texto
    const texto = args.join(' ');

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle('💬 | Mensagem Personalizada - Servidor Khaos')
      .setDescription(texto)
      .setColor('#8e44ad')
      .setFooter({ text: `Solicitado por ${message.author.username}` })
      .setTimestamp();

    // Excluir a mensagem original para deixar o chat limpo
    try {
      await message.delete();
    } catch (err) {
      console.log('Não foi possível excluir a mensagem original.');
    }

    // Enviar embed no canal
    await message.channel.send({ embeds: [embed] });
  }
};
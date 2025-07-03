const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'random',
  async execute({ message, args }) {

    // Processar os argumentos
    let min = parseInt(args[0]) || 1;
    let max = parseInt(args[1]) || 100;

    // Trocar caso os números sejam invertidos
    if (min > max) [min, max] = [max, min];

    // Gerar número aleatório
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle('🎲 | Sorteio de Número - Servidor Khaos')
      .setDescription(`O número sorteado foi: **${num}** 🎉\n\nFaixa: \`${min}\` até \`${max}\``)
      .setColor('#8e44ad')
      .setFooter({ text: 'Servidor Khaos | Sorteio Aleatório' })
      .setTimestamp();

    // Responder ao usuário
    await message.reply({ embeds: [embed] });
  }
};
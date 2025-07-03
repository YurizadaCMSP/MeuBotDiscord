const { MessageEmbed } = require('discord.js');

// Função para pausar
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'coinflip',
  async execute({ message }) {

    // Gifs animados
    const coinGifs = [
      'https://media.discordapp.net/attachments/837373738071941140/1129082204164933762/coinflip.gif',
      'https://media.giphy.com/media/Z5zuypybISt2w/giphy.gif'
    ];

    // Escolher gif aleatório
    const gifSelecionado = coinGifs[Math.floor(Math.random() * coinGifs.length)];

    // Embed inicial
    const embed = new MessageEmbed()
      .setTitle('🪙 | Coinflip - Servidor Khaos')
      .setDescription('✨ Girando a moeda...\nAguarde o resultado!')
      .setImage(gifSelecionado)
      .setColor('#8e44ad')
      .setFooter({ text: 'Servidor Khaos | Jogo de Coinflip' })
      .setTimestamp();

    // Enviar mensagem inicial
    const msg = await message.reply({ embeds: [embed] });

    // Aguardar 2.5 segundos
    await wait(2500);

    // Gerar resultado
    const resultado = Math.random() < 0.5 ? '🎩 Cara' : '👑 Coroa';

    // Atualizar embed com resultado
    embed
      .setDescription(`✨ O resultado foi: **${resultado}**!\n\nUse \`!coinflip\` novamente para jogar de novo!`)
      .setImage() // Remove o gif depois do giro
      .setFooter({ text: `Servidor Khaos | Coinflip realizado por ${message.author.tag}` });

    // Editar mensagem com resultado
    await msg.edit({ embeds: [embed] });
  }
};
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'meme',
  async execute({ message }) {
    try {
      const apis = [
        'https://meme-api.com/gimme',
        'https://some-random-api.ml/meme'
      ];
      const apiEscolhida = apis[Math.floor(Math.random() * apis.length)];
      const resposta = await fetch(apiEscolhida);
      const dados = await resposta.json();

      // Pegar título, imagem e link de forma segura
      const titulo = dados.title || 'Meme aleatório do dia';
      const imagem = dados.url || dados.image || null;
      const link = dados.postLink || dados.link || 'https://reddit.com';

      // Embed personalizado
      const embed = new MessageEmbed()
        .setTitle(`🤣 Meme para você - Servidor Khaos`)
        .setDescription(`📢 **${titulo}**\n\nQuer ver mais memes? Acesse o [Reddit](https://reddit.com)!`)
        .setImage(imagem)
        .setURL(link)
        .setColor('#8e44ad') // Roxo Khaos
        .setFooter({ text: `🖤 Memes fresquinhos para alegrar seu dia!` })
        .setTimestamp();

      await message.reply({ embeds: [embed] });

    } catch (error) {
      await message.reply('⚠️ Opa, deu ruim ao tentar pegar o meme... tenta de novo, por favor!');
      console.error('Erro no comando meme:', error);
    }
  }
};
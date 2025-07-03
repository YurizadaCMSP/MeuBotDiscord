const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sorteio',
  async execute({ message, args, client }) {

    // Validação básica
    if (args.length < 3) {
      return message.reply('❗ Use o comando corretamente: `!sorteio (tempo) (prêmio) (quantidade de ganhadores)`\nExemplo: `!sorteio 5m Civic G10 Preto 3`');
    }

    // Processar tempo
    const tempoInput = args[0];
    const tempoMS = parseTempo(tempoInput);
    if (!tempoMS) return message.reply('❗ Tempo inválido. Exemplo de tempo válido: `5s`, `2m`, `1h`');

    // Processar quantidade de ganhadores
    const quantidade = parseInt(args[args.length - 1]);
    if (isNaN(quantidade) || quantidade < 1) return message.reply('❗ Quantidade de ganhadores inválida.');

    // Processar prêmio
    const premio = args.slice(1, -1).join(' ');

    // Criar embed do sorteio
    const embed = new MessageEmbed()
      .setTitle('🎁 | Sorteio Iniciado - Servidor Khaos')
      .setDescription(`🎉 Clique no emoji para participar!\n\n🏆 **Prêmio:** ${premio}\n⏳ **Tempo:** ${tempoInput}\n👥 **Quantidade de ganhadores:** ${quantidade}`)
      .setColor('#8e44ad')
      .setFooter({ text: `Sorteio iniciado por ${message.author.username}` })
      .setTimestamp();

    // Enviar sorteio
    const sorteioMsg = await message.channel.send({ embeds: [embed] });
    await sorteioMsg.react('🎉');

    // Finalizar sorteio após o tempo
    setTimeout(async () => {
      const fetched = await sorteioMsg.reactions.cache.get('🎉').users.fetch();
      const participantes = fetched.filter(u => !u.bot).map(u => u.id);

      if (participantes.length === 0) {
        return sorteioMsg.reply('❗ Sorteio finalizado: ninguém participou.');
      }

      // Sortear ganhadores
      let ganhadores = [];
      for (let i = 0; i < Math.min(quantidade, participantes.length); i++) {
        const sorteado = participantes.splice(Math.floor(Math.random() * participantes.length), 1)[0];
        ganhadores.push(`<@${sorteado}>`);
      }

      // Mensagem final
      const resultadoEmbed = new MessageEmbed()
        .setTitle('🎉 | Sorteio Finalizado!')
        .setDescription(`🏆 **Prêmio:** ${premio}\n\n👑 **Ganhadores:**\n${ganhadores.join('\n')}`)
        .setColor('#8e44ad')
        .setFooter({ text: 'Servidor Khaos | Parabéns aos vencedores!' })
        .setTimestamp();

      await sorteioMsg.reply({ embeds: [resultadoEmbed] });

    }, tempoMS);
  }
};

// Função para converter tempo (ex: 5s, 2m, 1h)
function parseTempo(tempo) {
  const match = tempo.match(/^(\d+)(s|m|h)$/);
  if (!match) return null;

  const valor = parseInt(match[1]);
  const unidade = match[2];

  switch (unidade) {
    case 's': return valor * 1000;
    case 'm': return valor * 60 * 1000;
    case 'h': return valor * 60 * 60 * 1000;
    default: return null;
  }
}
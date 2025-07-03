const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
  name: 'clear',
  async execute({ message, args }) {

    // Verificação de permissão
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply('🚫 Você não tem permissão para apagar mensagens.');
    }

    // Quantidade de mensagens
    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1) amount = 5;
    if (amount > 1000) amount = 1000;

    // Mensagem de confirmação
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('clear_confirm')
          .setLabel('✅ Confirmar')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('clear_cancel')
          .setLabel('❌ Cancelar')
          .setStyle('DANGER')
      );

    const confirmEmbed = new MessageEmbed()
      .setTitle('🧹 | Confirmação de Limpeza')
      .setDescription(`Deseja apagar **${amount} mensagens** deste canal?`)
      .setColor('#8e44ad')
      .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
      .setTimestamp();

    const msg = await message.reply({ embeds: [confirmEmbed], components: [row] });

    const filter = i => i.user.id === message.author.id;
    const collector = msg.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'clear_confirm') {
        let deleted = 0;

        try {
          while (amount > 0) {
            const toDelete = amount > 100 ? 100 : amount;
            const messages = await message.channel.bulkDelete(toDelete, true);
            deleted += messages.size;
            amount -= toDelete;

            // Discord pode demorar para excluir muitas mensagens antigas, limitações de 14 dias
            if (messages.size === 0) break;
          }

          const successEmbed = new MessageEmbed()
            .setTitle('✅ | Limpeza Concluída')
            .setDescription(`Foram apagadas **${deleted} mensagens** com sucesso!`)
            .setColor('#8e44ad')
            .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
            .setTimestamp();

          await i.update({ embeds: [successEmbed], components: [] });

        } catch (err) {
          const errorEmbed = new MessageEmbed()
            .setTitle('❗ | Erro ao Apagar')
            .setDescription('Ocorreu um erro ao tentar apagar as mensagens.\n\n*Lembre-se que só é possível apagar mensagens com até 14 dias.*')
            .setColor('#e74c3c')
            .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
            .setTimestamp();

          await i.update({ embeds: [errorEmbed], components: [] });
        }

      } else if (i.customId === 'clear_cancel') {
        const cancelEmbed = new MessageEmbed()
          .setTitle('🚫 | Limpeza Cancelada')
          .setDescription('A ação de limpeza foi cancelada com sucesso.')
          .setColor('#8e44ad')
          .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
          .setTimestamp();

        await i.update({ embeds: [cancelEmbed], components: [] });
      }

      collector.stop();
    });

    collector.on('end', (_, reason) => {
      if (reason.size === 0) {
        msg.edit({ content: '⏰ Tempo esgotado! Nenhuma ação foi realizada.', components: [] });
      }
    });
  }
};
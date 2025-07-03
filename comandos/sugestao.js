const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
  name: 'sugestao',
  async execute({ message, args, client }) {

    const sugestao = args.join(' ');
    if (!sugestao) return message.reply('❗ Escreva sua sugestão! Exemplo: `!sugestao Adicionar comandos novos`');

    const userId = message.author.id;
    const donoId = '1291813395850465291';

    // Embed da sugestão
    const sugestaoEmbed = new MessageEmbed()
      .setTitle('💡 | Nova Sugestão Recebida')
      .setDescription(`✍️ ${sugestao}`)
      .addField('👤 Usuário:', `<@${userId}>`, true)
      .setColor('#8e44ad')
      .setFooter({ text: 'Servidor Khaos | Sistema de Sugestões' })
      .setTimestamp();

    // Botões de aprovação
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton().setCustomId('aceitar').setLabel('✅ Aceitar').setStyle('SUCCESS'),
        new MessageButton().setCustomId('recusar').setLabel('❌ Recusar').setStyle('DANGER')
      );

    try {
      // Enviar confirmação para o autor
      await message.author.send({
        embeds: [
          new MessageEmbed()
            .setTitle('📬 | Sugestão Enviada com Sucesso')
            .setDescription(`Sua sugestão foi enviada para análise:\n\n✍️ ${sugestao}`)
            .setColor('#8e44ad')
            .setFooter({ text: 'Servidor Khaos | Acompanhe sua resposta em breve.' })
            .setTimestamp()
        ]
      });
    } catch (err) {
      console.log('Não foi possível enviar DM para o usuário.');
    }

    // Enviar sugestão para você (administrador)
    const dono = await client.users.fetch(donoId);
    const msgAdmin = await dono.send({ embeds: [sugestaoEmbed], components: [row] });

    // Criar coletor dos botões
    const collector = msgAdmin.createMessageComponentCollector({ time: 24 * 60 * 60 * 1000 }); // 24h

    collector.on('collect', async interaction => {
      if (interaction.user.id !== donoId) {
        return interaction.reply({ content: '❗ Você não pode responder essa sugestão.', ephemeral: true });
      }

      if (interaction.customId === 'aceitar') {
        await interaction.update({ content: '✅ Sugestão aceita.', components: [] });

        // Avisar o usuário
        try {
          const user = await client.users.fetch(userId);
          await user.send({
            embeds: [
              new MessageEmbed()
                .setTitle('✅ | Sua Sugestão foi Aceita!')
                .setDescription(`Parabéns! Sua sugestão foi aprovada pela equipe do **Servidor Khaos**.`)
                .setColor('#27ae60')
                .setTimestamp()
            ]
          });
        } catch (err) {
          console.log('Não foi possível enviar DM para o usuário.');
        }

        collector.stop();
      }

      if (interaction.customId === 'recusar') {
        await interaction.update({ content: '❌ Você recusou a sugestão. Por favor, envie o motivo da recusa agora nesta conversa.', components: [] });

        const filter = m => m.author.id === donoId;
        const motivoColetor = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

        motivoColetor.on('collect', async m => {
          const motivo = m.content;

          // Enviar recusa ao usuário
          try {
            const user = await client.users.fetch(userId);
            await user.send({
              embeds: [
                new MessageEmbed()
                  .setTitle('❌ | Sua Sugestão foi Recusada')
                  .setDescription(`Sua sugestão foi recusada pela equipe.\n\n📄 **Motivo:** ${motivo}`)
                  .setColor('#e74c3c')
                  .setTimestamp()
              ]
            });
          } catch (err) {
            console.log('Não foi possível enviar DM para o usuário.');
          }

          await m.reply('📨 O motivo foi enviado ao usuário com sucesso!');
        });

        motivoColetor.on('end', collected => {
          if (collected.size === 0) {
            msgAdmin.reply('⏰ Tempo esgotado para enviar o motivo.');
          }
        });

        collector.stop();
      }
    });

    // Confirmação no chat
    await message.reply('✅ Sua sugestão foi enviada com sucesso! Verifique sua DM.');
  }
};
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: 'kick',
  async execute({ message, args }) {

    // Verificar permissões
    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return message.reply('🚫 Você não tem permissão para expulsar membros.');
    }

    // Capturar o usuário mencionado
    const user = message.mentions.users.first();
    if (!user) return message.reply('❗ Mencione um usuário válido para expulsar.');

    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply('❗ Usuário não encontrado no servidor.');

    // Motivo
    const motivo = args.slice(1).join(' ') || 'Motivo não especificado.';

    // Tentar enviar DM
    try {
      const dmEmbed = new MessageEmbed()
        .setTitle('🚪 | Você foi expulso!')
        .setColor('#8e44ad')
        .setDescription(`Você foi expulso do servidor **${message.guild.name}**.\n\n📄 **Motivo:** ${motivo}\n\nSe você acredita que isso foi um erro, entre em contato com a equipe.`)
        .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
        .setTimestamp();

      await user.send({ embeds: [dmEmbed] });
    } catch (err) {
      console.log(`❗ Não foi possível enviar DM para ${user.tag}.`);
    }

    // Expulsar o usuário
    await member.kick(motivo);

    // Criar embed pública
    const kickEmbed = new MessageEmbed()
      .setTitle('🚪 | Usuário Expulso')
      .setColor('#8e44ad')
      .setDescription(`👤 O usuário **${user.tag}** foi expulso com sucesso!`)
      .addField('👮 Moderador responsável:', message.author.tag, true)
      .addField('📄 Motivo:', motivo, true)
      .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
      .setTimestamp();

    await message.reply({ embeds: [kickEmbed] });
  }
};
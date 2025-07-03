const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');

module.exports = {
  name: 'ban',
  async execute({ message, args }) {

    // Verificação de permissão
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return message.reply('🚫 Você não tem permissão para banir membros.');
    }

    // Capturar o usuário mencionado
    const user = message.mentions.users.first();
    if (!user) return message.reply('❗ Mencione um usuário válido para banir.');

    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply('❗ Usuário não encontrado no servidor.');

    // Motivo personalizado
    const motivo = args.slice(1).join(' ') || 'Motivo não especificado.';

    // Tentar enviar mensagem no privado
    try {
      const dmEmbed = new MessageEmbed()
        .setTitle('🚫 | Você foi banido!')
        .setColor('#8e44ad')
        .setDescription(`💢 Você foi banido do servidor **${message.guild.name}**.\n\n📄 **Motivo:** ${motivo}\n\nSe você acredita que isso foi um erro, entre em contato com a equipe do servidor.`)
        .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
        .setTimestamp();

      await user.send({ embeds: [dmEmbed] });
    } catch (err) {
      console.log(`❗ Não foi possível enviar DM para ${user.tag}.`);
    }

    // Banir o usuário
    await member.ban({ reason: motivo });

    // Embed pública informando o banimento
    const banEmbed = new MessageEmbed()
      .setTitle('🔨 | Usuário Banido')
      .setColor('#8e44ad')
      .setDescription(`🚷 O usuário **${user.tag}** foi banido com sucesso!`)
      .addField('👮 Moderador responsável:', message.author.tag, true)
      .addField('📄 Motivo:', motivo, true)
      .setFooter({ text: 'Servidor Khaos | Sistema de Moderação' })
      .setTimestamp();

    await message.reply({ embeds: [banEmbed] });
  }
};
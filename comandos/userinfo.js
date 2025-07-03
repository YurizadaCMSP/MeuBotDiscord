const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'userinfo',
  async execute({ message }) {

    const user = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(user.id);

    // Pegar os cargos, exceto @everyone
    const roles = member.roles.cache
      .filter(r => r.name !== '@everyone')
      .map(r => `<@&${r.id}>`)
      .join(' ') || 'Nenhum';

    // Status personalizado
    const status = {
      online: '🟢 Online',
      idle: '🌙 Ausente',
      dnd: '⛔ Não Perturbe',
      offline: '⚫ Offline'
    };

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle(`👤 | Informações de ${user.username}`)
      .setColor('#8e44ad')
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(`Aqui estão as informações completas do usuário no **Servidor Khaos**.`)
      .addFields(
        { name: '🆔 | Tag e ID', value: `${user.tag}\n\`${user.id}\``, inline: true },
        { name: '📥 | Entrou no Servidor', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: '📅 | Criou a Conta', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '🏷️ | Cargos', value: roles, inline: false },
        { name: '💻 | Status', value: status[member.presence?.status] || '⚫ Offline', inline: true }
      )
      .setFooter({ text: 'Servidor Khaos | Sistema de Informações de Usuário' })
      .setTimestamp();

    // Enviar resposta
    await message.reply({ embeds: [embed] });
  }
};
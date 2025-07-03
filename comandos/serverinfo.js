const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  async execute({ message, moment }) {

    const { guild } = message;
    const owner = await guild.fetchOwner();
    const created = moment(guild.createdTimestamp).format('LLL');

    // Criar embed personalizada
    const embed = new MessageEmbed()
      .setTitle(`📊 | Informações do Servidor - ${guild.name}`)
      .setColor('#8e44ad') // Roxo padrão Khaos
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(`📌 Aqui estão as principais informações do servidor **${guild.name}**:`)
      .addFields(
        { name: '🆔 Nome', value: `${guild.name}`, inline: true },
        { name: '💻 ID', value: `${guild.id}`, inline: true },
        { name: '👥 Membros', value: `${guild.memberCount}`, inline: true },
        { name: '💬 Canais', value: `${guild.channels.cache.size}`, inline: true },
        { name: '🎭 Cargos', value: `${guild.roles.cache.size}`, inline: true },
        { name: '🚀 Boosts', value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
        { name: '👑 Dono', value: `<@${owner.id}>`, inline: true },
        { name: '📅 Criado em', value: `${created}`, inline: true }
      )
      .setFooter({ text: 'Servidor Khaos | Sistema de Informações' })
      .setTimestamp();

    // Responder com embed
    await message.reply({ embeds: [embed] });
  }
};
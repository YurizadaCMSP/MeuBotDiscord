const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Permissions,
} = require("discord.js");
require("dotenv").config();
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const commandsInfo = [
  { name: "!ping", desc: "Mostra a latência do bot e informações técnicas." },
  {
    name: "!avatar [@user]",
    desc: "Mostra avatar em HD, download e infos do usuário.",
  },
  {
    name: "!serverinfo",
    desc: "Exibe informações detalhadas e estatísticas do servidor.",
  },
  {
    name: "!userinfo [@user]",
    desc: "Exibe informações avançadas e atividades do usuário.",
  },
  { name: "!meme", desc: "Envia um meme aleatório de APIs variadas." },
  {
    name: "!say [mensagem]",
    desc: "Bot repete sua mensagem com visual profissional.",
  },
  {
    name: "!clear [número]",
    desc: "Apaga mensagens em massa, com confirmação e logs.",
  },
  {
    name: "!sorteio [prêmio]",
    desc: "Realiza sorteio visual, logs, e destaca vencedor.",
  },
  {
    name: "!random [min] [max]",
    desc: "Sorteia um número entre min e max, visual animado.",
  },
  {
    name: "!sugestao [texto]",
    desc: "Envia uma sugestão para #sugestões e registra.",
  },
  {
    name: "!enquete [pergunta]",
    desc: "Cria enquete com botões, mostra resultado em embed.",
  },
  { name: "!coinflip", desc: "Joga cara ou coroa animado com GIF." },
  { name: "!tempo [cidade]", desc: "Mostra tempo detalhado (API wttr.in)." },
  {
    name: "!ban [@user]",
    desc: "Bane usuário, registra motivo e loga a ação.",
  },
  {
    name: "!kick [@user]",
    desc: "Expulsa usuário, registra motivo e loga a ação.",
  },
  { name: "!uptime", desc: "Mostra tempo online, início e últimas quedas." },
  { name: "!editemsg", desc: "Envia e edita embed após delay animado." },
  { name: "!emojis", desc: "Lista todos emojis com preview e IDs." },
  {
    name: "!botinfo",
    desc: "Exibe status do bot, recursos, uso de memória e CPU.",
  },
  {
    name: "!ajuda",
    desc: "Mostra lista interativa de comandos e links úteis.",
  },
  {
    name: "!painel",
    desc: "Painel do bot, somente o YurizadaCMSP (dono)! tem acesso.",
  },
  {
    name: "!invite",
    desc: "Receba link de convite com permissões recomendadas.",
  },
];

// Carregamento dos comandos
client.commands = new Map();
const comandosPath = path.join(__dirname, "comandos");
fs.readdirSync(comandosPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const command = require(path.join(comandosPath, file));
    client.commands.set(command.name, command);
  });

client.on("ready", () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
  client.user.setActivity("!ajuda • Kahos", { type: "WATCHING" });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  // comandos em /comandos/nome.js
  if (client.commands.has(cmd)) {
    try {
      await client.commands
        .get(cmd)
        .execute({ client, message, args, commandsInfo, moment });
    } catch (e) {
      console.error(e);
      message.reply("Ocorreu um erro ao executar o comando!");
    }
  }
});

client.login(process.env.TOKEN);

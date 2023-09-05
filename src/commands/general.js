const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const system = require("../functions/logsystem.js");
const packageJSON = require("../../package.json");

module.exports = [
  /*
        {
            data: new SlashCommandBuilder()
                .setName('help')
                .setDescription('このBOTのヘルプを表示します'),
            async execute(interaction) {
                await help.helpSend(interaction);
            },
        },*/
  {
    data: new SlashCommandBuilder()
      .setName("about")
      .setDescription("このBOTの概要を表示します"),
    async execute(interaction) {
      const embed = new EmbedBuilder()
        .setColor(0x00a0ea)
        .setTitle("高専競プロ部-管理BOT概要")
        .setAuthor({
          name: "高専競プロ部-管理BOT",
          iconURL:
            "https://cdn.discordapp.com/icons/1143838922565230644/c45dca4f8d6e70b335d6f38f4254d562.webp?size=240",
          url: "https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT",
        })
        .setDescription("このbotの概要を紹介します")
        .addFields([
          {
            name: "バージョン情報",
            value: "v" + packageJSON.version,
          },
          {
            name: "ソースコード",
            value:
              "このBOTは、オープンソースとなっています。[GitHub](https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT)にて公開されています。\n",
          },
          {
            name: "バグの報告先",
            value:
              "[Issue](https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT/issue)までお願いします。\nサポート等の詳細は/helpを実行してください。\n",
          },
          {
            name: "実行環境",
            value:
              "node.js v" +
              process.versions.node +
              `\n discord.js v` +
              version +
              `\n MongoDB 6.0 Powered by Google Cloud`,
          },
        ])
        .setTimestamp()
        .setFooter({ text: "Developed by 高専競プロ部Admin" });
      await interaction.reply({ embeds: [embed] });
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("このBOTのpingを測定します"),
    async execute(interaction) {
      await interaction.reply(`Ping : ${interaction.client.ws.ping}ms`);
    },
  },
];

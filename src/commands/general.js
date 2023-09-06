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
  {
    data: new SlashCommandBuilder()
      .setName("kosen-set")
      .setDescription("自分の所属高専を設定します。")
      .addIntegerOption((option) =>
        option
          .setName("入学年の下二桁")
          .setDescription("kosen〇〇s")
          .setRequired(true),
      )
      .addIntegerOption((option) =>
        option
          .setName("北海道-東北")
          .setDescription("北海道・東北地区の高専を指定します")
          .setRequired(false)
          .addChoices(
            { name: "函館工業高等専門学校", value: 1 },
            { name: "苫小牧工業高等専門学校", value: 2 },
            { name: "釧路工業高等専門学校", value: 3 },
            { name: "旭川工業高等専門学校", value: 4 },
            { name: "八戸工業高等専門学校", value: 5 },
            { name: "一関工業高等専門学校", value: 6 },
            { name: "仙台高等専門学校", value: 7 },
            { name: "秋田工業高等専門学校", value: 8 },
            { name: "鶴岡工業高等専門学校", value: 9 },
            { name: "福島工業高等専門学校", value: 10 },
          ),
      )
      .addIntegerOption((option) =>
        option
          .setName("関東甲信越")
          .setDescription("関東甲信越地区の高専を指定します")
          .setRequired(false)
          .addChoices(
            { name: "茨城工業高等専門学校", value: 11 },
            { name: "小山工業高等専門学校", value: 12 },
            { name: "群馬工業高等専門学校", value: 13 },
            { name: "木更津工業高等専門学校", value: 14 },
            { name: "東京工業高等専門学校", value: 15 },
            { name: "長岡工業高等専門学校", value: 16 },
            { name: "長野工業高等専門学校", value: 17 },
            { name: "東京都立産業技術高等専門学校", value: 18 },
            { name: "サレジオ工業高等専門学校", value: 19 },
          ),
      )
      .addIntegerOption((option) =>
        option
          .setName("東海-北陸-近畿")
          .setDescription("東海-北陸-近畿地区の高専を指定します")
          .setRequired(false)
          .addChoices(
            { name: "富山高等専門学校", value: 20 },
            { name: "石川工業高等専門学校", value: 21 },
            { name: "福井工業高等専門学校", value: 22 },
            { name: "岐阜工業高等専門学校", value: 23 },
            { name: "沼津工業高等専門学校", value: 24 },
            { name: "豊田工業高等専門学校", value: 25 },
            { name: "鈴鹿工業高等専門学校", value: 26 },
            { name: "舞鶴工業高等専門学校", value: 27 },
            { name: "明石工業高等専門学校", value: 28 },
            { name: "奈良工業高等専門学校", value: 29 },
            { name: "和歌山工業高等専門学校", value: 30 },
            { name: "鳥羽商船高等専門学校", value: 31 },
            { name: "大阪公立大学工業高等専門学校", value: 32 },
            { name: "神戸市立工業高等専門学校", value: 33 },
            { name: "国際高等専門学校", value: 34 },
            { name: "近畿大学工業高等専門学校", value: 35 },
          ),
      )
      .addIntegerOption((option) =>
        option
          .setName("中国-四国")
          .setDescription("中国・四国地区の高専を指定します")
          .setRequired(false)
          .addChoices(
            { name: "米子工業高等専門学校", value: 36 },
            { name: "松江工業高等専門学校", value: 37 },
            { name: "津山工業高等専門学校", value: 38 },
            { name: "呉工業高等専門学校", value: 39 },
            { name: "徳山工業高等専門学校", value: 40 },
            { name: "宇部工業高等専門学校", value: 41 },
            { name: "阿南工業高等専門学校", value: 42 },
            { name: "香川高等専門学校", value: 43 },
            { name: "新居浜工業高等専門学校", value: 44 },
            { name: "高知工業高等専門学校", value: 45 },
            { name: "広島商船高等専門学校", value: 46 },
            { name: "大島商船高等専門学校", value: 47 },
            { name: "弓削商船高等専門学校", value: 48 },
            { name: "神山まるごと高等専門学校", value: 49 },
          ),
      )
      .addIntegerOption((option) =>
        option
          .setName("九州")
          .setDescription("九州地区の高専を指定します")
          .setRequired(false)
          .addChoices(
            { name: "久留米工業高等専門学校", value: 50 },
            { name: "有明工業高等専門学校", value: 51 },
            { name: "北九州工業高等専門学校", value: 52 },
            { name: "佐世保工業高等専門学校", value: 53 },
            { name: "熊本高等専門学校", value: 54 },
            { name: "大分工業高等専門学校", value: 55 },
            { name: "都城工業高等専門学校", value: 56 },
            { name: "鹿児島工業高等専門学校", value: 57 },
            { name: "沖縄工業高等専門学校", value: 58 },
          ),
      ),
    async execute(interaction) {
      await interaction.reply(`Ping : ${interaction.client.ws.ping}ms`);
    },
  },
];

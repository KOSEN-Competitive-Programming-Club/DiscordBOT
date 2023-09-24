const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");
const system = require("./logsystem.js");

//helpTextの生成
const helpText = require("../text/helpText.json");
const adminTable = [];
const helpTable = [];
for (let i = 0; i < helpText.help.length; i++) {
  helpTable.push(
    new StringSelectMenuOptionBuilder()
      .setLabel(helpText.help[i].value.title)
      .setDescription(helpText.help[i].shortDescription)
      .setValue(String(i)),
  );
}

exports.helpSend = async function func(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x0875c1)
    .setTitle("高専競プロ部-管理BOT概要")
    .setAuthor({
      name: "高専競プロ部-管理BOT",
      iconURL:
        "https://cdn.discordapp.com/icons/1143838922565230644/c45dca4f8d6e70b335d6f38f4254d562.webp?size=240",
      url: "https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT",
    })
    .setDescription(
      "高専競プロ部-管理BOTをご利用いただきありがとうございます。\nヘルプでは、このBOTの機能の使い方等を確認できます。\n\n下のセレクトメニューから内容を選ぶことで、ヘルプを読めます。\n",
    )
    .setTimestamp()
    .setFooter({ text: "Developed by 高専競プロ部Admin" });

  const select = new StringSelectMenuBuilder()
    .setCustomId("help")
    .setPlaceholder("読みたいページを選択")
    .addOptions(helpTable);
  const row = new ActionRowBuilder().addComponents(select);

  await interaction.reply({ embeds: [embed], components: [row] });
};

exports.helpDisplay = async function func(interaction) {
  const page = parseFloat(interaction.values[0]);
  const newEmbed = new EmbedBuilder()
    .setColor(0x0875c1)
    .setTitle("高専競プロ部-管理BOT概要")
    .setAuthor({
      name: "高専競プロ部-管理BOT",
      iconURL:
        "https://cdn.discordapp.com/icons/1143838922565230644/c45dca4f8d6e70b335d6f38f4254d562.webp?size=240",
      url: "https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT",
    })
    .setDescription(helpText.help[page].value.description)
    .addFields(helpText.help[page].value.field)
    .setTimestamp()
    .setFooter({ text: "Developed by 高専競プロ部Admin" });
  await interaction.update({ embeds: [newEmbed] });
};

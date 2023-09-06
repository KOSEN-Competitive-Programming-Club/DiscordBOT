const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const db = require("../functions/db.js");
const system = require("../functions/logsystem.js");
const axios = require("axios");
const rankColor = [
  { name: "灰色", code: 0x808080 },
  { name: "茶色", code: 0x804000 },
  { name: "緑色", code: 0x008000 },
  { name: "水色", code: 0x00c0c0 },
  { name: "青色", code: 0x0000ff },
  { name: "黄色", code: 0xc0c000 },
  { name: "橙色", code: 0xff8000 },
  { name: "赤色", code: 0xff0000 },
];

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("link-atcoder")
      .setDescription("AtCoderアカウントとDiscordアカウントを紐付けます。")
      .addStringOption((option) =>
        option
          .setName("atcoderアカウント")
          .setDescription("AtCoderのアカウント名を入れてください。")
          .setRequired(true),
      ),
    async execute(interaction) {
      await interaction.deferReply({ ephemeral: true });
      await db.updateOrInsert(
        "main",
        "user",
        { userId: interaction.user.id },
        {
          userId: interaction.user.id,
          collegeId: null,
          atcoderId: interaction.options.getString("atcoderアカウント"),
          certification: false,
          algoRate: null,
          heuristicRate: null,
        },
      );

      await interaction.editReply(
        `[AtCoderアカウント](https://atcoder.jp/users/${interaction.options.getString(
          "atcoderアカウント",
        )})との紐付けを完了しました。\n登録を間違えしまった場合は再度実行してください。`,
      );
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName("atcoder-profile")
      .setDescription(
        "AtCoderのアカウント情報を表示します。Discord名とAtCoder名のどちらかで調べられます。",
      )
      .addUserOption((option) =>
        option
          .setName("discordアカウント")
          .setDescription(
            "AtCoderのプロフィールを見たいアカウントを入れてください。",
          )
          .setRequired(false),
      )
      .addStringOption((option) =>
        option
          .setName("atcoderアカウント")
          .setDescription(
            "プロフィールを見たいユーザーのAtCoder名を入れてください。",
          )
          .setRequired(false),
      ),
    async execute(interaction) {
      await interaction.deferReply();
      let atcoderId,
        userData = null;
      if (interaction.options.getUser("discordアカウント")) {
        const user = await db.find("main", "user", {
          userId: interaction.options.getUser("discordアカウント").id,
        });
        if (user.length === 0) {
          await interaction.editReply(
            "Discordアカウントと紐付けられているAtCoderアカウントが見つかりませんでした。\n/link-atcoderコマンドを使用して登録してください。",
          );
          return;
        } else if (user[0].atcoderId === null) {
          await interaction.editReply(
            "Discordアカウントと紐付けられているAtCoderアカウントが見つかりませんでした。\n/link-atcoderコマンドを使用して登録してください。",
          );
          return;
        } else {
          atcoderId = user[0].atcoderId;
          userData = user[0];
        }
      } else if (interaction.options.getString("atcoderアカウント")) {
        atcoderId = interaction.options.getString("atcoderアカウント");
      } else {
        const user = await db.find("main", "user", {
          userId: interaction.user.id,
        });
        if (user.length === 0) {
          await interaction.editReply(
            "Discordアカウントと紐付けられているAtCoderアカウントが見つかりませんでした。\n/link-atcoderコマンドを使用して登録してください。",
          );
          return;
        } else if (user[0].atcoderId === null) {
          await interaction.editReply(
            "Discordアカウントと紐付けられているAtCoderアカウントが見つかりませんでした。\n/link-atcoderコマンドを使用して登録してください。",
          );
          return;
        } else {
          atcoderId = user[0].atcoderId;
          userData = user[0];
        }
      }
      await interaction.editReply({
        embeds: [await generationAtcoderProfile(atcoderId, userData)],
      });
    },
  },
];

async function generationAtcoderProfile(atcoderId, userData = null) {
  if (!userData) {
    const user = await db.find("main", "user", { atcoderId: atcoderId });
    if (user.length) {
      userData = user[0];
    }
  }

  const field = [];
  if (userData) {
    if (userData.algoRate || userData.heuristicRate) {
      field.push(
        {
          name: "Algorithmランク",
          value:
            rankColor[Math.min(Math.floor(userData.algoRate / 400), 7)].name ??
            "---",
        },
        {
          name: "Algorithmレート",
          value: userData.algoRate ?? "---",
        },
        {
          name: "Heuristicランク",
          value:
            rankColor[Math.min(Math.floor(userData.heuristicRate / 400), 7)]
              .name ?? "---",
        },
        {
          name: "Heuristicレート",
          value: userData.heuristicRate ?? "---",
        },
      );
    }
  }
  {
    const response = [null, null];
    try {
      response[0] = (
        await axios.get(
          `https://atcoder.jp/users/${atcoderId}/history/json?contestType=algo`,
        )
      ).data;
      response[1] = (
        await axios.get(
          `https://atcoder.jp/users/${atcoderId}/history/json?contestType=heuristic`,
        )
      ).data;
    } catch (error) {
      await system.error("ユーザーデータを取得できませんでした");
      response[0] = [];
      response[1] = [];
    }
    for (let i = 0; i < 2; i++) {
      if (response[i].length === 0) {
        field.push(
          {
            name: i === 0 ? "Algorithmランク" : "Heuristicランク",
            value: "---",
          },
          {
            name: i === 0 ? "Algorithmレート" : "Heuristicレート",
            value: "---",
          },
        );
      } else {
        field.push(
          {
            name: i === 0 ? "Algorithmランク" : "Heuristicランク",
            value:
              rankColor[
                Math.min(
                  Math.floor(
                    response[i][response[i].length - 1].NewRating / 400,
                  ),
                  7,
                )
              ].name,
          },
          {
            name: i === 0 ? "Algorithmレート" : "Heuristicレート",
            value: String(response[i][response[i].length - 1].NewRating),
          },
        );
      }
    }
  }

  if (field[0].value === "---" && field[2].value === "---") {
    return new EmbedBuilder()
      .setColor(0xffffff)
      .setTitle(`${atcoderId}さんのAtCoderプロフィール`)
      .setAuthor({
        name: "高専競プロ部-管理BOT",
        iconURL:
          "https://cdn.discordapp.com/icons/1143838922565230644/c45dca4f8d6e70b335d6f38f4254d562.webp?size=240",
        url: "https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT",
      })
      .setDescription("AtCoderのデータが存在しませんでした。")
      .setTimestamp()
      .setFooter({ text: "Developed by 高専競プロ部Admin" });
  } else {
    return new EmbedBuilder()
      .setColor(rankColor[Math.min(Math.floor(field[1].value / 400), 7)].code)
      .setTitle(`${atcoderId}さんのAtCoderプロフィール`)
      .setAuthor({
        name: "高専競プロ部-管理BOT",
        iconURL:
          "https://cdn.discordapp.com/icons/1143838922565230644/c45dca4f8d6e70b335d6f38f4254d562.webp?size=240",
        url: "https://github.com/KOSEN-Competitive-Programming-Club/DiscordBOT",
      })
      .addFields(field)
      .setTimestamp()
      .setFooter({ text: "Developed by 高専競プロ部Admin" });
  }
}

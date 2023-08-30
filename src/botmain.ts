/** @format */

import fs from "fs";
import path from "path";

import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();
import "date-utils";

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});

// 関数読み込み
import * as system from "./functions/logsystem";

// スラッシュコマンド登録
const commandsPath = "./functions";
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: any) => file.endsWith(".ts"));

client.commands = new Collection();

export default client.commands;
client.once("ready", async () => {
  for (const file of commandFiles) {
    const filePath = `file://${path.join(commandsPath, file)}`;
    await import(filePath).then((command) => {
      const defaults = command.default;
      for (const commandData of defaults) {
        client.commands.set(commandData.data.name, commandData);
      }
    });
  }
  await system.log("Ready!");
});

/* command処理 */
client.on("interactionCreate", async (interaction: any) => {
  if (!interaction.isCommand()) {
    return;
  }
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;
  let guild, channel;
  if (!interaction.guildId) {
    guild = { name: "ダイレクトメッセージ", id: "---" };
    channel = { name: "---", id: "---" };
  } else {
    guild =
      client.guilds.cache.get(interaction.guildId) ??
      (await client.guilds.fetch(interaction.guildId));
    channel =
      client.channels.cache.get(interaction.channelId) ??
      (await client.channels.fetch(interaction.channelId));
  }
  await system.log(
    // @ts-ignore channelがnullになる場合がある
    `コマンド名:${command.data.name}\`\`\`\nギルド　　：${guild.name}\n(ID:${guild.id})\n\nチャンネル：${channel.name}\n(ID:${channel.id})\n\nユーザ　　：${interaction.user.username}#${interaction.user.discriminator}\n(ID:${interaction.user.id})\`\`\``,
    "SlashCommand",
  );
  try {
    await command.execute(interaction);
  } catch (error: any) {
    await system.error(
      // @ts-ignore channelがnullになる場合がある
      `スラッシュコマンド実行時エラー : ${command.data.name}\n\`\`\`\nギルド　　：${guild.name}\n(ID:${guild.id})\n\nチャンネル：${channel.name}\n(ID:${channel.id})\n\nユーザ　　：${interaction.user.username}#${interaction.user.discriminator}\n(ID:${interaction.user.id})\`\`\``,
      error,
    );
    try {
      await interaction.reply({
        content:
          "おっと、想定外の事態が起きちゃった。[Issue](https://github.com/NITKC-DEV/Kisarazu-Multi-Manager/issues)に連絡してくれ。",
        ephemeral: true,
      });
    } catch {
      try {
        await interaction.editReply({
          content:
            "おっと、想定外の事態が起きちゃった。[Issue](https://github.com/NITKC-DEV/Kisarazu-Multi-Manager/issues)に連絡してくれ。",
          ephemeral: true,
        });
      } catch {} // edit先が消えてる可能性を考えてtryに入れる
    }
  }
});

client.login(process.env.token);

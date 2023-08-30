/** @format */

import { SlashCommandBuilder } from "@discordjs/builders";

export default [
  {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("このBOTのpingを測定します"),
    async execute(interaction: any) {
      await interaction.reply(`Ping : ${interaction.client.ws.ping}ms`);
    },
  },
];

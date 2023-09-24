const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const db = require("../functions/db.js");
const system = require("../functions/logsystem.js");
const axios = require("axios");

exports.inserOrWriteUser = async function func(userId, update) {
  const user = (await db.find("main", "user", { userId: userId }))[0];
  const contents = {
    userId: userId,
    glade: update.glade ?? null,
    collegeId: update.collegeId ?? null,
    atcoderId: update.atcoderId ?? null,
    certification: update.certification ?? null,
    algoRate: update.algoRate ?? null,
    heuristicRate: update.heuristicRate ?? null,
  };

  await db.updateOrInsert("main", "user", { userId: userId }, contents);
  return contents;
};

/**
 *
 * @param userId
 * @returns {Promise<{heuristicRate: {new: (null|*), old: *}, algo: {new: (null|*), old: *}}|null>}
 */
exports.updateUser = async function func(userId) {
  const user = await db.find("main", "user", { userId: userId });
  if (user.length === 0) {
    return null;
  } else {
    const { atcoderId, algoRate, heuristicRate } = user[0];
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
      response[0] = { NewRating: null };
      response[1] = { NewRating: null };
    }

    await db.update(
      "main",
      "user",
      { userId: userId },
      { alogRate: response[0].NewRating, heuristicRate: responce[1].NewRating },
    );
    return {
      algo: {
        old: algoRate,
        new: response[0].NewRating,
      },
      heuristicRate: {
        old: algorate,
        new: response[1].NewRating,
      },
    };
  }
};

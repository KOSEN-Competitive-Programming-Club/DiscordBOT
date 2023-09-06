const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const db = require("../functions/db.js");
const system = require("../functions/logsystem.js");
const axios = require("axios");

exports.updateUser = async function func(userFilter, update) {};

const kosen = [
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
  { name: "茨城工業高等専門学校", value: 11 },
  { name: "小山工業高等専門学校", value: 12 },
  { name: "群馬工業高等専門学校", value: 13 },
  { name: "木更津工業高等専門学校", value: 14 },
  { name: "東京工業高等専門学校", value: 15 },
  { name: "長岡工業高等専門学校", value: 16 },
  { name: "長野工業高等専門学校", value: 17 },
  { name: "東京都立産業技術高等専門学校", value: 18 },
  { name: "サレジオ工業高等専門学校", value: 19 },
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
  { name: "久留米工業高等専門学校", value: 50 },
  { name: "有明工業高等専門学校", value: 51 },
  { name: "北九州工業高等専門学校", value: 52 },
  { name: "佐世保工業高等専門学校", value: 53 },
  { name: "熊本高等専門学校", value: 54 },
  { name: "大分工業高等専門学校", value: 55 },
  { name: "都城工業高等専門学校", value: 56 },
  { name: "鹿児島工業高等専門学校", value: 57 },
  { name: "沖縄工業高等専門学校", value: 58 },
];
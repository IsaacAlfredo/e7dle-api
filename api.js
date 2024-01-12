import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { randomChar } from "./randomChar.js";
import cron from "node-cron";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const last = require("./last.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.listen("3000");

app.route("/").get((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "char.json"));
});

cron.schedule("0 4 * * *", randomChar, {
  scheduled: true,
  timezone: "America/Sao_Paulo",
});

app.route("/daily").get((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ today: last.last[3], yesterday: last.last[2].name });
});

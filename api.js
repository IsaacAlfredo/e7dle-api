import express from "express";
import path from "path";
import { CronJob } from "cron";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { randomChar } from "./randomChar.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.listen("3000");

app.route("/").get((req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "char.json"));
});

var char;

const job = CronJob.from({
  cronTime: "*/10 * * * * *",
  onTick: function () {
    console.log("ok");
    char = randomChar();
  },
  start: true,
  timeZone: "America/Sao_Paulo",
});

app.route("/daily").get((req, res) => res.json({ char: char }));

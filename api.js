import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { randomChar } from "./randomChar.js";
import cron from "node-cron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.listen("3000");

app.route("/").get((req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "char.json"));
});

var char;

cron.schedule(
  "0 4 * * *",
  () => {
    char = randomChar();
    console.log(char);
  },
  {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  }
);

app.route("/daily").get((req, res) => res.json({ char: char }));

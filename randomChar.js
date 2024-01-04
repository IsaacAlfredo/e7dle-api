import { createRequire } from "module";
const require = createRequire(import.meta.url);
const char = require("./char.json");

export function randomChar() {
  const randomWord =
    Object.keys(char)[Math.floor(Math.random() * Object.keys(char).length)];

  return randomWord;
}

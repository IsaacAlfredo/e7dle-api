import { createRequire } from "module";
const require = createRequire(import.meta.url);
const char = require("./char.json");
const last = require("./last.json");
import * as fs from "fs";

export function randomChar() {
  var randomChar = {
    id: "c1100",
    _id: "alencia",
    name: "Alencia",
    rarity: 5,
    attribute: "wind",
    role: "warrior",
    sex: 2,
    zodiac: "crab",
    release: "2020",
  };

  var equalFlag = true;

  while (equalFlag === true) {
    randomChar =
      Object.values(char)[Math.floor(Math.random() * Object.keys(char).length)];
    for (var l in last.last) {
      if (randomChar.name === last.last[l].name) {
        equalFlag = true;
        break;
      } else {
        equalFlag = false;
      }
    }
  }
  last.last.shift();
  last.last.push(randomChar);

  const newLast = JSON.stringify(last);

  fs.writeFile("last.json", newLast, (error) => {
    if (error) {
      console.error(error);
      throw error;
    }
  });
}

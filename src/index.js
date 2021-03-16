import { ConstructorGameObject } from "./constructorGameObject.js";
import { elementClick } from "./elementClick.js";
import { Game } from "./game.js";

const btnStart = document.getElementById("btnstartgame");
btnStart.addEventListener("click", init);

function init() {
  console.log("Booom");
  const game = new Game({ row: 9, column: 9 }, 10);
  game.start();
  console.log(game.firstClick);
}

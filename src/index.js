//import { ConstructorGameObject } from "./constructorGameObject.js";
//import { elementClick } from "./elementClick.js";
import { Game } from "./game.js";
import { GameState } from "./stateGame.js";
import { Map } from "./Map.js";
let game;
const btnStart = document.getElementById("btnstartgame");
btnStart.addEventListener("click", init);

/*function init() {
  if (typeof game !== "undefined") {
    game.stopWatch();
    game = null;
  }
  console.log("Booom");
  console.log(typeof game);
  game = new Game({ row: 16, column: 16 }, 45);
  game.start();
}*/
function init() {
 let game = new GameState({ row: 16, column: 16 }, 45);
  let map=new Map();
  map.getState=(mapObj)=>{game.setStateMap(mapObj)}
map.createGameMap(game.getState());
  console.log(game)
}

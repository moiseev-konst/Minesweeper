//import { ConstructorGameObject } from "./constructorGameObject.js";
//import { elementClick } from "./elementClick.js";
import { Game } from "./game.js";
import { GameState } from "./stateGame.js";
import { Map } from "./Map.js";
import { MapRendering } from "./mapRendering.js";
import { MouseClick } from "./mouseClick.js";

let game;
const btnStart = document.getElementById("btnstartgame");
const gameMapHTML = document.getElementById("mineMap");
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
  let map = new Map();
  let render = new MapRendering(gameMapHTML);
  let mouse = new MouseClick(gameMapHTML);

  mouse.addListenerClick();

  mouse.getIndexDiv = (el) => {
    return render.getIndexDiv(el);
  };
  mouse.sendLeftClick = (index) => {
    game.setStateLeftClick(index);
  };
  mouse.sendRightClick = (index) => {
    game.setStateRightClick(index);
  };
  render.render = (data) => {
    render.createGameDiv(data);
  };
  game.addSubscribes(render.render);
  map.sendMap = (mapObj) => {
    game.setStateMap(mapObj);
  };
  map.createGameMap(game.getState());
  console.log(game);
  // mouse.removeListnerClick()
}

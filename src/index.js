//import { ConstructorGameObject } from "./constructorGameObject.js";
//import { elementClick } from "./elementClick.js";
import { Game } from "./game.js";
import { GameState } from "./stateGame.js";
import { Map } from "./Map.js";
import { MapRendering } from "./mapRendering.js";
import { MouseClick } from "./mouseClick.js";
import { Logic } from "./gameLogic.js";
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
  let state = new GameState({ row: 16, column: 16 }, 45);
  let map = new Map();
  let render = new MapRendering(gameMapHTML);
  let mouse = new MouseClick(gameMapHTML);
  let logic = new Logic();

  logic.onSendCell = (newArr) => {
    state.setStateLeftClick(newArr);
  };
  logic.onSendFlag = (newArr) => {
    state.setStateRightClick(newArr);
  };
  logic.onSendFirst=(first,index)=>{state.setStateFirstClick(first,index)}
  logic.onSendCells = (arr) => {state.setStateArray(arr)};
  logic.onFindZeroCells = (index) => {
   return map.findSurroundingZero(index);
  };
  logic.onFindCells = (index) => {
    return map.findSurroundElements(index);
   };
  logic.state=()=>{return state.getState()}
  logic.getCollectionDiv=()=>{
    return render.getCollectionDiv()
  }

  mouse.addListenerClick();

  mouse.getIndexDiv = (el) => {
    return render.getIndexDiv(el);
  };
  mouse.sendLeftClick = (index) => {
    logic.checkingCell(index);
  };
  mouse.sendRightClick = (index) => {
    logic.checkingFlag(index);
  };
  mouse.sendTwoBtn=(index)=>{
    logic.checkingTwoBtn(index)
  }
  render.render = (data) => {
    render.createGameDiv(data);
  };

  state.addSubscribes(render.render);
  map.sendMap = (mapObj) => {
    state.setStateMap(mapObj);
  };
  map.createGameMap(state.getState());
  console.log(state);
  // mouse.removeListnerClick()
}

import { ConstructorGameObject } from "./constructorGameObject.js";
import { elementClick } from "./elementClick.js";
import {Game} from "./game.js"

const btnStart = document.getElementById("btnstartgame");
btnStart.addEventListener("click", init);

function init() {
  console.log("Booom");
const game=new Game({ row: 9, column: 9 }, 10)
game.start()
 /* const game = new ConstructorGameObject({ row: 9, column: 9 }, 10);/// переименовать Game, { row: 9, column: 9, quantityMine:10}


  //init() new game: game.start;


  console.log(game.quantityMine);
  game.createArrayGameMapElement(game.gameSize);
  console.log(game.arrayGameMapElement);

  const containerGameMapElements = document.getElementById("mineMap");
  containerGameMapElements.removeEventListener("click", anotherClick);
  containerGameMapElements.addEventListener("click", eventfirstClick);

  function eventfirstClick(eventArg) {
    let IdElement = eventArg.target.id;
    firstClick(IdElement, game);
    containerGameMapElements.removeEventListener("click", eventfirstClick);
    console.log("remove listener firstClick");
    containerGameMapElements.addEventListener("click", anotherClick);
    console.log("new add listener elementClick");
  }
  function anotherClick(eventArg) {
    let IdElement = eventArg.target.id;
    elementClick(IdElement, game);
  }*/
}
function firstClick(IdElement, game) {
  console.log("first click");
  game.coordinateFirstClick = game.parseIdElementInObjectCoordinate(IdElement);
  console.log("write first coordinate");
 game.writeMineInArrayGameMapElement();
  console.log("write mine");
  game.writeNumberInArrayGameMapElement();
  console.log("write number");
}

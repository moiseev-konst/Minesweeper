import { ConstructorGameObject } from "./constructorGameObject.js";
import { elementClick } from "./elementClick.js";
import { Game } from "./game.js";
let game;
const btnStart = document.getElementById("btnstartgame");
btnStart.addEventListener("click", init);

 function init() {
  if(typeof game!=='undefined'){
game.stopWatch()
  }

    console.log("Booom");
    console.log(typeof game);
    game = new Game({ row: 16, column: 16 }, 45);
    game.start();
  
  
  
}

import { Map } from "./Map.js";

export class GameState {
  constructor(gameSize, quantityMine) {
    this.gameSize = gameSize;
    this.mapLength = this.gameSize.row * this.gameSize.column;
    this.quantityMine = quantityMine;
    this.gameMap = [];
    this.gameMine = [];
    this.arrayOpenCells = [];
    this.subscribes = [];
    this.firstClick=0;
  }
  setStateMap(mapObj) {
    this.gameMap = mapObj.gameMap;
    this.gameMine = mapObj.gameMine;
   this.deliver(this.getState());
  }
  addSubscribes(sub) {
    this.subscribes.push(sub);
  }
  deliver(data) {
    this.subscribes.forEach((sub) => {
      sub(data);
    });
  }
  getState() {
    let state = {
      gameSize: this.gameSize,
      mapLength: this.mapLength,
      quantityMine: this.quantityMine,
      gameMap: this.gameMap,
      gameMine: this.gameMine,
      arrayOpenCells: this.arrayOpenCells,
      firstClick:this.firstClick,
    };
    return state;
  }
}

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
    this.arrayFlagCells = [];
    this.firstClick;
  }
  getState() {
    let state = {
      gameSize: this.gameSize,
      mapLength: this.mapLength,
      quantityMine: this.quantityMine,
      gameMap: this.gameMap,
      gameMine: this.gameMine,
      arrayOpenCells: this.arrayOpenCells,
      arrayFlagCells: this.arrayFlagCells,
      firstClick: this.firstClick,
    };
    return state;
  }
  setStateLeftClick(index) {
    if (this.firstClick == undefined) {
      this.firstClick = index;
    }
    this.arrayOpenCells.push(index);
    this.deliver(this.getState());
  }
  setStateRightClick(index) {
    if (
      this.arrayFlagCells.indexOf(index) < 0 &&
      this.arrayOpenCells.indexOf(index) < 0
    ) {
      this.arrayFlagCells.push(index);
    } else if (this.arrayFlagCells.indexOf(index) >= 0) {
      this.arrayFlagCells.splice(this.arrayFlagCells.indexOf(index), 1);
    }
    this.deliver(this.getState());
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
}

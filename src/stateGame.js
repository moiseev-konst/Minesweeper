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
    this.endGame;
    this.explosion;
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
      endGame: this.endGame,
      explosion: this.explosion,
    };
    return state;
  }
  setStateFirstClick(firstClick, arrayOpenCells) {
    this.firstClick = firstClick;
    this.arrayOpenCells = arrayOpenCells;
    this.deliver(this.getState());
  }
  setStateLeftClick(indexes) {
    this.arrayOpenCells = indexes;
    this.deliver(this.getState());
  }
  setStateRightClick(newArrayFlagCells) {
    this.arrayFlagCells = newArrayFlagCells;
    this.deliver(this.getState());
  }
  setStateArray(arrayOpenCells) {
    this.arrayOpenCells = this.arrayOpenCells.concat(arrayOpenCells);
    this.deliver(this.getState());
  }
  setStateEndGame(end, indexExplosion, newArrayOpenCells) {
    this.endGame = end;
    this.explosion = indexExplosion;
    this.arrayOpenCells = newArrayOpenCells;
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

export class Map {
  constructor() {
    this.gameSize ;
    this.mapLength ;
    this.quantityMine ;
    this.gameMap = [];
    this.gameMine = [];
    this.coordinateSurroundingElements = [
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ];
  }
  newState=(state)=> {
    this.gameSize = state.gameSize;
    this.quantityMine = state.quantityMine;
    this.gameMap = state.gameMap;
    this.gameMine = state.gameMine;
    this.mapLength = this.gameSize.row * this.gameSize.column;
  }
  getMap = () => {};
  createGameMap(state) {
    this.newState(state);
    this.createMap();
    this.writeMine(state.firstClick);
    this.writeNumberToMap();
    let mapObj = { gameMap: this.gameMap, gameMine: this.gameMine };
    this.getMap(mapObj);
  }
  createMap() {
    for (let i = 0; i < this.mapLength; i++) {
      this.gameMap[i] = 0;
    }
  }
  writeMine(firstClick) {
    while (this.gameMine.length < this.quantityMine) {
      let randomMine = Number.parseInt(this.mapLength * Math.random() + 1);
      if (randomMine !== firstClick && this.gameMine.indexOf(randomMine) < 0) {
        this.gameMine.push(randomMine);
      }
    }
  }
  writeNumberToMap() {
    console.log("writeNumber");
    this.gameMine.forEach((indexMine) => {
      this.gameMap[indexMine] = -1;
      let surroundElements = this.findSurroundElements(indexMine);
      surroundElements.forEach((el) => {
        if (this.gameMap[el] >= 0) {
          this.gameMap[el] += 1;
        }
      });
    });
    console.log(this.gameMap);
  }
  parseIndexToCoordinates(index) {
    let row = Number.parseInt(index / this.gameSize.row);
    let column =
      index -
      this.gameSize.column * Number.parseInt(index / this.gameSize.column);
    return { row, column, index };
  }
  parseCoordinatesToIndex(coordinateObject) {
    return coordinateObject.row * this.gameSize.row + coordinateObject.column;
  }
  findSurroundElements(indexMine) {
    let findIndex = [];
    let coordinateMine = this.parseIndexToCoordinates(indexMine);
    let findPossibleSurround = this.coordinateSurroundingElements.filter(
      (el) => {
        return (
          coordinateMine.row + el.x >= 0 &&
          coordinateMine.row + el.x <= this.gameSize.row - 1 &&
          coordinateMine.column + el.y >= 0 &&
          coordinateMine.column + el.y <= this.gameSize.column - 1
        );
      }
    );

    findIndex = findPossibleSurround.map((el) => {
      return this.parseCoordinatesToIndex({
        row: coordinateMine.row + el.x,
        column: coordinateMine.column + el.y,
      });
    });
    return findIndex;
  }
  findSurroundingZero(index) {
    this.findSurroundElements(index).forEach((el) => {
      if (this.findZeroElements.indexOf(el) < 0) {
        this.findZeroElements.push(el);
        if (this.gameMap[el] == 0) {
          this.openSurroundingZero(el);
        }
      }
    });
    this.findZeroElements.push(index);
    return this.findZeroElements;
  }
  findAllMine() {
    let mine = [];
    for (let i = 0; i < this.gameMap.length; i++) {
      if (this.gameMap[i] < 0) {
        mine.push(i);
      }
    }
    this.youLose();
    return mine;
  }
}

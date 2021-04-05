class Map {
  constructor() {}
  createGameMap() {
    function createDiv() {
      let div = document.createElement("div");
      div.classList.add("GameElement");
      return div;
    }

    for (let i = 0; i < this.mapLength; i++) {
      this.gameMap[i] = 0;
      this.collectionDivMap.push(createDiv());
    }
    const fragment = document.createDocumentFragment();

    this.gameMapHTML.innerHTML = "";
    this.collectionDivMap.forEach((div) => {
      fragment.appendChild(div);
    });
    this.gameMapHTML.append(fragment);
  }
  writeMine(firstClick, quantityMine) {
    while (this.gameMine.length < quantityMine) {
      let randomMine = Number.parseInt(this.mapLength * Math.random() + 1);
      if (randomMine !== firstClick && this.gameMine.indexOf(randomMine) < 0) {
        this.gameMine.push(randomMine);
      }
    }
  }
  writeNumberToMap(gameMap, gameMine) {
    console.log("writeNumber");
    gameMine.forEach((indexMine) => {
      gameMap[indexMine] = -1;
      let surroundElements = this.findSurroundElements(indexMine);
      surroundElements.forEach((el) => {
        if (gameMap[el] >= 0) {
          gameMap[el] += 1;
        }
      });
    });
    console.log(gameMap);
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
}

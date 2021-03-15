export class Game {
  constructor(gameSize, quantityMine) {
    this.gameSize = gameSize;
    this.mapLength = this.gameSize.row * this.gameSize.column;
    this.quantityMine = quantityMine;
    this.gameMap = [];
    this.collectionDivMap = [];
    this.firstClick;
    this.gameMine = [];
    this.countFlag = 0;
    this.countMine = 0;
    this.gameMapHTML = document.getElementById("mineMap");
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
    this.findZeroElements = [];
  }

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
  start() {
    this.createGameMap(this.mapLength);
    //console.log(this.collectionDivMap);
    this.gameMapHTML.addEventListener("click", (eventArg) => {
      this.eventClick(eventArg);
    });
  }

  eventClick(eventArg) {
    if (this.firstClick == undefined) {
      console.log(eventArg);
      console.log(this.collectionDivMap);

      this.firstClick = this.collectionDivMap.indexOf(eventArg.target);

      this.writeMine(this.firstClick, this.quantityMine);
      this.writeNumberToMap(this.gameMap, this.gameMine);

      if (this.firstClick >= 0) {
        let numberInElement = this.gameMap[this.firstClick];
        if (numberInElement == 0) {
          this.openSurroundingZero(this.firstClick).forEach((index) => {
            this.addClassCss(this.collectionDivMap[index], this.gameMap[index]);
          });
          this.findZeroElements = [];
        }
        this.addClassCss(this.collectionDivMap[this.firstClick], numberInElement);
      }
    } else {
      let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
      if (indexDivClick >= 0) {
        let numberInElement = this.gameMap[indexDivClick];
        if (numberInElement == 0) {
          this.openSurroundingZero(indexDivClick).forEach((index) => {
            this.addClassCss(this.collectionDivMap[index], this.gameMap[index]);
          });
          this.findZeroElements = [];
        }
        this.addClassCss(this.collectionDivMap[indexDivClick], numberInElement);
      }
    }
  }
  addClassCss(div, numberInElement) {
    div.classList.add(`n${numberInElement < 0 ? 9 : numberInElement}`);
  }
  writeMine(firstClick, quantityMine) {
    while (this.gameMine.length < quantityMine) {
      let randomMine = Number.parseInt(this.mapLength * Math.random() + 1);
      if (
        randomMine !== firstClick.index &&
        this.gameMine.indexOf(randomMine) < 0
      ) {
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
  
  openSurroundingZero(index) {
    this.findSurroundElements(index).forEach((el) => {
      if (this.findZeroElements.indexOf(el) < 0) {
        this.findZeroElements.push(el);
        if (this.gameMap[el] == 0) {
          this.openSurroundingZero(el);
        }
      }
    });
    return this.findZeroElements
  }
}

export class Game {
  constructor(gameSize, quantityMine) {
    this.gameSize = gameSize;
    this.mapLength = this.gameSize.row * this.gameSize.column;
    this.quantityMine = quantityMine;
    this.gameMap = [];
    this.collectionDivMap = [];
    this.firstClick = undefined;
    this.gameMine = [];
    this.countFlag = 0;
    this.countMine = this.quantityMine;
    this.gameMapHTML = document.getElementById("mineMap");
    this.watch = document.getElementById("stopWatch");
    this.mineCount = document.getElementById("countMine");

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
    this.button;
    this.watchInterval;
    this.watchText;
    this.countSecond = 0;
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

  mouseDown = (eventArg) => {
    console.log("mousedown");
    this.button = eventArg.buttons;
  };

  mouseUp = (eventArg) => {
    this.gameClickController(eventArg, this.button);
  };

  start() {
    this.createGameMap(this.mapLength);
    this.gameMapHTML.addEventListener("contexmenu", (eventArg) => {
      eventArg.preventDefault();
    });
    document.oncontextmenu = (e) => {
      e.preventDefault();
    };
    this.watch.innerText = "00:00";
    this.changeMineCount();
    this.gameMapHTML.addEventListener("mousedown", this.mouseDown);
    this.gameMapHTML.addEventListener("mouseup", this.mouseUp);
  }

  changeMineCount() {
    this.mineCount.innerText = this.countMine;
  }
  changeWatch = () => {
    this.watchText = "";
    this.countSecond = this.countSecond + 1;
    let second =
      this.countSecond % 60 < 10
        ? "0" + Math.trunc(this.countSecond % 60)
        : Math.trunc(this.countSecond % 60).toString();
    let minutes =
      (this.countSecond / 60) % 60 < 10
        ? "0" + Math.trunc((this.countSecond / 60) % 60)
        : Math.trunc((this.countSecond / 60) % 60).toString();

    this.watchText = `${minutes}:${second}`;

    
    this.watch.innerText = this.watchText;
    
    if (minutes == 99) {
      this.stopWatch();
    }
  };
  startWatch() {
    
    this.changeWatch();
    this.watchInterval = setTimeout(() => {
      this.startWatch();
    }, 1000);
  }
  stopWatch() {
    clearTimeout(this.watchInterval);
    console.log("watch Stop");
  }

  endGame(endCondition){
    let endDiv= document.createElement("div");
    endDiv.classList.add("endGame")
    let text=endCondition=="win"?"You won the battle!!!":"You lose, sucker!";
    endDiv.innerText=text;
    this.gameMapHTML.append(endDiv)

  }
  youWin() {
    if (
      this.gameMine.every((mine) => {
        return (
          this.collectionDivMap[mine].classList.contains("flag") &&
          this.countFlag == this.gameMine.length
        );
      })
    ) {
      console.log("YOU WIN");
      this.openAllMap().forEach((el) => {
        this.openCellController(el);
      });
      this.endGame('win');
      this.stopWatch();
      this.gameMapHTML.removeEventListener("mousedown", this.mouseDown);
      this.gameMapHTML.removeEventListener("mouseup", this.mouseUp);
    }
  }
  openAllMap() {
    let notOpenCells = this.collectionDivMap.filter((div) => {
      return div.classList.length < 2;
    });
    let notOpenIndex = notOpenCells.map((el) => {
      return this.collectionDivMap.indexOf(el);
    });
    return notOpenIndex;
  }
  youLose() {
    console.log("You Lose");
    this.stopWatch();
    this.endGame('loss');

    this.gameMapHTML.removeEventListener("mousedown", this.mouseDown);
    this.gameMapHTML.removeEventListener("mouseup", this.mouseUp);
  }
  gameClickController(eventArg, button) {
    console.log(button);
    if (this.collectionDivMap.indexOf(eventArg.target) >= 0) {
      if (button < 3) {
        this.oneButtonCkick(eventArg);
      } else if (button == 3) {
        this.twoButtonsClick(eventArg);
      }
    }
  }
  oneButtonCkick(eventArg) {
    if (eventArg.button == 0) {
      this.leftButtonClick(eventArg);
    } else if (eventArg.button == 2) {
      this.rightButtonClick(eventArg);
    }
  }

  leftButtonClick(eventArg) {
    if (
      this.firstClick == undefined &&
      this.collectionDivMap.indexOf(eventArg.target) >= 0
    ) {
      this.leftFirstClick(eventArg);
    } else {
      this.leftClick(eventArg);
    }
  }

  leftFirstClick(eventArg) {
    this.firstClick = this.collectionDivMap.indexOf(eventArg.target);

    this.writeMine(this.firstClick, this.quantityMine);
    this.writeNumberToMap(this.gameMap, this.gameMine);
    this.openCellController(this.firstClick);
    this.startWatch();
  }
  leftClick(eventArg) {
    // console.log("left", eventArg);
    let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
    // console.log("left", this.collectionDivMap.indexOf(eventArg.target));
    if(!eventArg.target.classList.contains("flag")){
      this.openCellController(indexDivClick);
    }

   
  }
  rightButtonClick(eventArg) {
    //console.log("right", eventArg);
    let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
    this.openCellController(indexDivClick, "flag");
  }
  twoButtonsClick(eventArg) {
    let surround = [];
    let surroundEl = [];
    let flagMine = 0;
    console.log("две кнопки");
    let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
    surround = this.findSurroundElements(indexDivClick);
    surroundEl = surround.filter((el) => {
      if (this.collectionDivMap[el].classList.contains("flag")) {
        flagMine += 1;
      } else {
        return el >= 0;
      }
    });

    if (this.gameMap[indexDivClick] == flagMine) {
      surroundEl.forEach((index) => {
        this.openCellController(index);
      });
    }
  }

  openCellController(index, button) {
    if (this.gameMap[index] > 0 || button) {
      this.openCell(index, button == undefined ? this.gameMap[index] : button);
    } else if (this.gameMap[index] < 0) {
      this.openCell(index, "n9");
      this.openCells(this.openAllMine(), "mine");
    } else if (this.gameMap[index] == 0) {
      this.openCells(this.openSurroundingZero(index));
    }
  }

  openCell(index, classCss) {
    this.addClassCssController(this.collectionDivMap[index], classCss);
  }
  openCells(arrayIndexes, classCss) {
    if (classCss == undefined) {
      arrayIndexes.forEach((index) => {
        this.openCell(index, this.gameMap[index]);
      });
    } else {
      arrayIndexes.forEach((index) => {
        this.openCell(index, classCss);
      });
    }
  }
  addClassCssController(refDiv, props) {
    if (Number.isInteger(props)) {
      let classCss = `n${props}`;
      this.addClassCss(refDiv, classCss);
    } else if (
      props == "flag" &&
      !refDiv.classList.contains("n0") &&
      !refDiv.classList.contains("n1") &&
      !refDiv.classList.contains("n2") &&
      !refDiv.classList.contains("n3") &&
      !refDiv.classList.contains("n4") &&
      !refDiv.classList.contains("n5") &&
      !refDiv.classList.contains("n6") &&
      !refDiv.classList.contains("n7") &&
      !refDiv.classList.contains("n8") &&
      !refDiv.classList.contains("n9") &&
      !refDiv.classList.contains("mine")
    ) {
      if (refDiv.classList.contains(props)) {
        refDiv.classList.remove(props);
        this.countFlag -= 1;
        this.countMine += 1;
      } else {
        this.addClassCss(refDiv, props);
        this.countFlag += 1;
        this.countMine -= 1;
        this.youWin();
      }
      this.changeMineCount();
    } else if (
      props == "mine" &&
      !refDiv.classList.contains("flag") &&
      !refDiv.classList.contains("n9")
    ) {
      this.addClassCss(refDiv, props);
    } else if (props == "n9") {
      this.addClassCss(refDiv, props);
    }
  }

  addClassCss(div, classCss) {
    div.classList.add(classCss);
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

  openSurroundingZero(index) {
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
  openAllMine() {
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

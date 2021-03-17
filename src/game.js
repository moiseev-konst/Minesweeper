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
    this.gameMapHTML.oncontextmenu = (eventArg) => {
      this.eventClick(eventArg);
      return false;
    };
  }
  gameClickController(eventArg) {
    if (eventArg.buttons == 0) {
      this.oneButtonCkick(eventArg);
    } else if (eventArg.buttons == 3) {
      this.twoButtonsClick(eventArg);
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
    openCellController(this.firstClick);
  }
  leftClick(eventArg) {
    let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
    openCellController(indexDivClick);
  }
  rightButtonClick(eventArg) {}
  twoButtonsClick(eventArg) {}

  openCellController(index) {
    if (this.gameMap[index] > 0) {
      openCell(index, this.gameMap[index]);
    } else if (this.gameMap[index] < 0) {
      openCells(this.openAllMine(), "mine");
    } else if (this.gameMap[index] == 0) {
      openCells(this.openSurroundingZero(index));
    }
  }

  openCell(index, classCss=null) {
   
    this.addClassCssController(this.collectionDivMap[index], classCss);
  }
  openCells(arrayIndexes, classCss=null) {
    arrayIndexes.forEach((index) => {
      openCell(index, classCss);
    });
  }
  addClassCssController(refDiv, props) {
    if (Number.isInteger(props)) {
      let classCss = `n${props < 0 ? 9 : props}`;
      addClassCss(refDiv, classCss);
    } else {
      addClassCss(refDiv, props);
    }
  }

  /*
  gameClickController(eventArg) {
    if (eventArg.buttons == 0) {
      if (eventArg.button == 1) {
        if(this.firstClick == undefined){
          this.leftFirstClick(eventArg);
        }else{this.leftClick(eventArg);}
        
      } else if (eventArg.button == 2) {
        this.rightClick(eventArg);
      }
    }else if(eventArg.buttons == 3){
      leftAndRightClick(eventArg)
    }
  }
  leftClick(eventArg) {}
  rightClick(eventArg) {}
  leftFirstClick(eventArg){}
  leftAndRightClick(eventArg){}
*/

  eventClick(eventArg) {
    console.log(eventArg.button, eventArg.buttons);
    if (eventArg.which == 1) {
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
              this.addClassCss(
                this.collectionDivMap[index],
                this.gameMap[index]
              );
            });
            this.findZeroElements = [];
          }
          this.addClassCss(
            this.collectionDivMap[this.firstClick],
            numberInElement
          );
        }
      } else {
        let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
        if (indexDivClick >= 0) {
          let numberInElement = this.gameMap[indexDivClick];
          if (numberInElement < 0) {
            this.openAllMine().forEach((index) => {
              if (!this.collectionDivMap[index].classList.contains("flag")) {
                this.addClassCss(
                  this.collectionDivMap[index],
                  this.gameMap[index]
                );
              }
            });
            this.collectionDivMap[indexDivClick].classList.add("mine");
          }
          if (numberInElement == 0) {
            this.openSurroundingZero(indexDivClick).forEach((index) => {
              this.addClassCss(
                this.collectionDivMap[index],
                this.gameMap[index]
              );
            });
            this.findZeroElements = [];
          } else {
            this.addClassCss(
              this.collectionDivMap[indexDivClick],
              numberInElement
            );
          }
        }
      }
    } else if (eventArg.which == 3) {
      let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);

      this.collectionDivMap[indexDivClick].classList.contains("flag")
        ? this.collectionDivMap[indexDivClick].classList.remove("flag")
        : this.collectionDivMap[indexDivClick].classList.add("flag");
    }
  }
  addClassCss(div, classCss) {
    div.classList.add(classCss);
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
    return this.findZeroElements;
  }
  openAllMine() {
    let mine = [];
    for (let i = 0; i < this.gameMap.length; i++) {
      if (this.gameMap[i] < 0) {
        mine.push(i);
      }
    }

    return mine;
  }
}
/*
metod (){
  if{
    if{
      if{
        something_1()
      } else something_2()
    }else something_3()
  }else something_4()
}

metod(){
  if{
    something_1()
  }something_2()
}
something_1(){
  if{
    something_3()
  }something_4()
}
  
}*/

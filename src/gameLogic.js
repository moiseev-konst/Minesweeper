export class Logic {
  constructor() {
    this.gameSize;
    this.mapLength;
    this.quantityMine;
    this.gameMap = [];
    this.gameMine = [];
    this.arrayOpenCells = [];
    this.arrayFlagCells = [];
    this.firstClick;
  }
  state = () => {};
  startGame() {}
  getState() {
    let state = this.state();
    this.gameSize = state.gameSize;
    this.quantityMine = state.quantityMine;
    this.gameMap = state.gameMap;
    this.gameMine = state.gameMine;
    this.mapLength = state.mapLength;
    this.arrayOpenCells = state.arrayOpenCells;
    this.arrayFlagCells = state.arrayFlagCells;
    this.firstClick = state.firstClick;
  }

  checkingCell(index) {
    this.getState();
    if (this.firstClick == undefined) {
      this.sendFirst(index);
     
    } else if (
      this.arrayFlagCells.indexOf(index) < 0 &&
      this.arrayOpenCells.indexOf(index) < 0
    ) {
      if (this.gameMap[index] < 0) {
       // this.youLose();
      } else if (this.gameMap[index] == 0) {
        this.sendCells(this.findCells(index));
      } else {
        this.sendCell(index);
      }
    }
  }
  checkingFlag(index) {
    this.getState();
    if (
      this.arrayFlagCells.indexOf(index) < 0 &&
      this.arrayOpenCells.indexOf(index) < 0
    ) {
      this.sendFlag(this.arrayFlagCells.push(index));
    } else if (this.arrayFlagCells.indexOf(index) >= 0) {
      this.sendFlag(
        this.arrayFlagCells.splice(this.arrayFlagCells.indexOf(index), 1)
      );
    }
  }

  findCells = () => {};
  sendCell = () => {};
  sendFlag = () => {};
  sendCells = () => {};
  sendFirst = () => {};
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
      this.endGame("win");
      this.stopWatch();
      this.gameMapHTML.removeEventListener("mousedown", this.mouseDown);
      this.gameMapHTML.removeEventListener("mouseup", this.mouseUp);
    }
  }
  youLose() {
    console.log("You Lose");

    this.endGame("lose");
  }
  endGame(endCondition) {
    let endDiv = document.createElement("div");
    endDiv.classList.add("endGame");
    let text =
      endCondition == "win" ? "You won the battle!!!" : "You lose, sucker!";
    endDiv.innerText = text;
    this.gameMapHTML.append(endDiv);
  }
}

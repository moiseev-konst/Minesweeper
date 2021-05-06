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
      this.firstClick = index;
      this.arrayOpenCells.push(index);
      this.onStartWatch()
      if (this.gameMap[index] == 0) {
        this.arrayOpenCells = this.arrayOpenCells.concat(
          this.onFindZeroCells(index)
        );
      }

      this.onSendFirst(this.firstClick, this.arrayOpenCells);
    } else if (
      this.arrayFlagCells.indexOf(index) < 0 &&
      this.arrayOpenCells.indexOf(index) < 0
    ) {
      if (this.gameMap[index] < 0) {
        this.youLose(index);
      } else if (this.gameMap[index] == 0) {
        this.arrayOpenCells = this.arrayOpenCells.concat(
          this.onFindZeroCells(index)
        );
        this.onSendCell(this.arrayOpenCells);
        this.youWin();
      } else {
        this.arrayOpenCells.push(index);
        this.onSendCell(this.arrayOpenCells);
        this.youWin();
      }
    }
  }

  checkingFlag(index) {
    this.getState();

    if (
      this.arrayFlagCells.indexOf(index) < 0 &&
      this.arrayOpenCells.indexOf(index) < 0
    ) {
      if (this.arrayFlagCells.length < this.quantityMine) {
        this.arrayFlagCells.push(index);
        this.onSendFlag(this.arrayFlagCells);
        this.youWin();
      }
    } else if (this.arrayFlagCells.indexOf(index) >= 0) {
      this.arrayFlagCells.splice(this.arrayFlagCells.indexOf(index), 1);
      this.onSendFlag(this.arrayFlagCells);
    }
  }
  checkingTwoBtn(index) {
    let allSurround = [];
    let noFlagSurround = [];
    let flag = 0;
    let collectionDiv = this.getCollectionDiv();
    this.getState();
    console.log("две кнопки");
    // let indexDiv = collectionDiv.indexOf(index);
    allSurround = this.onFindCells(index);
    console.log(collectionDiv[17].classList.contains("flag"));
    noFlagSurround = allSurround.filter((el) => {
      if (collectionDiv[el].classList.contains("flag")) {
        flag += 1;
      } else {
        return el >= 0;
      }
    });

    if (this.gameMap[index] == flag) {
      noFlagSurround.forEach((index) => {
        this.checkingCell(index);
      });
    }
  }
  onFindCells = () => {};
  onFindZeroCells = () => {};
  onSendCell = () => {};
  onSendFlag = () => {};
  onSendCells = () => {};
  onSendFirst = () => {};
  getCollectionDiv = () => {};
  getAllMine = () => {};
  onSendEndGame = () => {};
onStartWatch=()=>{}
onStopWatch=()=>{}

  youWin() {
    if (
      this.gameMine.every((mine) => {
        return (
          this.arrayFlagCells.indexOf(mine) >= 0 &&
          this.arrayFlagCells.length == this.gameMine.length
        );
      })
    ) {
      let allMap = [];
      for (let i = 0; i < this.gameMap.length; i++) {
        allMap.push(i);
      }
      this.arrayOpenCells = allMap;
      this.onStopWatch()
      this.onSendEndGame("win", this.arrayOpenCells);
    }
  }
  youLose(index) {
    console.log("You Lose");
    this.onStopWatch()
    this.arrayOpenCells = this.arrayOpenCells.concat(this.getAllMine());
    this.onSendEndGame("lose", this.arrayOpenCells, index);
  }
}

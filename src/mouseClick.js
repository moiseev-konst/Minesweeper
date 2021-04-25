export class MouseClick {
  constructor(gameMapHTML) {
    this.button;
    this.gameMapHTML = gameMapHTML;
  }
  mouseDown = (eventArg) => {
    console.log("mousedown");
    this.button = eventArg.buttons;
  };

  mouseUp = (eventArg) => {
    this.gameClickController(eventArg, this.button);
    console.log("mouseUp");
  };

  addListenerClick() {
    this.gameMapHTML.addEventListener("contexmenu", (eventArg) => {
      eventArg.preventDefault();
    });
    document.oncontextmenu = (e) => {
      e.preventDefault();
    };

    this.gameMapHTML.addEventListener("mousedown", this.mouseDown);
    this.gameMapHTML.addEventListener("mouseup", this.mouseUp);
  }

  removeListnerClick() {
    this.gameMapHTML.removeEventListener("mousedown", this.mouseDown);
    this.gameMapHTML.removeEventListener("mouseup", this.mouseUp);
  }
  getIndexDiv = () => {};

  gameClickController(eventArg, button) {
    console.log("Game COntril");
    console.log(this.getIndexDiv(eventArg.target));
    if (this.getIndexDiv(eventArg.target) >= 0) {
      console.log("click Cell");
      console.log(this.getIndexDiv(eventArg.target));
      if (button < 3) {
        console.log("click on button");
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
  sendLeftClick = () => {};
  sendRightClick = () => {};
  leftButtonClick(eventArg) {
    console.log("я вызван");
    this.sendLeftClick(this.getIndexDiv(eventArg.target));
  }
  rightButtonClick(eventArg) {
    console.log("я right вызван");
    this.sendRightClick(this.getIndexDiv(eventArg.target));
  }
  /* leftButtonClick(eventArg) {
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
    if (!eventArg.target.classList.contains("flag")) {
      this.openCellController(indexDivClick);
    }
  }*/

  /*  rightButtonClick(eventArg) {
    //console.log("right", eventArg);
    let indexDivClick = this.collectionDivMap.indexOf(eventArg.target);
    this.openCellController(indexDivClick, "flag");
  }*/

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
}

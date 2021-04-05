class MouseClick{
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

}
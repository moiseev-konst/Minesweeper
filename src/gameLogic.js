class Logic{
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
  youLose() {
    console.log("You Lose");
    this.stopWatch();
    this.endGame('loss');

    this.gameMapHTML.removeEventListener("mousedown", this.mouseDown);
    this.gameMapHTML.removeEventListener("mouseup", this.mouseUp);
  }

}
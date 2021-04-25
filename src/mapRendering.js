export class MapRendering {
  constructor(gameMapHTML) {
    this.gameSize;
    this.mapLength;
    this.collectionDivMap = [];
    this.gameMapHTML = gameMapHTML;
    this.arrayOpenCells;
    this.arrayFlagCells;
    this.gameMap;
  }
render=()=>{};
  createGameDiv(state) {
    this.clear();
    this.getState(state);
    this.createCollectionDiv();
    this.renderingMap();
    this.appendDiv();
  }
  getState=  (state)=> {
    this.gameSize = state.gameSize;
    this.mapLength = state.gameSize.row * state.gameSize.column;
    this.arrayOpenCells = state.arrayOpenCells;
    this.arrayFlagCells = state.arrayFlagCells;
    this.gameMap = state.gameMap;
  };
  getIndexDiv(refDiv) {
    let index = this.collectionDivMap.indexOf(refDiv);
    console.log('render index');
    return index;
  }
  clear() {
    this.gameMapHTML.innerHTML = "";
    this.collectionDivMap = [];
  }
  createDiv() {
    let div = document.createElement("div");
    div.classList.add("GameElement");
    return div;
  }
  createCollectionDiv() {
    for (let i = 0; i < this.mapLength; i++) {
      this.collectionDivMap.push(this.createDiv());
    }
  }
  appendDiv() {
    const fragment = document.createDocumentFragment();
    
    this.collectionDivMap.forEach((div) => {
      fragment.appendChild(div);
    });
    this.gameMapHTML.append(fragment);
  }

  renderingMap() {
    this.renderFlag();
    this.renderCells();
  }
  renderFlag() {
    for (let i = 0; i < this.arrayFlagCells.length; i++) {
      this.collectionDivMap[this.arrayFlagCells[i]].classList.add("flag");
    }
  }
  renderCells() {
    for (let i = 0; i < this.arrayOpenCells.length; i++) {
      if (this.collectionDivMap[this.arrayOpenCells[i]].classList.length < 2) {
        this.collectionDivMap[this.arrayOpenCells[i]].classList.add(this.selectСlassCss(this.arrayOpenCells[i]));
      }
    }
  }
  selectСlassCss(index) {
    if (this.gameMap[index] >= 0) {
      return `n${this.gameMap[index]}`;
    } else {
      return "mine";
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
}

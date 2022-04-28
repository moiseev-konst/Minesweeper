export class MapRendering {
    constructor(gameMapHTML, watch, countMine) {
        this.gameSize;
        this.mapLength;
        this.collectionDivMap = [];
        this.gameMapHTML = gameMapHTML;
        this.countMine = countMine;
        this.watch = watch;
        this.arrayOpenCells;
        this.arrayFlagCells;
        this.gameMap;
        this.endGame;
        this.explosion;
        this.timerValue;
        this.quantityMine;
        this.gameSelected;
        this.gameSelectionButton = []
        this.choise
    }
    render = () => {};
    watchRender = () => {};

    createGameDiv(state) {
        this.clear();
        this.getState(state);
        if (!this.gameSelected) {
            this.renderGameSelection();
        }
        this.createCollectionDiv();
        this.renderingMap();
        this.appendDiv();
        if (this.endGame != undefined) {
            this.renderEndGame(this.endGame);
        }

    }
    getState = (state) => {
        this.gameSize = state.gameSize;
        this.mapLength = state.gameSize.row * state.gameSize.column;
        this.arrayOpenCells = state.arrayOpenCells;
        this.arrayFlagCells = state.arrayFlagCells;
        this.gameMap = state.gameMap;
        this.endGame = state.endGame;
        this.explosion = state.explosion;
        this.timerValue = state.timerValue;
        this.quantityMine = state.quantityMine;
        this.gameSelected = state.gameSelected;
    };
    getIndexDiv(refDiv) {
        let index = this.collectionDivMap.indexOf(refDiv);
        return index;
    }
    getButton(refDiv) {
        let index = this.gameSelectionButton.indexOf(refDiv);
        this.renderGameSelection()
        return index;

    }
    getCollectionDiv() {
        return this.collectionDivMap;
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

    renderCountMine() {
        let text = `${this.quantityMine - this.arrayFlagCells.length}`
        this.countMine.innerText = ''

        let htmlEl = document.createElement("p");
        htmlEl.textContent = text;
        this.countMine.appendChild(htmlEl);
    }
    renderWatch(state) {
        let watchText = "00:00";
        this.getState(state);
        let second =
            this.timerValue % 60 < 10 ?
            "0" + Math.trunc(this.timerValue % 60) :
            Math.trunc(this.timerValue % 60).toString();
        let minutes =
            (this.timerValue / 60) % 60 < 10 ?
            "0" + Math.trunc((this.timerValue / 60) % 60) :
            Math.trunc((this.timerValue / 60) % 60).toString();

        watchText = `${minutes}:${second}`;
        this.watch.innerText = ''
        let htmlEl = document.createElement("p");
        htmlEl.textContent = watchText;
        this.watch.appendChild(htmlEl);
    }
    renderingMap() {
        this.renderFlag();
        this.renderCells();
        this.renderCountMine();

    }
    renderGameSelection() {
        if (!this.gameSelected) {
            this.gameMapHTML.innerHTML = ""
            this.choise = null
            this.gameSelectionButton = []
            this.choise = document.createElement("div");
            let easy = document.createElement("div");
            let medium = document.createElement("div");
            let hard = document.createElement("div");
            this.choise.classList.add('choice')
            easy.classList.add('btneasy')
            medium.classList.add('btnmedium')
            hard.classList.add('btnhard')
            easy.innerText = "easy"
            medium.innerText = "medium"
            hard.innerText = "hard"
            hard.id = "btnhard"
            easy.id = "btneasy"
            medium.id = "btnmedium"
            this.gameSelectionButton.push(easy)
            this.gameSelectionButton.push(medium)
            this.gameSelectionButton.push(hard)
            this.gameSelectionButton.map((el) => this.choise.appendChild(el))
            this.gameMapHTML.append(this.choise)
            this.gameSelected = true

        } else {
            this.choise.remove();
            this.gameSelectionButton = []
            this.choise = null
        }

    }

    renderEndGame(endCondition) {
        let endDiv = document.createElement("div");
        endDiv.classList.add("endGame");
        let text =
            endCondition == "win" ? "You won the battle!!!" : "You lose, sucker!";
        endDiv.innerText = text;
        this.gameMapHTML.append(endDiv);
        let removeDiv = () => {
            endDiv.remove();
            endDiv.removeEventListener("click", removeDiv);
        };
        endDiv.addEventListener("click", removeDiv);
    }
    renderFlag() {
        for (let i = 0; i < this.arrayFlagCells.length; i++) {
            this.collectionDivMap[this.arrayFlagCells[i]].classList.add("flag");
        }
    }
    renderCells() {
        for (let i = 0; i < this.arrayOpenCells.length; i++) {
            if (this.collectionDivMap[this.arrayOpenCells[i]].classList.length < 2) {
                if (this.explosion != this.arrayOpenCells[i]) {
                    this.collectionDivMap[this.arrayOpenCells[i]].classList.add(
                        this.selectСlassCss(this.arrayOpenCells[i])
                    );
                } else {
                    this.collectionDivMap[this.arrayOpenCells[i]].classList.add("n9");
                }
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

    openAllMap() {
        for (i = 0; i < this.gameMap.length; i++) {
            if (this.arrayOpenCells.indexOf(i) < 0)
                this.arrayOpenCells.push(i)
        }
    }
}
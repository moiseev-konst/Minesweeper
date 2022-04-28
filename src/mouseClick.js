export class MouseClick {
    constructor(gameMapHTML) {
        this.button;
        this.gameMapHTML = gameMapHTML;
    }
    mouseDown = (eventArg) => {
        this.button = eventArg.buttons;
        this.brightnessCell(eventArg)
    };

    mouseUp = (eventArg) => {
        this.gameClickController(eventArg, this.button);
        this.brightnessCell(eventArg)
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
    brightnessCell(eventArg) {
        if (eventArg.target !== this.gameMapHTML) {
            if (eventArg.type == "mousedown") {
                eventArg.target.classList.add("cell_brightness")
            } else {
                eventArg.target.classList.remove("cell_brightness")
            }
        }
    }
    getIndexDiv = () => {};
    getButton = () => {}
    sentBtnSelectGame = () => {}
    gameClickController(eventArg, button) {
        if (eventArg.target === this.gameMapHTML) { return null }

        if (this.getIndexDiv(eventArg.target) >= 0) {
            if (eventArg.target.lastChild !== null) { return null }
            if (button < 3) {


                this.oneButtonClick(eventArg);
            } else if (button == 3) {
                this.twoBtnClick(eventArg);
            }
        } else {
            let index = this.getButton(eventArg.target)
            if (index >= 0) {

                this.sentBtnSelectGame(index);
            }
        }
    }
    oneButtonClick(eventArg) {
        if (eventArg.button == 0) {
            this.leftButtonClick(eventArg);
        } else if (eventArg.button == 2) {
            this.rightButtonClick(eventArg);
        }
    }

    sendLeftClick = () => {};
    sendRightClick = () => {};
    sendTwoBtn = () => {};

    twoBtnClick(eventArg) {
        this.sendTwoBtn(this.getIndexDiv(eventArg.target));
    }

    leftButtonClick(eventArg) {
        this.sendLeftClick(this.getIndexDiv(eventArg.target));
    }

    rightButtonClick(eventArg) {
        this.sendRightClick(this.getIndexDiv(eventArg.target));
    }

}
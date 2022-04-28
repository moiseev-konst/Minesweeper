export class GameState {
    constructor(gameSize, quantityMine) {
        this.gameSize = gameSize;
        this.mapLength = this.gameSize.row * this.gameSize.column;
        this.quantityMine = quantityMine;
        this.gameMap = [];
        this.gameMine = [];
        this.arrayOpenCells = [];
        this.subscribes = [];
        this.arrayFlagCells = [];
        this.firstClick;
        this.endGame;
        this.explosion;
        this.timerValue = 0;
        this.initGame = false;
        this.gameSelected = false
    }
    getState() {
        let state = {
            gameSize: this.gameSize,
            mapLength: this.mapLength,
            quantityMine: this.quantityMine,
            gameMap: this.gameMap,
            gameMine: this.gameMine,
            arrayOpenCells: this.arrayOpenCells,
            arrayFlagCells: this.arrayFlagCells,
            firstClick: this.firstClick,
            endGame: this.endGame,
            explosion: this.explosion,
            timerValue: this.timerValue,
            initGame: this.initGame,
            gameSelected: this.gameSelected
        };
        return state;
    }
    setNewMap(gameSize, quantityMine) {
        this.gameSize = gameSize;
        this.mapLength = this.gameSize.row * this.gameSize.column;
        this.quantityMine = quantityMine;
        this.deliver(this.getState());
    }
    setNewGame() {
        this.gameMap = [];
        this.gameMine = [];
        this.arrayOpenCells = [];
        this.arrayFlagCells = [];
        this.firstClick = undefined;
        this.endGame = undefined;
        this.explosion = undefined;
        this.timerValue = 0;
        this.deliver(this.getState());
    }
    setStateFirstClick(firstClick, arrayOpenCells) {
        this.firstClick = firstClick;
        this.arrayOpenCells = arrayOpenCells;
        this.deliver(this.getState());
    }
    setStateLeftClick(indexes) {
        this.arrayOpenCells = indexes;
        this.deliver(this.getState());
    }
    setStateRightClick(newArrayFlagCells) {
        this.arrayFlagCells = newArrayFlagCells;
        this.deliver(this.getState());
    }
    setStateArray(arrayOpenCells) {
        this.arrayOpenCells = this.arrayOpenCells.concat(arrayOpenCells).sort();
        this.deliver(this.getState());
    }
    setStateEndGame(end, newArrayOpenCells, indexExplosion) {
        this.endGame = end;
        if (indexExplosion !== undefined) {
            this.explosion = indexExplosion;
            this.arrayOpenCells = newArrayOpenCells;
        } else {
            this.arrayOpenCells = newArrayOpenCells;
        }
        this.deliver(this.getState());
    }
    setStateMap(mapObj) {
        this.gameMap = mapObj.gameMap;
        this.gameMine = mapObj.gameMine;
        this.deliver(this.getState());
    }
    setTimerValue(value, fnRender) {
        this.timerValue = Number.parseInt(value / 1000);
        //this.deliver(this.getState());
        fnRender(this.getState())
    }
    setGameInited() {
        this.initGame = true
        this.deliver(this.getState())
    }
    setSelectGame(bool) {
        this.gameSelected = bool;
        this.deliver(this.getState())
    }
    addSubscribes(sub) {
        this.subscribes.push(sub);
    }
    deliver(data) {
        this.subscribes.forEach((sub) => {
            sub(data);
        });
    }
}
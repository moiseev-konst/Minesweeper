export class Map {
    constructor() {
        this.gameSize;
        this.mapLength;
        this.quantityMine;
        this.gameMap;
        this.gameMine;
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
    getState = (state) => {
        this.gameSize = state.gameSize;
        this.quantityMine = state.quantityMine;
        this.gameMap = state.gameMap;
        this.gameMine = state.gameMine;
        this.mapLength = this.gameSize.row * this.gameSize.column;
        this.findZeroElements = []
    };
    sendMap = () => {};

    createGameMap(state) {
        this.getState(state);
        this.createMap();
        if (typeof state.firstClick == "undefined") {
            let mapObj = { gameMap: this.gameMap, gameMine: this.gameMine };
            this.sendMap(mapObj)
        } else {
            this.writeMine(state.firstClick);
            this.writeNumberToMap();
            let mapObj = { gameMap: this.gameMap, gameMine: this.gameMine };
            this.sendMap(mapObj);
        }

    }
    createMap() {
        for (let i = 0; i < this.mapLength; i++) {
            this.gameMap[i] = 0;
        }
    }
    writeMine(firstClick) {
        while (this.gameMine.length < this.quantityMine) {
            let randomMine = Number.parseInt(this.mapLength * Math.random() + 1);
            if (randomMine !== firstClick && randomMine <= this.mapLength - 1 && this.gameMine.indexOf(randomMine) < 0) {
                this.gameMine.push(randomMine);
            }
        }
    }
    writeNumberToMap() {
        this.gameMine.forEach((indexMine) => {
            this.gameMap[indexMine] = -1;
            let surroundElements = this.findSurroundElements(indexMine);
            surroundElements.forEach((el) => {
                if (this.gameMap[el] >= 0) {
                    this.gameMap[el] += 1;
                }
            });
        });
    }
    parseIndexToCoordinates(index) {
        let row = Number.parseInt(index / this.gameSize.column);
        let column = index - row * this.gameSize.column;
        return { row, column, index };
    }
    parseCoordinatesToIndex(coordinateObject) {
        return coordinateObject.row * this.gameSize.column + coordinateObject.column;
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
    findSurroundingZero(index) {
        this.findSurroundElements(index).forEach((el) => {
            if (this.findZeroElements.indexOf(el) < 0) {
                this.findZeroElements.push(el);
                if (this.gameMap[el] == 0) {
                    this.findSurroundingZero(el);
                }
            }
        });
        if (this.findZeroElements.indexOf(index) < 0) {
            this.findZeroElements.push(index);
        }
        return this.findZeroElements;
    }
    findAllMine() {
        let mine = [];
        for (let i = 0; i < this.gameMap.length; i++) {
            if (this.gameMap[i] < 0) {
                mine.push(i);
            }
        }
        return mine;
    }
}
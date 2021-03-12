import { createGameMap } from "./createGameMap.js";
import { writeMine } from "./writeMine.js";
import { writeNumberToMap } from "./writeNumberToGameMap.js";

export function ConstructorGameObject(gameSize, quantityMine) {
  this.gameSize = gameSize;
  this.quantityMine = quantityMine;
  this.arrayGameMapElement = [];
  this.coordinateFirstClick = 0;
  this.arrayGameMineCoordinate = [];
  this.countFlag = 0;
  this.countMine = 0;

  this.createArrayGameMapElement = (gameSize) => {//за
    this.arrayGameMapElement = createGameMap(gameSize);
  };

  this.writeMineInArrayGameMapElement = () => {
    this.arrayGameMineCoordinate = writeMine(
      this.arrayGameMapElement,
      this.coordinateFirstClick,
      this.quantityMine
    );
  };

  this.writeNumberInArrayGameMapElement = () => {
    writeNumberToMap(this.arrayGameMapElement, this.arrayGameMineCoordinate);
  };
  this.parseIdElementInObjectCoordinate = (id) => {
    return {
      row: Number.parseInt(/\d+(?=c)/.exec(id).join("")),
      column: Number.parseInt(/\d+$/.exec(id).join("")),
    };
  };
  this.createArrayGameMapElement(this.gameSize)
}

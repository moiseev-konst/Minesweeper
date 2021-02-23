
const coordinateSurroundingElements = [
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
];
export function writeNumberToMap(gameMap, gameMine) {
  console.log("writeNumber");

  gameMine.forEach((mine) => {
    let surroundElements = findSurroundElements(mine);
    surroundElements.forEach((el) => {
      if (gameMap[mine.row + el.x][mine.column + el.y] >= 0) {
        gameMap[mine.row + el.x][mine.column + el.y] += 1;
      }
    });
  });
  console.log(gameMap);
}
function findSurroundElements(mine) {
  let find = coordinateSurroundingElements.filter((el) => {
    return (
      mine.row + el.x >= 0 &&
      mine.row + el.x <= 8 &&
      mine.column + el.y >= 0 &&
      mine.column + el.y <= 8
    );
  });
  return find;
}

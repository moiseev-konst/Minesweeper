export function createGameMap(gameSize) {
  const collectionDivMapElement = [];
  const gameMap = [];
  for (let i = 0; i <= gameSize.row - 1; i++) {
    gameMap[i] = [];
    for (let j = 0; j <= gameSize.column - 1; j++) {
      gameMap[i][j] = 0;
      collectionDivMapElement.push(
        `<div class="GameElement" id="r${i}c${j}"></div>`
      );
    }
  }
  const mineMapHTML = document.getElementById("mineMap");
  mineMapHTML.innerHTML = "";
  mineMapHTML.innerHTML = collectionDivMapElement.join("");
  return gameMap;
}

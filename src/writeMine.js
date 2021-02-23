

export function writeMine(gameMap,firstClick,quantityMine) {

  const collectionMine = [];

  const mapLength = gameMap.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.length;
  }, 0);

  for (let i = 0; i < quantityMine; i++) {
    let randomMine = Number.parseInt(mapLength * Math.random() + 1);

    let coordinates = getСoordinatesRadomMine(randomMine);
    
    if (!gameMap[coordinates.row][coordinates.column] && coordinates.row!=firstClick.row && coordinates.column!=firstClick.column) {
      gameMap[coordinates.row][coordinates.column] = -1;
      collectionMine.push(coordinates);
    } else {
      i -= 1;
    }
   
  }
  return collectionMine;
}

function getСoordinatesRadomMine(randomMine) {
  let row = Number.parseInt((randomMine - 1) / 9);
  let column = randomMine - 9 * Number.parseInt((randomMine - 1) / 9) - 1;
  return { row, column, randomMine };
}

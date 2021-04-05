export function elementClick(IdElement, game) {
  const gameClassName = [
    "numberZero",
    "numberOne",
    "numberTwo",
    "numberTree",
    "numberFour",
    "numberFive",
    "numberSix",
    "numberSeven",
    "numberEight",
    "mine"
  ];
  let divElement = document.getElementById(IdElement);
  let coordinateElement = game.parseIdElementInObjectCoordinate(IdElement);
  let numberInElement =
    game.arrayGameMapElement[coordinateElement.row][coordinateElement.column];
     
    divElement.classList.add(`n${numberInElement<0?9:numberInElement}`)
  
}



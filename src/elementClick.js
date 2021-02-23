export function elementClick(IdElement, game) {
  let divElement = document.getElementById(IdElement);
  let coordinateElement = game.parseIdElementInObjectCoordinate(IdElement);
  let numberInElement =
    game.arrayGameMapElement[coordinateElement.row][coordinateElement.column];

  if (numberInElement >= 0) {
    addNumberClassName(divElement, numberInElement);
  } else {
    addMineClassName(divElement);
  }
 
}
function addNumberClassName(divElement, numberInElement) {
  switch (numberInElement) {
    case 1:
      divElement.classList.add("numberOne");
      break;
    case 2:
      divElement.classList.add("numberTwo");
      break;
    case 3:
      divElement.classList.add("numberTree");
      break;
    case 4:
      divElement.classList.add("numberFour");
      break;
    case 5:
      divElement.classList.add("numberFive");
      break;
    case 6:
      divElement.classList.add("numberSix");
      break;
    case 7:
      divElement.classList.add("numberSeven");
      break;
    case 8:
      divElement.classList.add("numberEight");
      break;
    case 0:
      divElement.classList.add("numberZero");
      break;
  }
}
function addMineClassName(divElement) {
  divElement.classList.add("mine");
}

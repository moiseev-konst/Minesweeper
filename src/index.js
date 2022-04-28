import { GameState } from "./stateGame.js";
import { Map } from "./Map.js";
import { MapRendering } from "./mapRendering.js";
import { MouseClick } from "./mouseClick.js";
import { Logic } from "./gameLogic.js";
import { Timer } from "./timer.js";

let state, logic, timer, render, map, mouse;
const btnStart = document.getElementById("btnstartgame");
const gameMapHTML = document.getElementById("mineMap");
btnStart.addEventListener("click", newGame);
const watch = document.getElementById("stopWatch");
const countMine = document.getElementById("countMine");
const btnchoise = document.getElementById("btnchoise")
btnchoise.addEventListener('click', gameSelection)

const mineMap = document.getElementById("mineMap");


function gameSelection() {
    mouse.addListenerClick()
    state.initGame ? (state.setSelectGame(false), state.setNewGame()) : (
        state.addSubscribes(render.watchRender),
        state.addSubscribes(render.render),
        state.setGameInited()
    )
}

function chooseEasy() {
    startGame({ row: 9, column: 9 }, 10, 'easy')
}

function chooseMedium() {
    startGame({ row: 16, column: 16 }, 45, 'medium')
}

function chooseHard() {
    startGame({ row: 16, column: 30 }, 99, 'hard')
}

function newGame() {
    state.setNewGame()
}

function startGame(mapSise, amountMine, classMap) {
    mineMap.classList.remove("easy", 'medium', 'hard')
    state.setNewMap(mapSise, amountMine)
    state.setSelectGame(true);
    mineMap.classList.add(classMap)
    logic.onStopWatch()
    map.createGameMap(state.getState());
}

function init() {
    state = new GameState({ row: 16, column: 16 }, 45);
    logic = new Logic();
    timer = new Timer();
    render = new MapRendering(gameMapHTML, watch, countMine);
    map = new Map();
    mouse = new MouseClick(gameMapHTML);

    map.sendMap = (mapObj) => {
        state.setStateMap(mapObj);
    };
    render.render = (data) => {
        render.createGameDiv(data);
    };
    render.watchRender = (data) => {
        render.renderWatch(data);
    };
    timer.onTick = (ms) => {
        state.setTimerValue(ms, render.watchRender);
    };
    mouse.getIndexDiv = (el) => {
        return render.getIndexDiv(el);
    };
    mouse.sendLeftClick = (index) => {
        logic.checkingCell(index);
    };
    mouse.sendRightClick = (index) => {
        logic.checkingFlag(index);
    };
    mouse.sendTwoBtn = (index) => {
        logic.checkingTwoBtn(index);
    };
    mouse.getButton = (el) => {
        return render.getButton(el)
    }
    mouse.sentBtnSelectGame = (index) => {
        logic.selectGame(index)
    }
    logic.onCreateMap = () => {
        map.createGameMap(state.getState())
    }
    logic.onSendCell = (newArr) => {
        state.setStateLeftClick(newArr);
    };
    logic.onSendFlag = (newArr) => {
        state.setStateRightClick(newArr);
    };
    logic.onSendFirst = (first, index) => {
        state.setStateFirstClick(first, index);
    };
    logic.onSendCells = (arr) => {
        state.setStateArray(arr);
    };
    logic.onFindZeroCells = (index) => {
        return map.findSurroundingZero(index);
    };
    logic.onFindCells = (index) => {
        return map.findSurroundElements(index);
    };
    logic.state = () => {
        return state.getState();
    };
    logic.getCollectionDiv = () => {
        return render.getCollectionDiv();
    };
    logic.getAllMine = () => {
        return map.findAllMine();
    };
    logic.onSendEndGame = (end, arrayOpenCells, index) => {
        state.setStateEndGame(end, arrayOpenCells, index);
    };
    logic.onStartWatch = () => {
        timer.start();
    };
    logic.onStopWatch = () => {
        timer.stop();
    };
    logic.onStopClick = () => {
        mouse.removeListnerClick();
    };
    logic.onSendSelectGame = (bool) => {
        state.setSelectGame(bool)
    }
    logic.chooseEasy = () => { chooseEasy() }
    logic.chooseMedium = () => { chooseMedium() }
    logic.chooseHard = () => { chooseHard() }

}
init()
gameSelection()
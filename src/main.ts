let UI = {gameDiv: document.getElementById("game-div")};

let gameOptions = {
    gameSize:{
        height:400,
        width:600
    }

};

class Target {
    size: number;
    delay: number;
    lifeTime: number;
    locks: number;
}

function initializeGame() {
    UI.gameDiv.style.height = String(gameOptions.gameSize.height+"px");
    UI.gameDiv.style.width = String(gameOptions.gameSize.width+"px");
}
initializeGame();

function createTargetDiv(type:string = "target") {
    let target = document.createElement("div");
    target.classList.add(type);
    return target;
}

function startGame() {

}
startGame();


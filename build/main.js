var UI = { gameDiv: document.getElementById("game-div") };
var gameOptions = {
    gameSize: {
        height: 400,
        width: 600
    }
};
function initializeGame() {
    UI.gameDiv.style.height = String(gameOptions.gameSize.height + "px");
    UI.gameDiv.style.width = String(gameOptions.gameSize.width + "px");
}
initializeGame();
function createTarget(type) {
    if (type === void 0) { type = "target"; }
    var target = document.createElement("div");
    target.classList.add(type);
    return target;
}
function startGame() {
}
startGame();
//# sourceMappingURL=main.js.map
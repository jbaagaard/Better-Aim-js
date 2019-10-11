var UI = { gameDiv: document.getElementById("game-div") };
var gameOptions = {
    gameSize: {
        height: 400,
        width: 600
    }
};
function createTargetDiv(type) {
    if (type === void 0) { type = "target"; }
    var target = document.createElement("div");
    target.classList.add(type);
    return target;
}
var Target = /** @class */ (function () {
    function Target(props) {
        this.options = {
            position: "fixed",
            x: 0,
            y: 0
        };
        this.size = 50;
        this.delay = 0;
        this.lifeTime = 10.0;
        this.locks = 0;
        this.options = props.options;
        this.size = props.size;
        this.delay = props.delay;
        this.lifeTime = props.lifeTime;
        this.locks = props.locks;
        this.create();
    }
    Target.prototype.create = function (context) {
        var _this = this;
        if (context === void 0) { context = this; }
        this.div = document.createElement("div");
        this.div.classList.add("target");
        this.div.addEventListener('mousedown', function () { return _this.clicked(); });
        UI.gameDiv.append(this.div);
    };
    Target.prototype.kill = function (div) {
        if (div === void 0) { div = this.div; }
        this.div.style.animation = 'explode 70ms forwards';
        setTimeout(function () {
            UI.gameDiv.removeChild(div);
        }, 70);
    };
    Target.prototype.clicked = function () {
        this.kill();
    };
    return Target;
}());
function initializeGame() {
    UI.gameDiv.style.height = String(gameOptions.gameSize.height + "px");
    UI.gameDiv.style.width = String(gameOptions.gameSize.width + "px");
}
initializeGame();
var targetlist = [
    new Target({})
];
function startGame() {
}
startGame();
//# sourceMappingURL=main.js.map
var UI = { gameDiv: document.getElementById("game-div") };
var gameOptions = {
    gameSize: {
        height: 400,
        width: 600
    }
};
function randomNumber(min, max) {
    return (Math.random() * (max - min)) + min;
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
        this.isClicked = false;
        this.color = "#1759e8";
        this.isDead = false;
        this.startTime = 0;
        this.options = props.options;
        this.size = props.size;
        this.delay = props.delay;
        this.lifeTime = props.lifeTime;
        this.locks = props.locks;
    }
    Target.prototype.create = function () {
        var _this = this;
        this.startTime = 0; //datetime now
        this.div = document.createElement("div");
        this.div.classList.add("target");
        this.div.style.height = this.size + "px";
        this.div.style.width = this.size + "px";
        this.div.addEventListener('mousedown', function () { return _this.clicked(); });
        if (this.options.position == "fixed") {
            this.div.style.position = "absolute";
            this.div.style.top = this.options.y + "px";
            this.div.style.left = this.options.x + "px";
        }
        if (this.options.position == "random") {
            this.div.style.position = "absolute";
            this.div.style.top = randomNumber(parseInt(this.options.y), parseInt(this.options.y2)) + "px";
            this.div.style.left = randomNumber(parseInt(this.options.x), parseInt(this.options.x2)) + "px";
        }
        if (this.locks > 0)
            this.div.style.backgroundColor = "gray";
        this.div.style.zIndex = 10000 - this.locks;
        var div = this.div;
        setTimeout(function () {
            UI.gameDiv.append(div);
        }, this.delay * 1000);
        setTimeout((function () {
            _this.kill();
        }), (this.delay + this.lifeTime) * 1000);
    };
    Target.prototype.kill = function (div) {
        if (div === void 0) { div = this.div; }
        this.isDead = true;
        div.style.animation = 'explode 70ms forwards';
        setTimeout(function () {
            UI.gameDiv.removeChild(div);
        }, 70);
    };
    Target.prototype.updateLock = function () {
        if (this.locks > 0) {
            this.locks--;
            if (this.locks == 0)
                this.div.style.backgroundColor = this.color;
        }
    };
    ;
    Target.prototype.clicked = function () {
        if (this.isClicked || this.locks > 0)
            return;
        updateTargetLocks();
        this.kill();
        this.isClicked = true;
    };
    return Target;
}());
function initializeGame() {
    UI.gameDiv.style.height = String(gameOptions.gameSize.height + "px");
    UI.gameDiv.style.width = String(gameOptions.gameSize.width + "px");
}
initializeGame();
var targetList = [
    new Target({
        options: {
            position: "fixed",
            x: 50,
            y: 50
        },
        size: 50,
        delay: 0,
        lifeTIme: 3,
        locks: 0,
        lifeTime: 10
    }),
    new Target({ options: { position: "fixed", x: 0, x2: 550, y: 0, y2: 350 }, size: 50, delay: 0, locks: 1, lifeTime: 10 }),
    new Target({ options: { position: "random", x: 0, x2: 550, y: 0, y2: 350 }, size: 50, delay: 0, locks: 2, lifeTime: 10 }),
    new Target({ options: { position: "random", x: 0, x2: 550, y: 0, y2: 350 }, size: 50, delay: 0, locks: 3, lifeTime: 10 }),
    new Target({ options: { position: "random", x: 0, x2: 550, y: 0, y2: 350 }, size: 50, delay: 0, locks: 4, lifeTime: 10 }),
    new Target({ options: { position: "random", x: 0, x2: 550, y: 0, y2: 350 }, size: 50, delay: 0, locks: 5, lifeTime: 10 })
];
var Game = /** @class */ (function () {
    function Game(inputTargetList) {
        targetList = inputTargetList;
    }
    Game.prototype.aliveTargetExists = function (targetList) {
        for (var i = 0; i < targetList.length; i++) {
            if (!targetList[i].isDead)
                return true;
        }
        return false;
    };
    Game.prototype.updateTargetLocks = function (targetList) {
        for (var i = 0; i < targetList.length; i++) {
            targetList[i].updateLock();
        }
        targetList;
    };
    Game.prototype.startGame = function (targetList) {
        for (var i = 0; i < targetList.length; i++) {
            targetList[i].create();
        }
    };
    return Game;
}());
function aliveTargetExists(targetList) {
    for (var i = 0; i < targetList.length; i++) {
        if (!targetList[i].isDead)
            return true;
    }
    return false;
}
function updateTargetLocks() {
    for (var i = 0; i < targetList.length; i++) {
        targetList[i].updateLock();
    }
}
function startGame() {
    for (var i = 0; i < targetList.length; i++) {
        targetList[i].create();
    }
}
startGame();
function nodeParser(node) {
    switch (node.type) {
        case "target":
            return new Target(node.props);
        case "repeat":
            console.log("repeat");
            break;
        default:
            console.log("else");
            break;
    }
    return [];
}
console.log(nodeParser({ type: "target", props: {} }));
//# sourceMappingURL=main.js.map
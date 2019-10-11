let UI = {gameDiv: document.getElementById("game-div")};

let gameOptions = {
    gameSize:{
        height:400,
        width:600
    }

};

function createTargetDiv(type:string = "target") {
    let target = document.createElement("div");
    target.classList.add(type);
    return target;
}


class Target {

    options: any = {
        position: "fixed",
        x: 0,
        y: 0
    };
    size: number = 50;
    delay: number = 0;
    lifeTime: number = 10.0;
    locks: number = 0;
    div;

    constructor(props) {
        this.options = props.options;
        this.size = props.size;
        this.delay = props.delay;
        this.lifeTime = props.lifeTime;
        this.locks = props.locks;
        this.create();
    }

    private create(context = this){
        this.div = document.createElement("div");
        this.div.classList.add("target");
        this.div.addEventListener('mousedown',() => this.clicked());
        UI.gameDiv.append(this.div);
        if(this.options.position === "fixed"){
            //this.div.style.top = this.options.x;
        }
    }

    public kill(div = this.div){
        this.div.style.animation = 'explode 70ms forwards';
        setTimeout(function () {
            UI.gameDiv.removeChild(div);
        }, 70);

    }

    public clicked(){

        this.kill();
    }
}


function initializeGame() {
    UI.gameDiv.style.height = String(gameOptions.gameSize.height+"px");
    UI.gameDiv.style.width = String(gameOptions.gameSize.width+"px");
}
initializeGame();


let targetlist = [
    new Target({
        size:50,
        delay:0,
        lifeTIme:3,
        locks:0
    })
];
function startGame() {

}
startGame();



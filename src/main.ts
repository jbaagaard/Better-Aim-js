let UI = {gameDiv: document.getElementById("game-div")};

let gameOptions = {
    gameSize:{
        height:400,
        width:600
    }

};

function randomNumber(min,max) {
    return (Math.random()*(max-min))+min;
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
    isClicked: boolean = false;
    color: string = "#1759e8";
    isDead = false;
    startTime = 0;

    constructor(props) {
        this.options = props.options;
        this.size = props.size;
        this.delay = props.delay;
        this.lifeTime = props.lifeTime;
        this.locks = props.locks;
    }

    public create(){
        this.startTime = 0; //datetime now
        this.div = document.createElement("div");
        this.div.classList.add("target");
        this.div.style.height = this.size+"px";
        this.div.style.width = this.size+"px";
        this.div.addEventListener('mousedown',() => this.clicked());
        if(this.options.position == "fixed"){
            this.div.style.position = "absolute";
            this.div.style.top = this.options.y + "px";
            this.div.style.left = this.options.x + "px";
        }
        if(this.options.position == "random"){
            this.div.style.position = "absolute";
            this.div.style.top = randomNumber(parseInt(this.options.y),parseInt(this.options.y2)) + "px";
            this.div.style.left = randomNumber(parseInt(this.options.x),parseInt(this.options.x2)) + "px";
        }

        if(this.locks > 0)
            this.div.style.backgroundColor = "gray";

        this.div.style.zIndex = 10000 - this.locks;

        let div = this.div;
        setTimeout(function () {
            UI.gameDiv.append(div);
        },this.delay*1000);

        setTimeout((()=> {
            this.kill();
        }),(this.delay+this.lifeTime)*1000)



    }

    public kill(div = this.div){
        this.isDead = true;
        div.style.animation = 'explode 70ms forwards';
        setTimeout(function () {
            UI.gameDiv.removeChild(div);
        }, 70);
    }

    public updateLock(){
        if(this.locks > 0){
            this.locks--;
            if(this.locks == 0)
                this.div.style.backgroundColor = this.color;
        }
    };

    public clicked(){
        if(this.isClicked || this.locks > 0)
            return;
        updateTargetLocks();
        this.kill();
        this.isClicked = true;
    }

}


function initializeGame() {
    UI.gameDiv.style.height = String(gameOptions.gameSize.height+"px");
    UI.gameDiv.style.width = String(gameOptions.gameSize.width+"px");
}
initializeGame();


let targetList = [
    new Target({
        options:{
            position: "fixed",
            x:50,
            y:50
        },
        size:50,
        delay:0,
        lifeTIme:3,
        locks:0,
        lifeTime:10
    }),
    new Target({options:{position: "fixed",x:0,x2:550,y:0,y2:350},size:50,delay:0,locks:1,lifeTime:10}),
    new Target({options:{position: "random",x:0,x2:550,y:0,y2:350},size:50,delay:0,locks:2,lifeTime:10}),
    new Target({options:{position: "random",x:0,x2:550,y:0,y2:350},size:50,delay:0,locks:3,lifeTime:10}),
    new Target({options:{position: "random",x:0,x2:550,y:0,y2:350},size:50,delay:0,locks:4,lifeTime:10}),
    new Target({options:{position: "random",x:0,x2:550,y:0,y2:350},size:50,delay:0,locks:5,lifeTime:10})
];

class gameController  {
    targetList: any;


    aliveTargetExists(targetList) {
        for(let i = 0;i<targetList.length;i++){
            if(!targetList[i].isDead)
                return true
        }
        return false
    }

    updateTargetLocks(targetList) {
        for(let i = 0;i<targetList.length;i++){
            targetList[i].updateLock();
        }targetList
    }

    startGame(targetList) {
        for(let i = 0;i<targetList.length;i++){
            targetList[i].create();
        }}


}
function aliveTargetExists(targetList) {
    for(let i = 0;i<targetList.length;i++){
        if(!targetList[i].isDead)
            return true
    }
    return false
}

function updateTargetLocks() {
    for(let i = 0;i<targetList.length;i++){
        targetList[i].updateLock();
    }
}
function startGame() {
    for(let i = 0;i<targetList.length;i++){
        targetList[i].create();
    }}


startGame();
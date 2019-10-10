'use strict';

let UI = {
    header: document.getElementById('header'),
    startGameButton: document.getElementById('startgame-btn'),
    wrapper: document.getElementById('wrapper'),
    gameWrapper: document.getElementById('game-wrapper'),
    gamemodeDropdown: document.getElementById('gamemode-dropdown'),
    effectOverlay: document.getElementById('effect-overlay'),
    logo: document.getElementById('game-wrapper-logo'),
    countdown: document.getElementById('countdown'),
    stats: {
        div: document.getElementById('stats'),
        score: document.getElementById('score'),
        time: document.getElementById('time'),
        targetsHit: document.getElementById('targets-hit'),
        accuracy: document.getElementById('accuracy'),
        reactionTime: document.getElementById('reaction-time'),
        target: document.getElementById('target-accuracy'),
        highscore: document.getElementById('highscore'),
    }
};

let effects = {
    flash: function () {
        let div = document.createElement('div');
        div.classList.add('effect-overlay');
        UI.wrapper.appendChild(div);

    },
    shake: function () {
        UI.gameWrapper.style.animation = 'shake 15 0ms';

        setTimeout(function () {
            UI.gameWrapper.style.animation = '';
        }, 100)
    }
};

UI.startGameButton.addEventListener('click', startgame);

UI.gameWrapper.addEventListener('click', function () {
    if (gameRunning === false)
        return;
    missClicks++;
});

if (localStorage.getItem('highscore') === null)
    localStorage.setItem('highscore', 0);


function Target(behaviour) {
    let startTime = gameTimer;
    let timer = 0;
    let clicked = false;
    let div = document.createElement('div');
    let clickedPos = [];
    UI.gameWrapper.appendChild(div);
    div.classList.add('target');

    let size = Math.round(getRandomNumber(behaviour.sizeMin, behaviour.sizeMax)) + 'px';
    div.style.width = size;
    div.style.height = size;

    function scramblePos() {
        let w = UI.gameWrapper.offsetWidth - div.offsetWidth;
        let h = UI.gameWrapper.offsetHeight - div.offsetHeight;
        div.style.left = parseInt(Math.random() * w) + 'px';
        div.style.top = parseInt(Math.random() * h) + 'px';

    }

    function centerPos() {

        div.style.left = parseInt((UI.gameWrapper.offsetWidth / 2) - div.offsetWidth / 2) + 'px';
        div.style.top = parseInt((UI.gameWrapper.offsetHeight / 2) - div.offsetHeight / 2) + 'px';
    }

    if (behaviour.position === 'random')
        scramblePos();
    if (behaviour.position === 'center')
        centerPos();

    if (behaviour.animation === 'colorChange') {
        //div.style.transition = `background-color: ${behaviour.lifetime}ms`;
        div.style.transition = 'background-color ' + parseInt(behaviour.lifetime) + 'ms';
        setTimeout(function () {
            div.style.backgroundColor = '#767676';
        }, 0);
    }

    function kill() {

        if (behaviour.onclickAnimation === 'explode') {
            div.style.animation = 'explode 70ms forwards';
            setTimeout(function () {
                UI.gameWrapper.removeChild(div);
            }, 70)
        } else {
            UI.gameWrapper.removeChild(div);
        }

        if (!clicked) {
            timer = behaviour.lifetime;
            effects.shake();
        }

        //console.log(timer);
    }

    setTimeout(function () {
        if (!clicked)
            kill();
    }, behaviour.lifetime);

    div.addEventListener('mousedown', function (event) {
        effects.flash();
        clicked = true;
        timer = gameTimer - startTime;
        //console.log('topleft: '+parseInt(div.style.left)+' '+parseInt(div.style.top));
        //console.log('relpos: ' + calcRelPos(event));
        clickedPos = calcRelPos(event);
        kill();
    });

    function calcRelPos(event) {
        let PosX = event.clientX - parseInt(div.style.left);
        // console.log(parseInt(div.style.left) +' '+ event.clientX);
        let PosY = event.clientY - parseInt(div.style.top) - UI.header.offsetHeight;
        return [PosX, PosY]
    }

    this.getClickedState = function () {
        return clicked;
    };

    this.getTimer = function () {
        return timer;
    };

    this.getClickedPos = function () {
        return clickedPos;
    };

    this.getSize = function () {
        // console.log(div.style.height+' '+div.style.height);
        return [div.style.height, div.style.width];
    }

}

function getRandomNumber(min, max) {
    max = max - min;
    return Math.random() * max + min
}


let gamemode = {
    default: {
        name: 'default',
        spawnSpeedMin: 2000,
        spawnSpeedMax: 2000,
        spawnSpeedMod: 0,
        spawnSpeedLimit: 1000,
        amount: 5,
        target: {
            sizeMin: 75,
            sizeMax: 75,
            lifetime: 3000,
            animation: 'colorChange',
            position: 'random',
            direction: 'random',
            speed: 0,
            onclickAnimation: 'explode',
        }
    },
    reaction: {
        name: 'reaction',
        spawnSpeedMin: 2000,
        spawnSpeedMax: 5000,
        spawnSpeedMod: 0,
        spawnSpeedLimit: 1000,
        amount: 5,
        target: {
            sizeMin: 500,
            sizeMax: 500,
            lifetime: 1000,
            animation: 'fade',
            position: 'center',
            direction: 'random',
            speed: 0,
            onclickAnimation: 'explode',
        }
    },
    fast: {
        name: 'fast',
        spawnSpeedMin: 500,
        spawnSpeedMax: 500,
        spawnSpeedMod: 0,
        spawnSpeedLimit: 1000,
        amount: 25,
        target: {
            sizeMin: 75,
            sizeMax: 75,
            lifetime: 1000,
            animation: 'fade',
            position: 'random',
            direction: 'random',
            speed: 0,
            onclickAnimation: 'explode',
        }
    },
    precision: {
        name: 'precision',
        spawnSpeedMin: 1000,
        spawnSpeedMax: 1000,
        spawnSpeedMod: 0,
        spawnSpeedLimit: 1000,
        amount: 25,
        target: {
            sizeMin: 15,
            sizeMax: 15,
            lifetime: 2000,
            animation: 'fade',
            position: 'random',
            direction: 'random',
            speed: 0,
            onclickAnimation: 'explode',
        }
    },
    challengeMode: {
        name: 'challangemode',
        spawnSpeedMin: 500,
        spawnSpeedMax: 500,
        spawnSpeedMod: -5,
        spawnSpeedLimit: 200,
        amount: 100,
        target: {
            sizeMin: 100,
            sizeMax: 300,
            lifetime: 3000,
            animation: 'colorChange',
            position: 'random',
            direction: 'random',
            speed: 0,
            onclickAnimation: 'explode',
        }
    },
};

let gameOptions = gamemode.default;


let gameRunning = false;


let gameTimer = 0;


function graphCurve(x, y) {
    return Math.pow(x, -1)
}

let targetArray = [];
let missClicks = -1;
let targetsSpawned = 0;

function startgame() {
    if (gameRunning)
        return;
    gameRunning = true;
    UI.startGameButton.style.visibility = 'hidden';
    UI.logo.style.animation = 'rotate-left 1000ms';
    UI.countdown.classList.add('countdown');
    UI.stats.div.style.visibility = 'hidden';

    if (UI.gamemodeDropdown.value === 'fast')
        gameOptions = gamemode.fast;
    else if (UI.gamemodeDropdown.value === 'precision')
        gameOptions = gamemode.precision;
    else if (UI.gamemodeDropdown.value === 'reaction')
        gameOptions = gamemode.reaction;
    else if (UI.gamemodeDropdown.value === 'challengeMode')
        gameOptions = gamemode.challengeMode;
    else
        gameOptions = gamemode.default;

    gameTimer = 0;
    targetArray = [];
    targetsSpawned = 0;

    setTimeout(function () {
        missClicks = -1;
    }, 2000);

    let timerCounter = setInterval(function () {
        gameTimer += 10;
    }, 10);

    function calcSpawntimer(gameOptions, targetsSpawned) {
        if (targetsSpawned === 0)
            return 2500;

        let spawntimer = getRandomNumber(gameOptions.spawnSpeedMin, gameOptions.spawnSpeedMax)
            + (targetsSpawned * gameOptions.spawnSpeedMod);
        if (spawntimer < gameOptions.spawnSpeedLimit)
            spawntimer = gameOptions.spawnSpeedLimit;
        return spawntimer;
    }


    function gameLoop() {
        let spawntimer = calcSpawntimer(gameOptions, targetsSpawned);
        // console.log(spawntimer);
        setTimeout(function () {
            targetsSpawned++;
            if (targetsSpawned > gameOptions.amount) {
                setTimeout(function () {
                    gameOver();
                }, gameOptions.target.lifetime);
                return;
            }

            targetArray.push(new Target(gameOptions.target));
            console.log(targetsSpawned + ' / ' + gameOptions.amount);

            if (targetsSpawned <= gameOptions.amount) {
                gameLoop();
            }
        }, spawntimer);
    }

    gameLoop();
    let runTime = (gameOptions.spawnSpeedMax * gameOptions.amount) + gameOptions.target.lifetime + 100;
    // +100 for ninceness
    //setTimeout(gameOver, runTime);

    function gameOver() {
        setGameoverUI();
        UI.startGameButton.style.visibility = 'visible';
        UI.logo.style.animation = 'rotate-right 3000ms';
        UI.countdown.classList.remove('dropdown');
        UI.stats.div.style.visibility = 'visible';


        //console.log(targetArray.map(x => x.getTimer()));
        clearInterval(timerCounter);
        console.log('game over');
        console.log('misclicks: ' + missClicks);
        gameRunning = false;
    }

    function setGameoverUI() {
        let score = 0;
        let targetsHit = 0;
        let totalHitTime = 0;
        while (UI.stats.target.firstChild) {
            UI.stats.target.removeChild(UI.stats.target.firstChild);
        }
        for (const target of targetArray) {
            if (target.getClickedState())
                targetsHit++;

            totalHitTime += target.getTimer();
            let pos = target.getClickedPos();
            let size = target.getSize();
            if (target.getClickedState() === true) {

                let div = document.createElement('div');
                div.classList.add('dot');
                UI.stats.target.appendChild(div);
                let left = pos[0] / parseInt(size[0]) * UI.stats.target.offsetWidth;
                let top = pos[1] / parseInt(size[1]) * UI.stats.target.offsetHeight;
                //console.log('pos[0]'+pos[0]+' size[0]'+size[0]+' target:'+UI.stats.target.offsetWidth+' x:'+pos[0]/parseInt(size[0])*UI.stats.target.offsetWidth);
                div.style.left = parseInt(left) + 'px';
                div.style.top = parseInt(top) + 'px';
            }
        }
        let accuracy = 0;
        if (targetsHit !== 0)
            accuracy = parseInt(targetsHit / (targetsHit + missClicks) * 100);

        console.log('targets hit: ' + targetsHit);
        UI.stats.targetsHit.innerHTML = 'targets hit: ' + targetsHit + '/' + gameOptions.amount;
        UI.stats.time.innerHTML = 'time: ' + parseInt(gameTimer / 1000) + 's';
        UI.stats.accuracy.innerHTML = 'accuracy: ' + accuracy + '%';
        UI.stats.reactionTime.innerHTML = 'avarage reaction time: ' + parseInt(totalHitTime / gameOptions.amount) + 'ms';
        score = targetsHit * accuracy;
        //score = targetsHit * accuracy - (totalHitTime / gameOptions.amount);
        UI.stats.score.innerHTML = 'score: ' + score;
        if (localStorage.getItem(gameOptions.name + 'highscore') === null || score > localStorage.getItem(gameOptions.name + 'highscore')) {
            UI.stats.highscore.innerHTML = 'HIGHSCORE: ' + score;
            localStorage.setItem(gameOptions.name + 'highscore', score);
        } else {
            UI.stats.highscore.innerHTML = 'HIGHSCORE: ' + localStorage.getItem(gameOptions.name + 'highscore');
        }

    }
}


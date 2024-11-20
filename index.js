console.log('running...');
var rnum;
var hnum;
var timing;
var score = 0;
var highscore = 0;

function bubgen() {
    var bubbles = "";
    for (var i = 1; i <= 152; i++) {
        rnum = Math.floor(Math.random() * 20);
        bubbles += `<button class="bub">${rnum}</button>`;
    }
    document.querySelector('#bbox').innerHTML = bubbles;
}

function hitnum() {
    hnum = Math.floor(Math.random() * 20);
    document.querySelector('#hnum').innerHTML = hnum;
}

function timer() {
    var time = 20;
    timing = setInterval(() => {
        if (time === 11) {
            document.querySelector('#time').style.color = 'red';
        }
        if (time > 0) {
            time--;
            document.querySelector('#time').textContent = time;
        } else {
            clearInterval(timing);
            document.querySelector('#bbox').innerHTML = "";
            document.querySelector('#stop').style.display = 'flex';
            document.querySelector('#stop').innerHTML = `
        <h2>YOUR SCORE: <strong>${score}</strong></h2>
        <button class="begin" id="restart">PLAY AGAIN?</button>
    `;
            if (score>highscore) {   
                highscore = score
                document.querySelector('#hscore').textContent = highscore
            }
            document.querySelector('#restart').addEventListener('click', () => {
                reset()
                startpage();
            });
        }
    }, 1000);
}

function startpage() {
    document.querySelector('#start').innerHTML = `
            <h2>FIND AND CLICK ON THE NUMBER INDICATED IN HIT FROM GIVEN BUBBLES</h2>
            <button class="begin" id="play">PLAY GAME</button>`;
    document.querySelector('#play').addEventListener('click', () => {
        playGame();
    });
}

function scorecheck() {
    document.querySelector('#bbox').addEventListener('click', (e) => {
        var clicknum = Number(e.target.innerHTML);
        if (clicknum === hnum) {
            score += 10;
            document.querySelector('#score').innerHTML = score;
            hitnum();
            bubgen();
        }
    });
}
function reset() {
    score = 0;
    document.querySelector('#hnum').innerHTML = '-';
    document.querySelector('#time').style.color = 'rgb(26, 40, 137)';
    document.querySelector('#time').textContent = "20";
    document.querySelector('#score').innerHTML = score;
    clearInterval(timing);
    document.querySelector('#stop').style.display = 'none';
    document.querySelector('#start').style.display = 'flex';
}


function playGame() {
    document.querySelector('#stop').style.display = 'none';
    document.querySelector('#start').style.display = 'none';
    timer();
    scorecheck();
    hitnum();
    bubgen();
}
startpage();

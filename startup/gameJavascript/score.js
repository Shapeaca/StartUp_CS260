let canAddScore = false;
let score = 0;

setCanAddScore();
setInterval(setCanAddScore, 1000);

function addScore() {
    if(canAddScore === true) {
        score++;
        canAddScore = false;
    }
}

function setCanAddScore() {
    canAddScore = true;
}

function getScore() {
    return score;
}
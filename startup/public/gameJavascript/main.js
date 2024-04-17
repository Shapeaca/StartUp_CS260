
//required game variables
const shipCenterX = 105; //px
let shipCurY = 210; //px - the top edge - + 30 for center;

const moveVelocity = 10;
let curRotation = 0;
let rotateVelocity = 0;
const rotateAcceleration = 0.7;
const rotateAccelerationSpacePressedMultiplier = 1.8;
const maximumAngle = 50; //degrees
const maximumVelocity = 5;

const shipIDStr = "playerShip";
const boxHeight = 60; //pxe

//edge detection points:
const shipPoints = [
    {radius: 55, xOffset: 55, yOffset:0}
];

//score local variables - other variables are on server
let nowTime = 0;
let startTime = 0;

//Geometry Dash Ship Movement Notes
/*
    * There is a maximum angle - 50 degrees?
    * High angular acceleration
    * low maximum velocity
 */

let blockArray = [];
let spacePressed = false;


//initialization and main game loop
checkLoginDetails(); //Where everything gets called

function checkLoginDetails() {
    let testBool = true; //fixme replace this with an actual login check
    //todo do I have to make a fetch request each time? Or can I just check if there is a username and an auth cookie
    //Fetch
    if(testBool === true) {
        initializeGame();
    } else {
        let loginBlockerElement = document.createElement("p");
        loginBlockerElement.setAttribute("id", "leaderboardLoginRestrictionText");
        loginBlockerElement.innerHTML = "Please login in order to play!";
        document.getElementById("playBox").appendChild(loginBlockerElement);
    }
}

function initializeGame() {
    createShip();
    createWall(1, 500, 0);
    createWall(2, 500, 60);
    createWall(3, 500, 120);
    createWall(4, 500, 180);

    startTime = Date.now();
    setInterval(main, 33.333);
}

function main() { //Runs 30 times per second

    moveWalls(-moveVelocity);
    rotateShip();
    //todo move moveShip() to this function

    blockArray.forEach(block => {
       if(block.xPos <= -70) {
           block.xPos = 650;
       }
    });

    //calculate and Update Score
    let score = updateScore();

    //wall collisions
    let collisionPoint = calculateNwPoint(shipPoints[0].radius, shipPoints[0].xOffset, shipPoints[0].yOffset, toRadians(curRotation));
    let isCollision = detectCollision(collisionPoint.xPoint, collisionPoint.yPoint);
    if(isCollision) { //todo add code here to reset the timer
        sendResetFinalScore(score);
        // console.log("COLLISION at x:" + collsionPoint.xPoint + " y:" + collsionPoint.yPoint);
    }

}




//misc functions below
function toRadians (angle) {
    return angle * (Math.PI / 180);
}

//Ship Movement
function rotateShip() {
    //define acceleration direction
    let intReverser;
    if(spacePressed) {
        intReverser = -1 * rotateAccelerationSpacePressedMultiplier;
    } else {
        intReverser = 1;
    }
    //define velocity
    rotateVelocity = rotateVelocity + (intReverser * rotateAcceleration);
    if (rotateVelocity < -maximumVelocity) {
        rotateVelocity = -maximumVelocity;
    } else if (rotateVelocity > maximumVelocity) {
        rotateVelocity = maximumVelocity;
    }
    //define rotation
    curRotation = curRotation + rotateVelocity;
    if (curRotation < -maximumAngle) {
        curRotation = -maximumAngle;
    } else if (curRotation > maximumAngle) {
        curRotation = maximumAngle;
    }
    //set rotation
    document.getElementById(shipIDStr).style.transform = `rotate(${curRotation}deg)`;
    moveShip();
}

function moveShip() {
    let verticalVelocity = moveVelocity * Math.sin(toRadians(curRotation));
    shipCurY += verticalVelocity;
    document.getElementById(shipIDStr).style.top = `${shipCurY}px`;
}

function detectCollision(shipPointX, shipPointY) {
    // let isCollision = false;
    for(let i = 0; i < blockArray.length; i++) {
        let sides = detectWallHitBox(blockArray[i].xPos, blockArray[i].yPos);
        if((sides.left > shipPointX) || (sides.right < shipPointX)) {
            continue;
        } else { //x value is equal to square
            if( (sides.top <= shipPointY) && (sides.bottom >= shipPointY) ) {
                return true; //IS Collision
            }
        }
    }
    return false;
}

function detectWallHitBox(posX, posY) {
    let boxSides = {left:Number(posX), right: Number(posX) + boxHeight, top: Number(posY), bottom: Number(posY) + boxHeight};
    return boxSides;
}

function calculateNwPoint(radius, xOffset, yOffset, angleRadians) { //todo text this function
    //fixme MAKE SURE y upward is negative for ALL variables
    let originalAngleRadians = Math.atan(yOffset / xOffset);
    let nwAngle = originalAngleRadians + angleRadians;

    let nwX = radius * Math.cos(nwAngle) + shipCenterX;
    let nwY = radius * Math.sin(nwAngle) + shipCurY + 30;

    return {xPoint: nwX, yPoint: nwY};
}





//Walls
function moveWalls(changeInXPos) {
    // console.log("Moving Walls:");
    blockArray.forEach(block => {
        block.xPos = Number(block.xPos) + Number(changeInXPos);
        // console.log(block.xPos);
        document.getElementById(block.blockID).style.left = `${block.xPos}px`;
    })
}

function createShip() {
    let shipElement = document.createElement('img');
    shipElement.src = `images/Ship014.webp`;
    shipElement.setAttribute("id", shipIDStr);
    document.getElementById("playBox").appendChild(shipElement);
}

function createWall(blockNum, xPos, yPos) {
    //create Img
    let blockElement = document.createElement('img');
    blockElement.src = `images/RegularBlock01.webp`;
    blockElement.setAttribute("class", "block")
    blockElement.setAttribute("id", `block${blockNum}`);
    document.getElementById("playBox").appendChild(blockElement);
    //add to blockArray
    let block = {blockID:`block${blockNum}`, xPos:`${xPos}`, yPos:`${yPos}`};
    blockArray.push(block);
    //Add CSS to position
    document.getElementById(`block${blockNum}`).style.top = `${yPos}px`;
    document.getElementById(`block${blockNum}`).style.left = `${xPos}px`;
}

function removeBlock(rmvBlockID) { //fixme this code doesn't work
    blockArray = blockArray.filter(block => block.blockID != rmvBlockID);
    let element = document.getElementById(rmvBlockID);
    element.remove();
}




//Event Listeners for Spacebar
document.addEventListener("keydown", event => {
    if(event.key === " ") {
        spacePressed = true;
        // console.log("Space Pressed");
    }
});

document.addEventListener("keyup", event => {
    if(event.key === " ") {
        spacePressed = false;
        // console.log("Space Released");
    }
});




//score function:
function calculateCurScore(timerStart, timerNow) {
    return timerNow - timerStart;
}

function updateScore() {
    nowTime = Date.now();
    let score = calculateCurScore(startTime, nowTime)
    let scoreStr = createTimeString(score);
    document.getElementById("scoreDisplay").innerHTML = `Current Score: ${scoreStr}`;
    return score;
}

function createTimeString(millisecondTime) {
    let milli = Math.floor(millisecondTime % 1000);
    let seconds = Math.floor((millisecondTime / 1000) % 60);
    let minutes = Math.floor((millisecondTime / 1000 / 60) % 60);
    let hours = Math.floor((millisecondTime / (1000 * 60 * 60)) % 24);

    let milliStr = milli.toString();
    while(milliStr.length < 3) {
        milliStr = "0" + milliStr;
    }
    let secondStr = seconds.toString();
    while(secondStr.length < 2) {
        secondStr = "0" + secondStr;
    }
    let minuteStr = minutes.toString();
    while(minuteStr.length < 2) {
        minuteStr = "0" + minuteStr;
    }
    let hourStr = hours.toString();
    while(hourStr.length < 2) {
        hourStr = "0" + hourStr;
    }

    return hourStr + ":" + minuteStr + ":" + secondStr + ":" + milliStr;
}





//calling http functions
function sendResetFinalScore(timerFinal) {
    if(timerFinal > 500) {
        startTime = Date.now();

        httpScorePost("shapeacaIsCool", timerFinal).then((responses) => {

            document.getElementById("lastScoreDisplay").innerHTML = `High Score: ${createTimeString(responses)}&nbsp&nbsp&nbsp&nbsp Number of Attempts: `;

        });

        // Promise.all([ httpScorePost("shapeacaIsCool", timerFinal)/*,  httpAttemptPut("shapeacaIsCool") */]).then((responses) => {
        //
        //     document.getElementById("lastScoreDisplay").innerHTML = `High Score: ${createTimeString(responses[0])}&nbsp&nbsp&nbsp&nbsp Number of Attempts: `;
        //
        // }); //todo add a catch statement

    }///*/!*${responses[1]}*!/*/
}

//https functions
async function httpScorePost(username, scoreMilliseconds) {
    return new Promise(async (resolve, reject) => {
        let objectToSend = ({user: username, score: scoreMilliseconds});

        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(objectToSend),
            });

            const responseStr = await response.json();
            let highScoreNum = responseStr.highScore;
            // console.log(response.status + ":" + responseObject.msg);
            resolve(highScoreNum);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    });
}

async function httpAttemptPut(username) {
    return new Promise(async (resolve, reject) => {
        let objectToSend = ({user: username});

        try {
            const response = await fetch('/api/attempt', {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(objectToSend),
            });

            const responseStr = await response.json();
            let attemptNumStr = responseStr.attempts;
            resolve(attemptNumStr.toString());
        } catch (error) {
            console.log(error);
            reject();
        }
    });
}
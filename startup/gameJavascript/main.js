const shipIDStr = "playerShip";
let curRotation = 0;
const rotateAmount = 0.25;
let rotateDirection = 1;

let shipCurHeight = 0;
const horizontalVelocity = 1;

function initializeGame() {
    createShip();
    createWall(1, 0);
    // createWall(2, 60);
    // createWall(3, 120);
    // createWall(4, 180);

}

initializeGame();

//Main Loop - Runs 30 times per second
function main() {
    curRotation += rotateAmount * rotateDirection;
    if(curRotation >= 60) {
        rotateDirection = -1;
    }
    if(curRotation <= -60) {
        rotateDirection = 1;
    }
    document.getElementById(shipIDStr).style.transform = `rotate(${curRotation}deg)`;

    let direction = 1;
    if(curRotation >= 180) {
        direction = -1;
    } else {
        direction = 1;
    }
    let verticalVelocity = horizontalVelocity * Math.tan(toRadians(curRotation)) * direction;
    console.log("degrees: " + curRotation + "   vertical Velocity: " + verticalVelocity);

    // shipCurHeight += verticalVelocity;
    document.getElementById(shipIDStr).style.top = `${shipCurHeight}px`;
    if(shipCurHeight >= 420) {
        shipCurHeight = 0;
    }

}
// setInterval(main, 33.333);


// Can put functions below

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

//Ship Movement

function rotateShip() {

}

function moveShip() {

}

function detectEdges() {

}



//Walls
function moveWalls() {

}

//add array of wall object

function createShip() {
    let shipElement = document.createElement('img');
    shipElement.src = `images/Ship014.webp`;
    shipElement.setAttribute("id", "playerShip");
    document.getElementById("playBox").appendChild(shipElement);
}

function createWall(blockNum, yPos) {
    let blockElement = document.createElement('img');
    blockElement.src = `images/RegularBlock01.webp`;
    blockElement.setAttribute("class", "block")
    blockElement.setAttribute("id", `block${blockNum}`);
    document.getElementById("playBox").appendChild(blockElement);


    //todo add Block to blockArray
    document.getElementById(`block${blockNum}`).style.top = `${yPos}px`;
}


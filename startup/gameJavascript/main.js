// const shipIDStr = "playerShip";
// let curRotation = 0;
// const rotateAmount = 0.25;
// let rotateDirection = 1;
//
// let shipCurHeight = 0;
// const horizontalVelocity = 1;

let blockArray = [];

function initializeGame() {
    createShip();
    createWall(1, 400, 0);
    createWall(2, 400, 60);
    createWall(3, 400, 120);
    createWall(4, 500, 180);

    blockArray.forEach(block => {
        console.log("ID:" + block.blockID + " xPosition:" + block.xPos + " yPosition:" + block.yPos + " ");
    });

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

function createWall(blockNum, xPos, yPos) {
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


//
let shipCurHeight = 0;


const moveVelocity = 10;
let curRotation = 0;
let rotateVelocity = 0;
const rotateAcceleration = 0.8;
const maximumAngle = 60; //degrees
const maximumVelocity = 5;

const shipIDStr = "playerShip";

//Geometry Dash Ship Movement Notes
/*
    * There is a maximum angle - 50 degrees?
    * High angular acceleration
    * low maximum velocity
 */

let blockArray = [];
let spacePressed = false;

function initializeGame() {
    createShip();
    createWall(1, 500, 0);
    createWall(2, 500, 60);
    createWall(3, 500, 120);
    createWall(4, 500, 180);

    blockArray.forEach(block => {
        // console.log("ID:" + block.blockID + " xPosition:" + block.xPos + " yPosition:" + block.yPos + " ");
    });

}

initializeGame();

//Main Loop - Runs 30 times per second
function main() {

    moveWalls(-moveVelocity);
    rotateShip();
    // moveShip();
    // removeBlock(blockArray[0].blockID);

    // let verticalVelocity = moveVelocity * Math.tan(toRadians(curRotation)) * direction;
    // console.log("degrees: " + curRotation + "   vertical Velocity: " + verticalVelocity);
    //
    // // shipCurHeight += verticalVelocity;
    // document.getElementById(shipIDStr).style.top = `${shipCurHeight}px`;
    // if(shipCurHeight >= 420) {
    //     shipCurHeight = 0;
    // }

}
setInterval(main, 33.333);
//todo make up for how long it takes for Main to process, and subtract that from the time of SetInterval()


// Can put functions below

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

//Ship Movement

function rotateShip() {
    //define acceleration direction
    let intReverser;
    if(spacePressed) {
        intReverser = -1;
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
    // console.log("degrees: " + curRotation + "   vertical Velocity: " + verticalVelocity);

    shipCurHeight += verticalVelocity;
    document.getElementById(shipIDStr).style.top = `${shipCurHeight}px`;
    // if(shipCurHeight >= 420) {
    //     shipCurHeight = 0;
    // }
}

function detectEdges() {

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

//add array of wall object

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
    document.getElementById(rmvBlockID).remove();
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
})
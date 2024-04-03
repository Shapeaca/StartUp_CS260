//Ship Image Dimensions;
const shipCenterX = 105; //px
let shipCurY = 210; //px - the top edge - + 30 for center;

const moveVelocity = 10;
let curRotation = 0;
let rotateVelocity = 0;
const rotateAcceleration = 0.7;
const rotateAccelerationSpacePressedMultiplier = 1.8;
const maximumAngle = 50; //degrees
const maximumVelocity = 5;
//fixme maximum velocity is a bandaid over what should reset your velocity to a reasonable amount every time you change dirrections?

const shipIDStr = "playerShip";

const boxHeight = 60; //px

//edge detection points:
const shipPoints = [
    {radius: 55, xOffset: 55, yOffset:0}
];

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

    detectCollision()

}

initializeGame();

//Main Loop - Runs 30 times per second
function main() {

    moveWalls(-moveVelocity);
    rotateShip();
    //todo move moveShip() to this function

    blockArray.forEach(block => {
       if(block.xPos <= -70) {
           block.xPos = 650;
       }
    });

    let collsionPoint = calculateNwPoint(shipPoints[0].radius, shipPoints[0].xOffset, shipPoints[0].yOffset, toRadians(curRotation));
    let isCollision = detectCollision(collsionPoint.xPoint, collsionPoint.yPoint);
    if(isCollision) {
        console.log("COLLISION at - x:" + collsionPoint.xPoint + " y:" + collsionPoint.yPoint);
    }

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
    //todo should I change sin to tan??? No Probably Not
    let verticalVelocity = moveVelocity * Math.sin(toRadians(curRotation));
    // console.log("degrees: " + curRotation + "   vertical Velocity: " + verticalVelocity);

    shipCurY += verticalVelocity;
    document.getElementById(shipIDStr).style.top = `${shipCurY}px`;
    // if(shipCurHeight >= 420) {
    //     shipCurHeight = 0;
    // }
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
    let boxSides = {left:posX, right: posX + boxHeight, top: posY, bottom: posY + boxHeight};
    return boxSides;
}

function calculateNwPoint(radius, xOffset, yOffset, angleRadians) { //todo text this function
    //fixme MAKE SURE y upward is negative for ALL variables
    originalAngleRadians = Math.atan(yOffset / xOffset);
    nwAngle = originalAngleRadians + angleRadians;

    nwX = radius * Math.cos(nwAngle) + shipCenterX;
    nwY = radius * Math.sin(nwAngle) + shipCurY + 30;

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
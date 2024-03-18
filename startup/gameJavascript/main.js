const shipIDStr = "playerShip";
let curRotation = 0;
const rotateAmount = 0.25;

const horizontalVelocity = 1;

//Main Loop - Runs 30 times per second
function main() {
    curRotation += rotateAmount;
    document.getElementById(shipIDStr).style.transform = `rotate(${curRotation}deg)`;

    let verticalVelocity = horizontalVelocity * Math.tan(toRadians(curRotation))
    console.log("radians: " + toRadians(curRotation) + "   vertical Velocity: " + verticalVelocity);

}
setInterval(main, 33.333);


// Can put functions below

function toRadians (angle) {
    return angle * (Math.PI / 180);
}
var deg = 0;
// document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`

function changeBackgroundColor() {
    deg += 1;
    if(deg >= 360) {
        deg = deg - 360;
    }
    document.querySelector("nav").style.background = `hsl(${deg}deg 100% 23%)`
    document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 40%))`
    document.querySelector("footer").style.background = `hsl(${deg}deg 100% 23%)`
    //let tempDeg = deg + 120;
    //document.querySelector("body").style.color = `hsl(${tempDeg}deg 100% 50%)` // I don't like this
}

setInterval(changeBackgroundColor, 300)

// document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`
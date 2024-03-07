var deg = 0;
// document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`

function changeBackgroundColor() {
    deg += 1;
    if(deg >= 360) {
        deg = deg - 360;
    }
    document.querySelector("nav").style.background = `hsl(${deg}deg 100% 28%)`
    document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`
    document.querySelector("footer").style.background = `hsl(${deg}deg 100% 28%)`
}

setInterval(changeBackgroundColor, 300)

// document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`
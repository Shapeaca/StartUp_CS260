var deg = 300;

setInterval(function() {
    deg =+ 60;
    if(deg >= 360) {
        deg = deg - 360;
    }
    document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`
}, 1000)

// document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 50%))`
let deg = Number(sessionStorage.getItem("backgroundColor"));
if(deg == null) {
    deg = 0;
    sessionStorage.setItem("backgroundColor", `${deg}`);
}
document.querySelector("nav").style.background = `hsl(${deg}deg 100% 23%)`;
document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 40%))`;
document.querySelector("footer").style.background = `hsl(${deg}deg 100% 23%)`;

function changeBackgroundColor() {
    let deg = Number(sessionStorage.getItem("backgroundColor"));
    deg += 1;
    if(deg >= 360) {
        deg = deg - 360;
    }
    document.querySelector("nav").style.background = `hsl(${deg}deg 100% 23%)`;
    document.querySelector("main").style.backgroundImage = `linear-gradient(hsl(${deg}deg 100% 18%), hsl(${deg}deg 100% 40%))`;
    document.querySelector("footer").style.background = `hsl(${deg}deg 100% 23%)`;

    sessionStorage.setItem("backgroundColor", `${deg}`);
}

setInterval(changeBackgroundColor, 300);
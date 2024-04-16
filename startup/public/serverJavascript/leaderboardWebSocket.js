// import {checkAuthtoken} from "./authtokenFetch.js";
// const authtokenFetch = require(`./authtokenFetch`);

const tableID = "elementTable";
const numOfRowsOfTable = 13; //question should I change this number based on how many entries can fit on the page?

// let tableElement = null;
let testVar = {username:"codeUser", time:"12:34", attempts:1234};
let tableElement;

checkLoginDetails();//What gets called to start everything

function checkLoginDetails() {
    let testBool = false;
    // authtokenFetch.checkAuthtoken();
    // checkAuthtoken();
    if(testBool === true) {
        tableElement = initializeTable();
        webSocketUpdate();
        setInterval(webSocketUpdate, 5000);
    } else {
        let loginBlockerElement = document.createElement("p");
        loginBlockerElement.setAttribute("id", "playLoginRestrictionText");
        loginBlockerElement.innerHTML = "Please login in order to view leaderboard!";
        document.getElementById("tableDiv").appendChild(loginBlockerElement);
    }
}

function initializeTable() {
    let tableElement = document.createElement("table");
    tableElement.setAttribute("id", tableID);

    let usernameElement = document.createElement("th");
    usernameElement.innerHTML = "Username";
    tableElement.appendChild(usernameElement);

    let timeElement = document.createElement("th");
    timeElement.innerHTML = "Best Time";
    tableElement.appendChild(timeElement);

    let attemptsElement = document.createElement("th");
    attemptsElement.innerHTML = "Num of Attempts";
    tableElement.appendChild(attemptsElement);

    document.getElementById("tableDiv").appendChild(tableElement);
    return tableElement;
}

function webSocketUpdate() {
    deleteLeaderboard();
    populateTable(testVar);
    document.getElementById("websocketUpdateTime").innerHTML = getCurrentDateTime();
}

function populateTable(leaderBoardData) {
    let i = 0;
    while(i < numOfRowsOfTable) {
        addRow(tableElement, leaderBoardData.username, leaderBoardData.time, leaderBoardData.attempts); //FIXME add leaderBoardData[i] WHEN I add a database
        i++;
        // if(i >= leaderBoardData.length) {
        //     break;
        // }
    }
}

function addRow(tableElement, username, time, attempts) {
    let rowElement = document.createElement("tr");
    rowElement.setAttribute("class", "leaderboardData");

    let usernameElement = document.createElement("td");
    usernameElement.innerHTML = `${username}`;
    rowElement.appendChild(usernameElement);

    let timeElement = document.createElement("td");
    timeElement.innerHTML = `${time} minutes`;
    rowElement.appendChild(timeElement);

    let attemptsElement = document.createElement("td");
    attemptsElement.innerHTML = `${attempts}`;
    rowElement.appendChild(attemptsElement);

    tableElement.appendChild(rowElement);
}

function getCurrentDateTime() {
    let curDate = new Date();
    let dateTimeStr = (curDate.getMonth() + 1) + "/"
                    + curDate.getDate() + "/"
                    + curDate.getFullYear() + " "
                    + curDate.getHours() + ":"
                    + curDate.getMinutes() + ":"
                    + curDate.getSeconds();
    console.log(dateTimeStr);
    return dateTimeStr;
}

function deleteLeaderboard() {
    let removeArray = document.getElementsByClassName("leaderboardData");
    while(removeArray.length > 0) {
        let trElement = removeArray[0];
        trElement.parentNode.removeChild(trElement);
    }

}
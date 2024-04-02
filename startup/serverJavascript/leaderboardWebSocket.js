//todo list
//  Make functions that can create a table based on data
//  Update the Websocket time at the bottom of the page based on WHEN the data loads

const tableID = "elementTable";

let tableElement = document.getElementById(tableID);
let testVar = {username:"codeUser", time:"12:34", attempts:1234};
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);
addRow(tableElement, testVar.username, testVar.time, testVar.attempts);

document.getElementById("websocketUpdateTime").innerHTML = getCurrentDateTime();


function addRow(tableElement, username, time, attempts) {
    let rowElement = document.createElement("tr");

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
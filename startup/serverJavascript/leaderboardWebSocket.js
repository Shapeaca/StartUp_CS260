//todo list
//  Make functions that can create a table based on data
//  Update the Websocket time at the bottom of the page based on WHEN the data loads

const tableID = "elementTable";
const numOfRowsOfTable = 13; //question should I change this number based on how many entries can fit on the page?

let tableElement = document.getElementById(tableID);
let testVar = {username:"codeUser", time:"12:34", attempts:1234};

//Updating Table
populateTable(testVar);
document.getElementById("websocketUpdateTime").innerHTML = getCurrentDateTime();


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
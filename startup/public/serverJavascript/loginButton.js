document.getElementById("loginButton").addEventListener("click", login);

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log("Username: " + username);
    console.log("Password: " + password);

    if((username.length > 0) && (password.length > 0)) {

        Promise.all( [httpLoginPost(username, password)] ).then((response) => {
            console.log(response + " - Promise Resolved");
        });
        //Now Update Account Display on webpage
        sessionStorage.setItem("username", `${username}`)
        document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
    }
}

async function httpLoginPost(username, password) {
    return new Promise(async (resolve, reject) => {
        let objectToSend = ({username: username, password: password});

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(objectToSend),
            });

            const responseStr = await response.json();
            console.log(responseStr);
            // let attemptNumStr = responseStr;
            // resolve(attemptNumStr.toString());
            resolve();
        } catch {
            console.log("HTTP Post /api/login Failed");
            reject("HTTP Post /api/login Failed");
        }
    });
}



// testHttpPost();


async function testHttpPost() {

        // const userName = this.getPlayerName();
        // const date = new Date().toLocaleDateString();
        // const newScore = {name: userName, score: score, date: date};
    const testObject = {firstStr: "Caleb Crandall", firstInt: 22, secondStr: "Aubrey Owens", secondInt: 21};

        try {
            const response = await fetch('/api/test', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(testObject),
            });

            // Store what the service gave us as the high scores
            const loveStr = await response.json();
            console.log(loveStr);
            // localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
            // If there was an error then just track scores locally
            console.log("HTTP Post Failed");
        }
}

async function httpScorePost(username, scoreMilliseconds) {

    // const userName = this.getPlayerName();
    // const date = new Date().toLocaleDateString();
    // const newScore = {name: userName, score: score, date: date};
    let objectToSend = ({username: username, score: scoreMilliseconds});

    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(objectToSend),
        });

        // Store what the service gave us as the high scores
        const responseStr = await response.json();
        console.log(responseStr);
        // localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
        // If there was an error then just track scores locally
        console.log("HTTP Post /api/score Failed");
    }
}

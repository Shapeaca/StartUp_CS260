const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


let numAttemptsMemory = 0;
let highestScore = 0; //a number in milliseconds

/*let scoreArr = []; //{user: "Shapeaca", score: "53,065} - Example storage object
const max = data.reduce(function(prev, current) { //example for finding highest value in an array
    return (prev && prev.y > current.y) ? prev : current
}) //returns object*/

//score endpoint
apiRouter.post('/score', (req, res) => {
    let sendObject = addToScoresArray(req.body);
    res.send(sendObject);
    // res.send({msg: "Server api/score response"});
});

apiRouter.put('/attempt', (req, res) => {
    // numAttempts = updateAndGetNumAttempts(req.body);
    nwObject = updateAndGetNumAttempts(req.body);
    console.log(nwObject);
    res.send(JSON.stringify(nwObject));
    // res.send({msg: `Number of Attempts: ${numAttempts}`});
});



// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function addToScoresArray(scoreObject) {
    let nwObject = {user: scoreObject.user, score: scoreObject.score}
    if(nwObject.score > highestScore) {
        highestScore = nwObject.score;
    }

    return ({highScore: highestScore});

    // scoreArr.push(nwObject);
}

function updateAndGetNumAttempts(userAttemptObject) {
    //  fixme - IN the future, add a attempt counter to each user, and this function adds to that user
    // let nwObject = {user: attemptObject.user};
    // console.log(`Put/Attempt User Username: ${attemptObject.user}`);
    numAttemptsMemory++;
    let nwObject = ({attempts: numAttemptsMemory});
    console.log(nwObject);
    return nwObject;
}

//todo
// CReate endpoints and local storage for score, num of attempts, and eventually login, signup
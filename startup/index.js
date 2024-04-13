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


apiRouter.post('/test', (req, res) => {
    // console.log("Made it to server");
    // let testStr = myParseFunction(req.body);
    let myStr = myParseFunction(req.body);
    res.send({msg: myStr}); //fixme this has to be a json when you send it over http!!!
});

let highestScore = 0; //a number in milliseconds
let scoreArr = []; //{user: "Shapeaca", score: "53,065} - Example storage object

//score endpoint
apiRouter.post('/score', (req, res) => {
    let scoreObject = myParseFunction(req.body);
    addToScoresArray(scoreObject);

    res.send({msg: "Server api/score response"});
});



// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



//test function
function myParseFunction(loveObject) {
    let nwObject = loveObject;

    return nwObject.firstStr + " " + nwObject.firstInt + " Loves " + nwObject.secondStr + " " + nwObject.secondInt;
}

function addToScoresArray(scoreObject) {
    let nwObject = {user: scoreObject.user, score: scoreObject.score}
    console.log(scoreArr.length);
    scoreArr.push(nwObject);
    console.log(nwObject);
}


//todo
// CReate endpoints and local storage for score, num of attempts, and eventually login, signup
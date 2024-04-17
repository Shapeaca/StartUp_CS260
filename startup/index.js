const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const app = express();
// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const authCookieName = "token";


// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);



//connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const collectionUser = db.collection('user');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Database connected");
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

//Memory on the server
let numAttemptsMemory = 0;
let highestScore = 0; //a number in milliseconds



/*let scoreArr = []; //{user: "Shapeaca", score: "53,065} - Example storage object //fixme code for the future
const max = data.reduce(function(prev, current) { //example for finding highest value in an array
    return (prev && prev.y > current.y) ? prev : current
}) //returns object*/


apiRouter.post(`/login`, (req, res) => { //fixme login works except it doesn't send right error messages
    const reqObject = req.body;
    // console.log(reqObject);

    databaseCheckCredentialsUser(reqObject.username, reqObject.password).then(response => { //response = new authtoken
        databaseUpdateUserAuthToken(reqObject.username, reqObject.password).then(response => { //response = new authtoken
            // console.log(response.authtoken);
            // console.log(response);
            setAuthCookie(res, response.authtoken);
            console.log(`${reqObject.username} is authenticated`);
            res.status(200).send(JSON.stringify({msg: "Login success", username: reqObject.username}));
        }).catch(error => {
            res.status(500).send(JSON.stringify({msg: error}));
        })

    }).catch(error => {
        res.status(401).send(JSON.stringify({msg: error}));
    })

});

apiRouter.post(`/signup`, (req, res) => {
    const reqObject = req.body;
    // console.log(reqObject);
    databaseInsertUser(reqObject.username, reqObject.password, reqObject.email).then(response => { //response = new authtoken
        // console.log("Signup works: " + response.authtoken);
        // console.log(response);
        setAuthCookie(res, response.authtoken);
        console.log(`${reqObject.username} is authenticated`);
        res.status(200).send(JSON.stringify({msg: "Signup success", username: reqObject.username}));
    }).catch(error => {
        res.status(400).send(JSON.stringify({msg: error}));
    })
});

//Secure API router
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

//score endpoint
apiRouter.post('/score', (req, res) => {
    let sendObject = addToScoresArray(req.body);
    res.send(sendObject);
});

//attempt endpoint
apiRouter.put('/attempt', (req, res) => {
    let nwObject = updateAndGetNumAttempts(req.body);
    res.send(JSON.stringify(nwObject));
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



//misc functions
function addToScoresArray(scoreObject) {
    // console.log(scoreObject);
    let nwObject = {user: scoreObject.user, score: scoreObject.score}
    if(nwObject.score > highestScore) {
        highestScore = nwObject.score;
    }
    return ({highScore: highestScore});
}

function updateAndGetNumAttempts(userAttemptObject) {
    //  fixme - IN the future, add a attempt counter to each user, and this function adds to that user
    numAttemptsMemory++;
    let nwObject = ({attempts: numAttemptsMemory});
    return nwObject;
}

//Cookie
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}



//database functions
async function databaseInsertUser(username, normalPassword, email, curAuthToken) {
    return new Promise(async (resolve, reject) => {
        try {
            const lowerUsername = username.toLowerCase();
            const encryptedPassword = await bcrypt.hash(normalPassword, 10);
            const nwAuthtoken = uuid.v4();

            await collectionUser.createIndex({ username: 1 }, { unique: true });
            await collectionUser.insertOne( {username: lowerUsername, password: encryptedPassword, email: email, authtoken: nwAuthtoken} );

            resolve({authtoken: nwAuthtoken});
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function databaseCheckCredentialsUser (username, normalPassword) { // fixme does not validate successfully
    return new Promise(async (resolve, reject) => {
        try {
            const lowerUsername = username.toLowerCase();

            const user = await collectionUser.findOne({username: lowerUsername});
            // console.log(user);
            // console.log(await bcrypt.hash(normalPassword, 10));
            if((user != null) && await bcrypt.compare(normalPassword, user.password)) {
                //userAuthenticated
                resolve({msg: "Success", username: lowerUsername});
            } else {
                //invalid password
                console.log("Invalid Password")
                reject({msg: "Unauthorized"});
            }
        } catch (error) {
            console.log(error);
            reject({msg: error});
        }
    });
}

async function databaseUpdateUserAuthToken(username) {
    return new Promise(async (resolve, reject) => {
        try {
            const nwAuthtoken = uuid.v4();
            const query = {username: `${username}`};
            const set = {$set: {authtoken: nwAuthtoken}};
            await collectionUser.updateOne(query, set);
            resolve({authtoken: nwAuthtoken});
        } catch (error){
            console.log(error);
            reject(error);
        }
    });
}

//Database Access
function getUserByToken(token) {
    return collectionUser.findOne({ authtoken: token });
}
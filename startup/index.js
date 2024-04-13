const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 63342;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.post('/test', (req, res) => {
    console.log("Made it to server");
    // let testStr = myParseFunction(req.body);
    res.send("Server Responded");
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
    let nwObject = loveObject.json();

    return nwObject.firstStr + " " + nwObject.firstInt + " Loves " + nwObject.secondStr + " " + nwObject.secondInt;
}


//todo get my server running on node, and then call it correctly, to debug!
//  Ask TAs about getting my server endpoints working - Why the 500 error? (It was a 500 error earlier)



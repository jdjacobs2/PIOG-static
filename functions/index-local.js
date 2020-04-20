// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({
  origin: true
});
const multer = require("multer");
const path = require("path");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.getMessage = functions.https.onRequest((req, resp) => {
//   resp.set("Access-Control-Allow-Origin", "*");
//   console.log("Success");
//   resp.send("From getMessage");
// });

const app = express();
app.use(cors);
var upload = multer();

app.use(express.static(path.join(__dirname, '../public')));
// let allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   next();
// }
// app.use(allowCrossDomain);
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
// app.use(express.urlencoded());
// app.use(multer);

// From https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets 

app.get("/test", (req, res) => {
  console.log('in app.get');
  // console.log(req.query);
  console.log(path.join(__dirname, '/get-send.html'));
  res.send('this is the send function');
  // res.sendFile(path.join(__dirname,'/get-send.html'));
});

app.post("/getForm", upload.none(), (req, res) => {
  console.log("In getForm 3");
  console.log(req.body.name);
  res.send(req.body);
});

// exports.getForm = functions.https.onRequest(app);

app.listen(5000, () => console.log(`Node server listening on port ${5000}!`));

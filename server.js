



// Core Express & logging stuff
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const path = require("path");
//cors
const cors = require('cors')
const helmet = require('helmet')

// Logging
app.use(logger('dev'))



app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  //    next();


  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//wearing a helmet 

app.use(helmet());
// Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Routes & controllers
app.get("/", (req, res) => res.json({ msg: " Welcome to Dragon of midgards  Game Apis" }));
app.get("/api", (req, res, next) => {
  res.send({ Origin: req.headers.origin });
});

// app.use("/admin", require("./src/routes/admin"));

// Catch all route, generate an error & forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Wrong Api hit , checked the doucmentation and hit again')
  err.status = 404
  next(err)
})



// Get values from env vars or defaults where not provided
let port = 5001

//let port =  2003




// Start the server
app.listen(process.env.PORT || port, async () => {
  console.log("DB connected");
});

module.exports = app



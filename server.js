



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


//wearing a helmet 

app.use(helmet());
// Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Routes & controllers
app.get("/", (req, res) => res.json({ msg: " Welcome to Dragon of midgards  Game Apis" }));
app.get("/api", (req, res, next) => {
  res.send({ Origin: req.get("origin") });
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



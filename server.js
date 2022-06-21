// Core Express & logging stuff
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const path = require("path");
//cors
const cors = require("cors");
const helmet = require("helmet");

// Logging
app.use(logger("dev"));

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
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//wearing a helmet

app.use(helmet());
// Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes & controllers
app.get("/", (req, res) =>
  res.json({ msg: " Welcome Dragon of midgards  Game Apis" })
);
app.get("/aura/:address", (req, res, next) => {
  const address = req.params.address;
  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }
  const data = [
    "0x2D0a7B531eA68a07e84906dc87F2f92DF725d3De",
    "0x7B6FBF1F73fa7D33b9132d33a5a5AC125a823383",
    "0x131c5AdCd79bbcA126EC811A139246Ce0cEBFA6F",
    "0xd4dEDa9248450B4d3660Bc6e7969464d1F90DD69"
  ];
  if (!data.includes(address)) {
    res.send({
      address: "Ivalid Address ",
      aura: 0,
    });
  }
  if (address == data[0]) {
    res.json({
      RAW: {
        ETH: {
          USD: {
            TYPE: "5",
            Address: address,
            AURA: toFixed(100000000000000000000),
          },
        },
      },
    });
  }
  if (address == data[1]) {
    res.json({
      RAW: {
        ETH: {
          USD: {
            TYPE: "5",
            Address: address,
            AURA: toFixed(10000000000000000000000),
          },
        },
      },
    });
  }
  if (address == data[2]) {
    res.json({
      RAW: {
        ETH: {
          USD: {
            TYPE: "5",
            Address: address,
            AURA: toFixed(100000000000000000000000000),
          },
        },
      },
    });
    if (address == data[3]) {
    res.json({
      RAW: {
        ETH: {
          USD: {
            TYPE: "5",
            Address: address,
            AURA: toFixed(100000000),
          },
        },
      },
    });
  }
});

// app.use("/admin", require("./src/routes/admin"));

// Catch all route, generate an error & forward to error handler
app.use(function (req, res, next) {
  let err = new Error(
    "Wrong Api hit , checked the doucmentation and hit again"
  );
  err.status = 404;
  next(err);
});

// Get values from env vars or defaults where not provided
let port = 5001;

//let port =  2003

// Start the server
app.listen(process.env.PORT || port, async () => {
  console.log("DB connected");
});

module.exports = app;

// app.get("/aura/:address", (req, res, next) => {

//   const address=req.params.address;

//   const data=["0x2D0a7B531eA68a07e84906dc87F2f92DF725d3De","0x7B6FBF1F73fa7D33b9132d33a5a5AC125a823383","0x131c5AdCd79bbcA126EC811A139246Ce0cEBFA6F"];
//   if(!data.includes(address))
//   {
//      res.send({
//     address:"Ivalid Address ",
//     aura:0,
//    });
//   }
//   const randNum1 =  Math.floor(Math.random() * 3) + 1;
//   let number =  parseInt((Math.floor(Math.random() * 100000) + 1))
//   let g= number *(Math.pow(10,18));

//   // function toFixed(x) {
//   //   if (Math.abs(x) < 1.0) {
//   //     var e = parseInt(x.toString().split('e-')[1]);
//   //     if (e) {
//   //         x *= Math.pow(10,e-1);
//   //         x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
//   //     }
//   //   } else {
//   //     var e = parseInt(x.toString().split('+')[1]);
//   //     if (e > 20) {
//   //         e -= 20;
//   //         x /= Math.pow(10,e);
//   //         x += (new Array(e+1)).join('0');
//   //     }
//   //   }
//   //   return x;
//   // }

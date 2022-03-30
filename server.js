const express = require("express");
const app = express();

app.get("/api", (req, res, next) => {
  res.send({ Origin: req.get("origin") });
});
app.listen("2200", async (res, req) => {
  console.log("Server Start");
  // console.log(`http://localhost:2200`);
});

'use strict';
const serverless = require('serverless-http');
const express = require("express");
const multer = require("multer");
const cors = require('cors');
const bodyParser = require('body-parser');
const plainAddPlaceholder = require("node-signpdf/dist/helpers/plainAddPlaceholder")
  .default;

const app = express();
app.use(cors())
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const router = express.Router();
app.post("/plainAddPlaceholder", upload.single("pdf"), (req, res) => {
  const pdfBuffer = plainAddPlaceholder({
    pdfBuffer: req.file.buffer,
    reason: "I have reviewed it.",
    signatureLength: 1612
  });
  res.type("pdf");
  res.send(pdfBuffer);
});
app.get("*", (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hello from Express.js!</h1>');
  res.send("Nothing here!");
});
app.post("*", (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hello from Express.js!</h1>');
  res.send("Nothing here!");
});
// app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

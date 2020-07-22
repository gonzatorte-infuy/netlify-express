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

const router = express.Router();
router.post("/plainAddPlaceholder", upload.single("pdf"), (req, res) => {
  const signatureLength = parseInt(req.query.signatureLength || 12915, 10);
  const pdfBuffer = plainAddPlaceholder({
    pdfBuffer: req.file.buffer,
    reason: "I have reviewed it.",
    signatureLength,
  });
  res.type("pdf");
  res.send(pdfBuffer);
});
router.get("*", (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hello from Express.js!</h1>');
  res.send("Nothing here!");
});
router.post("*", (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hello from Express.js!</h1>');
  res.send("Nothing here!");
});
app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);

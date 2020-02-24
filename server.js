const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const app = express();

const names = require('./models/Name');

app.use(cors());
app.use(bodyParser.json());

app.get('/names', async (req, res) => {
  await names.find().then((names) => {
    res.json(names);
  });
});

app.post('/names', async (req, res) => {
  console.log('//server.js', req.body);
  await names.create(req.body).then((name) => {
    res.json(name);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
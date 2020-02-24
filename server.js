const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'random-name-generator' }).
  then(() => console.log('Connected')).
  catch(err => console.log('Caught', err.stack));
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const app = express();

const names = require('./models/Name');

app.use(cors());
app.use(bodyParser.json());

app.get('/names', async (req, res) => {
  console.log('/names is being fetched');
  await names.find().then((names) => {
    console.log(`/names => ${names}`);
    res.json(names);
  }).catch((e) =>{
    console.log(`/names => error: ${e}`);
    res.status(500);
    res.json(error);
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
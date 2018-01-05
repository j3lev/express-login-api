const express = require('express'),
      bodyParser = require('body-parser');
      app = express(),
      usersTable = require('./users.json'),
      allowCrossDomain = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      };

app.use(allowCrossDomain);
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  // Obviously the password would be hashed inside the DB and the hashes would be compared. This is for the sake of brevity
  const user = usersTable.find(u => u.username === req.body.username && u.password === req.body.password);
  if (user) {
    res.send({ 
      status: 1, 
      message: 'Login success', 
      username: user.username,
      name: user.name,
      userid: user.id
    });
  } else {
    res.status(401).send({ status: -1, message: 'Could not authenticate user' });
  }
});

app.post('/signup', (req, res) => {
  const success = true; // Stubbed out for prototyping's sake
  if (success) {
    res.send({ status: 1, message: `Thank you for signing up ${ req.username }`, username: req.body.username });
  } else {
    res.status(400).send({ status: -1, message: 'Error signing up' });
  }
});

module.exports = app;

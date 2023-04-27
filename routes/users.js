var express = require('express');
const User = require('../models/users');
var router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

/* GET users listing. */
router.post('/signup', function(req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const token = uid2(32);
  const newUser = new User({
    firstname: req.body.firstname, 
    username: req.body.username,
    canDelete: true,
    token: token, 
    password: hash,
  });
  newUser.save().then(newUser => {
    res.json({result: true, user: newUser});
  });
});

module.exports = router;

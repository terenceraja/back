var express = require('express');
const User = require('../models/users');
var router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');
const { checkBody } = require('../modules/checkBody');


/* POST route pour inscripton */
router.post('/signup', function(req, res) {
  if (!checkBody(req.body, ['username', 'password', 'firstname'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
  } else {
  User.findOne({username: req.body.username})
  .then (data => {
    if (data) {
      res.json({result: false, message: 'User already exist'})
    } else {
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
  })
}}
)}}
);

/* POST route pour co */
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
  } else {
  User.findOne({ username: req.body.username }).then(data => {
    console.log(data)
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  })
}}
);


module.exports = router;

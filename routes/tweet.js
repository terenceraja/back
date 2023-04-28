var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweet')
const { checkBody } = require('../modules/checkBody');


/* POST pour poster un tweet*/
router.post('/', function(req, res) {
    if (!checkBody(req.body, ['tweet'])) {
        res.json({ result: false, error: 'Missing fields' });
    } else {
    newTweet = new Tweet({
        tweet: req.body.tweet,
        token: req.body.token,
    });
    newTweet.save().then(newTweet =>{
        res.json({result: true, tweet: newTweet});
    })
}}
);


module.exports = router;

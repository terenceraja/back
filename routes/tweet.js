var express = require("express");
const Tweet = require("../models/tweet");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");

/* POST pour poster un tweet*/
router.post("/", function (req, res) {
  if (!checkBody(req.body, ["tweet"])) {
    res.json({ result: false, error: "Missing fields" });
  } else {
    newTweet = new Tweet({
      username: req.body.username,
      firstname: req.body.firstname,
      tweet: req.body.tweet,
      token: req.body.token,
    });
    newTweet.save().then((newTweet) => {
      res.json({ result: true, tweet: newTweet });
    });
  }
});

/* POST pour poster un tweet*/
router.get("/allTweets", function (req, res) {
  Tweet.find().then(data => {
    res.json({ allTweet: data });
    });
  });

  /* DELETE pour poster un tweet*/
router.delete('/delete', (req, res) => {
  Tweet.deleteOne({tweet: req.body.tweet}, {token: req.body.token})
  .then(data => {
    if (data.deletedCount > 0){
      Tweet.findOne({tweet: req.body.tweet}, {token: req.body.token})
      .then(data => {
        res.json({result : true , message: 'You have sent this tweet in space !' });
      })

    } else {
    res.json({ result : false, message: 'No tweets deleted' });
  }})
});

module.exports = router;

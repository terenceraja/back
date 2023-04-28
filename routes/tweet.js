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
  Tweet.find().then((data) => {
    res.json({ allTweet: data });
  });
});

/* DELETE pour poster un tweet*/
router.delete("/delete", (req, res) => {
  Tweet.findById(req.body.id_tweet).then((data) => {
    console.log(data);
    if (data.token === req.body.token) {
      Tweet.deleteOne({ _id: req.body.id_tweet }).then((data) => {
        if (data.deletedCount > 0) {
          res.json({
            result: true,
            message: "You have sent this tweet in space !",
          });
        } else {
          res.json({ result: false, message: "No tweets deleted" });
        }
      });
    } else {
      // N'a pas le droit
    }
  });
});

module.exports = router;

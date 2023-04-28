const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    tweet: String,
    token: String,
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
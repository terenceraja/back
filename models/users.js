
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String, 
    username: String,
    canDelete: Boolean,
    token: String, 
    password: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;
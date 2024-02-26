const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Must have a title'],
    trim: true, 
    minlength: 1,
    maxlength: [255, 'Title is too long'],
  },
  message: {
    type: String,
    required: [true, 'You must have a message'],
    trim: true, 
    minlength: 1,
    maxlength: [2000, 'Message is too long'],
  },
  picture: {
    type: String,
    default: 'default.jpg',
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
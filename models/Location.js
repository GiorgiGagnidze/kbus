const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = Location = mongoose.model('location', LocationSchema);
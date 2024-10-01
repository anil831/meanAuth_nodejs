const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Screen', screenSchema);

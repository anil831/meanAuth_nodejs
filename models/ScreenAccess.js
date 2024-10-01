const mongoose = require('mongoose');

const roleAccessSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  screen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }]
});

module.exports = mongoose.model('ScreenAccess', roleAccessSchema);

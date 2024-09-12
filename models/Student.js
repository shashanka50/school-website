const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // ... schema definition ...
});

module.exports = mongoose.model('Student', StudentSchema);
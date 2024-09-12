const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userType'
  }
});

module.exports = mongoose.model('User', UserSchema);
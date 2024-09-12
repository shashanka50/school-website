const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  employeeId: { type: String, required: true, unique: true },
  subjects: [{ type: String }],
  qualifications: [{ type: String }],
  dateOfJoining: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model('Teacher', TeacherSchema);
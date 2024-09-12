const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  grade: { type: Number, required: true },
  section: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  bloodGroup: { type: String },
  parentName: { type: String, required: true },
  parentContact: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  medicalConditions: { type: String },
  admissionDate: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('Student', StudentSchema);
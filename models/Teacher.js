const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TeacherSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  subjects: [{ type: String }],
  qualifications: [{ 
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: Number, required: true }
  }],
  dateOfJoining: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true }
});

// Pre-save hook to hash the password
TeacherSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
TeacherSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('Teacher', TeacherSchema);
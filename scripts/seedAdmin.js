const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/school_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin123' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const admin = new Admin({
      username: 'admin123',
      password: 'adminpass123', // This will be hashed by the pre-save hook
      firstName: 'Admin',
      lastName: 'User',
      employeeId: 'ADMIN001',
      position: 'System Administrator',
      dateOfJoining: new Date(),
      contactNumber: '1234567890',
      email: 'admin@school.com',
      address: 'School Address'
    });

    await admin.save();

    console.log('Admin user created successfully');
    console.log('Admin ID:', admin._id);
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();
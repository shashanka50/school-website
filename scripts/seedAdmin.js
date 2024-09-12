const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/school_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAdmin() {
  try {
    const existingAdmin = await User.findOne({ username: 'admin123' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('adminpass123', 10);
    const adminUser = new User({
      username: 'admin123',
      password: hashedPassword,
      userType: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();
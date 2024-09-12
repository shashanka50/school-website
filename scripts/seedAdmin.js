const mongoose = require('mongoose');
const User = require('../models/User');
const Admin = require('../models/Admin');
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
    console.log('Admin user saved:', adminUser);

    const adminProfile = new Admin({
      user: adminUser._id,
      firstName: 'Admin',
      lastName: 'User',
      employeeId: 'ADMIN001',
      position: 'System Administrator',
      dateOfJoining: new Date(),
      contactNumber: '1234567890',
      email: 'admin@school.com',
      address: 'School Address'
    });

    await adminProfile.save();
    console.log('Admin profile saved:', adminProfile);

    adminUser.profile = adminProfile._id;
    await adminUser.save();

    console.log('Admin user updated with profile:', adminUser);
    console.log('Admin user created successfully');
    console.log('User ID:', adminUser._id);
    console.log('Admin Profile ID:', adminProfile._id);
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();
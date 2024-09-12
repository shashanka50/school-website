const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

// TODO: Implement authentication routes
router.post('/login', async (req, res) => {
  const { username, password, userType } = req.body;
  
  try {
    const user = await User.findOne({ username, userType }).populate('profile');
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or user type' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        userType: user.userType
      }
    };

    jwt.sign(
      payload,
      'your_jwt_secret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          message: 'Login successful', 
          token, 
          user: {
            id: user.id,
            username: user.username,
            userType: user.userType,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            ...(user.userType === 'student' && {
              grade: user.profile.grade,
              section: user.profile.section,
              rollNumber: user.profile.rollNumber,
            }),
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/register', auth, async (req, res) => {
  // Only allow admin users to register new users
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { username, password, userType } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      password,
      userType
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register/student', async (req, res) => {
  try {
    // Create User
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      userType: 'student'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save User
    await user.save();

    // Create Student
    const student = new Student({
      user: user._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      grade: req.body.grade,
      section: req.body.section,
      rollNumber: req.body.rollNumber,
      bloodGroup: req.body.bloodGroup,
      parentName: req.body.parentName,
      parentContact: req.body.parentContact,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact,
      medicalConditions: req.body.medicalConditions
    });

    // Save Student
    await student.save();

    // Update User with Student reference
    user.profile = student._id;
    await user.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register/teacher', async (req, res) => {
  try {
    // Create User
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      userType: 'teacher'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save User
    await user.save();

    // Create Teacher
    const teacher = new Teacher({
      user: user._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      employeeId: req.body.employeeId,
      subjects: req.body.subjects.split(','),
      qualifications: req.body.qualifications.split(','),
      dateOfJoining: req.body.dateOfJoining,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact
    });

    // Save Teacher
    await teacher.save();

    // Update User with Teacher reference
    user.profile = teacher._id;
    await user.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register/admin', async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      employeeId,
      position,
      dateOfJoining,
      contactNumber,
      email,
      address
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      password,
      userType: 'admin'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create new admin
    const admin = new Admin({
      user: user._id,
      firstName,
      lastName,
      employeeId,
      position,
      dateOfJoining,
      contactNumber,
      email,
      address
    });

    // Save admin
    await admin.save();

    // Update user with admin reference
    user.profile = admin._id;
    await user.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
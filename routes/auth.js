const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Add this line

// TODO: Implement authentication routes
router.post('/login', async (req, res) => {
  const { username, password, userType } = req.body;
  
  try {
    console.log('Login attempt:', { username, userType });
    
    let user;
    let Model;
    if (userType === 'student') {
      Model = Student;
    } else if (userType === 'teacher') {
      Model = Teacher;
    } else if (userType === 'admin') {
      Model = Admin;
    } else {
      console.log('Invalid user type:', userType);
      return res.status(400).json({ message: 'Invalid user type' });
    }

    console.log('Selected model:', Model.modelName);

    user = await Model.findOne({ username });

    if (!user) {
      console.log('User not found:', username, userType);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user._id);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', username, userType);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user._id,
        role: userType,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            role: userType
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/register/student', auth, async (req, res) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register/teacher', auth, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Teacher registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register/admin', auth, async (req, res) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

console.log('Teacher model:', Teacher);

module.exports = router;
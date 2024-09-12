const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// TODO: Implement student-related routes
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Student dashboard route' });
});

router.get('/details', auth, async (req, res) => {
  try {
    console.log('Fetching student details for user:', req.user.id);
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) {
      console.log('Student not found for user:', req.user.id);
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log('Student details found:', student);
    res.json(student);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const auth = require('../middleware/auth');

// TODO: Implement teacher-related routes
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Teacher dashboard route' });
});

router.get('/details', auth, async (req, res) => {
  try {
    console.log('Fetching teacher details for user:', req.user.id);
    const teacher = await Teacher.findById(req.user.id).select('-password');
    if (!teacher) {
      console.log('Teacher not found for user:', req.user.id);
      return res.status(404).json({ message: 'Teacher not found' });
    }
    console.log('Teacher details found:', teacher);
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
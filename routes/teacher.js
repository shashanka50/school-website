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
    const teacher = await Teacher.findById(req.user.id).select('-password');
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
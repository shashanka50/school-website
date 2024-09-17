const express = require('express');
const router = express.Router();
const GradeSection = require('../models/GradeSection');

// Add this new route
router.get('/grades-sections', async (req, res) => {
  try {
    const gradeSection = await GradeSection.findOne();
    if (!gradeSection) {
      return res.status(404).json({ message: 'Grades and sections not found' });
    }
    res.json(gradeSection);
  } catch (error) {
    console.error('Error fetching grades and sections:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// TODO: Implement school-related routes
router.get('/info', (req, res) => {
  res.json({ message: 'School information route' });
});

// Add login route with dropdown for user type
router.post('/login', (req, res) => {
  const { username, password, userType } = req.body;
  
  // TODO: Implement actual authentication logic
  res.json({ 
    message: 'Login route', 
    username, 
    userType 
  });
});

module.exports = router;
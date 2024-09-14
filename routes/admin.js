const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

router.post('/add-teacher', async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      employeeId,
      subjects,
      qualifications,
      dateOfJoining,
      contactNumber,
      email,
      address,
      emergencyContact
    } = req.body;

    const newTeacher = new Teacher({
      username,
      password,
      firstName,
      lastName,
      employeeId,
      subjects,
      qualifications,
      dateOfJoining,
      contactNumber,
      email,
      address,
      emergencyContact
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher', error: error.message });
  }
});

module.exports = router;
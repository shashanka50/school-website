const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const Student = require('../models/Student');

// Create a new notification
router.post('/', auth, async (req, res) => {
  try {
    const { title, message, targetAudience, type } = req.body;
    const newNotification = new Notification({
      title,
      message,
      type,
      createdBy: req.user.id,
      creatorModel: type === 'admin' ? 'Admin' : 'Teacher',
      targetAudience
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notifications for teachers
router.get('/teacher', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { 'targetAudience.wholeSchool': true },
        { 'targetAudience.classes': { $elemMatch: { grade: req.user.grade, section: req.user.section } } }
      ]
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching teacher notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all notifications for admin
router.get('/admin', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this new route to your existing notifications.js file
router.get('/student', auth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const notifications = await Notification.find({
      $or: [
        { 'targetAudience.wholeSchool': true },
        { 
          'targetAudience.classes': { 
            $elemMatch: { 
              grade: student.grade, 
              section: student.section 
            } 
          } 
        }
      ]
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching student notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
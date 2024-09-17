const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['teacher', 'admin'],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'creatorModel',
    required: true
  },
  creatorModel: {
    type: String,
    enum: ['Teacher', 'Admin'],
    required: true
  },
  targetAudience: {
    wholeSchool: {
      type: Boolean,
      default: false
    },
    classes: [{
      grade: String,
      section: String
    }]
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  expiresAt: { 
    type: Date
  }
});

// Compound index to efficiently query notifications for a specific class and section
NotificationSchema.index({ 'targetAudience.classes.grade': 1, 'targetAudience.classes.section': 1 });

module.exports = mongoose.model('Notification', NotificationSchema);
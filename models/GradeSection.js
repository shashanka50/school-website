const mongoose = require('mongoose');

const GradeSectionSchema = new mongoose.Schema({
  grades: [String],
  sections: [String]
});

module.exports = mongoose.model('GradeSection', GradeSectionSchema);
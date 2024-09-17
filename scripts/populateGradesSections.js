require('dotenv').config();
const mongoose = require('mongoose');
const GradeSection = require('../models/GradeSection');

const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D', 'E'];

async function populateGradesSections() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/school_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingData = await GradeSection.findOne();
    if (existingData) {
      console.log('Grades and sections data already exists. Updating...');
      existingData.grades = grades;
      existingData.sections = sections;
      await existingData.save();
    } else {
      console.log('Creating new grades and sections data...');
      const newGradeSection = new GradeSection({
        grades,
        sections,
      });
      await newGradeSection.save();
    }

    console.log('Grades and sections data populated successfully');
  } catch (error) {
    console.error('Error populating grades and sections:', error);
  } finally {
    mongoose.disconnect();
  }
}

populateGradesSections();
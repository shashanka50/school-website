require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/school');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const adminRoutes = require('./routes/admin');
const notificationRoutes = require('./routes/notifications');

// Import models
require('./models/Student');
require('./models/Teacher');
require('./models/Admin');
require('./models/Notification');

// Remove this line
// process.env.JWT_SECRET = 'your_temporary_secret_key';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/school_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Add this route before other route definitions
app.get('/', (req, res) => {
  res.send('Welcome to the School API');
});

// Routes
if (typeof authRoutes === 'function') {
  app.use('/api/auth', authRoutes);
} else {
  console.error('authRoutes is not a function:', typeof authRoutes);
}

if (typeof studentRoutes === 'function') {
  app.use('/api/student', studentRoutes);
} else {
  console.error('studentRoutes is not a function:', typeof studentRoutes);
}

if (typeof schoolRoutes === 'function') {
  app.use('/api/school', schoolRoutes);
} else {
  console.error('schoolRoutes is not a function:', typeof schoolRoutes);
}

if (typeof teacherRoutes === 'function') {
  app.use('/api/teacher', teacherRoutes);
} else {
  console.error('teacherRoutes is not a function:', typeof teacherRoutes);
}

if (typeof adminRoutes === 'function') {
  app.use('/api/admin', adminRoutes);
} else {
  console.error('adminRoutes is not a function:', typeof adminRoutes);
}

if (typeof notificationRoutes === 'function') {
  app.use('/api/notifications', notificationRoutes);
} else {
  console.error('notificationRoutes is not a function:', typeof notificationRoutes);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// You can keep this line for debugging, but consider removing it in production
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Is set' : 'Is not set');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
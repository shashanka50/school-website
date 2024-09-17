import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Chip } from '@material-ui/core';
import axios from 'axios';

function NotificationForm({ open, handleClose, onNotificationAdded, userRole }) {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    targetAudience: {
      wholeSchool: false,
      classes: []
    }
  });
  const [selectedClass, setSelectedClass] = useState({ grade: '', section: '' });
  const [gradesAndSections, setGradesAndSections] = useState({ grades: [], sections: [] });

  useEffect(() => {
    const fetchGradesAndSections = async () => {
      try {
        const response = await axios.get('/api/school/grades-sections');
        setGradesAndSections(response.data);
      } catch (error) {
        console.error('Error fetching grades and sections:', error);
      }
    };

    fetchGradesAndSections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };

  const handleWholeSchoolChange = (e) => {
    setNotification({
      ...notification,
      targetAudience: {
        ...notification.targetAudience,
        wholeSchool: e.target.checked
      }
    });
  };

  const handleClassChange = (e) => {
    const { name, value } = e.target;
    setSelectedClass({ ...selectedClass, [name]: value });
  };

  const addClass = () => {
    if (selectedClass.grade && selectedClass.section) {
      setNotification(prevNotification => ({
        ...prevNotification,
        targetAudience: {
          ...prevNotification.targetAudience,
          classes: [...prevNotification.targetAudience.classes, selectedClass]
        }
      }));
      setSelectedClass({ grade: '', section: '' });
    }
  };

  const removeClass = (index) => {
    setNotification(prevNotification => ({
      ...prevNotification,
      targetAudience: {
        ...prevNotification.targetAudience,
        classes: prevNotification.targetAudience.classes.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/notifications', {
        ...notification,
        type: userRole
      });
      onNotificationAdded(response.data);
      handleClose();
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Notification</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={notification.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          multiline
          rows={4}
          value={notification.message}
          onChange={handleChange}
        />
        {userRole === 'admin' && (
          <FormControlLabel
            control={
              <Checkbox
                checked={notification.targetAudience.wholeSchool}
                onChange={handleWholeSchoolChange}
                name="wholeSchool"
              />
            }
            label="Send to whole school"
          />
        )}
        {(!notification.targetAudience.wholeSchool || userRole === 'teacher') && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Grade</InputLabel>
              <Select
                name="grade"
                value={selectedClass.grade}
                onChange={handleClassChange}
              >
                {gradesAndSections.grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>Grade {grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Section</InputLabel>
              <Select
                name="section"
                value={selectedClass.section}
                onChange={handleClassChange}
              >
                {gradesAndSections.sections.map((section) => (
                  <MenuItem key={section} value={section}>Section {section}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={addClass}>Add Class</Button>
            <div style={{ marginTop: '10px' }}>
              {notification.targetAudience.classes.map((cls, index) => (
                <Chip
                  key={index}
                  label={`Grade ${cls.grade} - Section ${cls.section}`}
                  onDelete={() => removeClass(index)}
                  style={{ margin: '5px' }}
                />
              ))}
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create Notification
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationForm;
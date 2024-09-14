import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, IconButton } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import axios from 'axios';

function AddTeacherModal({ open, handleClose }) {
  const [teacherData, setTeacherData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    employeeId: '',
    subjects: '',
    qualifications: [{ degree: '', institution: '', year: '' }],
    dateOfJoining: '',
    contactNumber: '',
    email: '',
    address: '',
    emergencyContact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleQualificationChange = (index, field, value) => {
    const newQualifications = teacherData.qualifications.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setTeacherData({ ...teacherData, qualifications: newQualifications });
  };

  const addQualification = () => {
    setTeacherData({
      ...teacherData,
      qualifications: [...teacherData.qualifications, { degree: '', institution: '', year: '' }]
    });
  };

  const removeQualification = (index) => {
    const newQualifications = teacherData.qualifications.filter((_, i) => i !== index);
    setTeacherData({ ...teacherData, qualifications: newQualifications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/add-teacher', teacherData);
      console.log('Teacher added successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding teacher:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Teacher</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={teacherData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={teacherData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={teacherData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={teacherData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={teacherData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="employeeId"
                value={teacherData.employeeId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subjects"
                name="subjects"
                value={teacherData.subjects}
                onChange={handleChange}
                helperText="Separate multiple subjects with commas"
                required
              />
            </Grid>
            {teacherData.qualifications.map((qual, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={qual.degree}
                      onChange={(e) => handleQualificationChange(index, 'degree', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={qual.institution}
                      onChange={(e) => handleQualificationChange(index, 'institution', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Year"
                      type="number"
                      value={qual.year}
                      onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => removeQualification(index)} disabled={teacherData.qualifications.length === 1}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button startIcon={<AddIcon />} onClick={addQualification}>
                Add Qualification
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                value={teacherData.dateOfJoining}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={teacherData.contactNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={teacherData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={teacherData.address}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={teacherData.emergencyContact}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Teacher
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTeacherModal;
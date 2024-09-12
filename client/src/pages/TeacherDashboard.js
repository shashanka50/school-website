import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Paper, makeStyles, CircularProgress } from '@material-ui/core';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

function TeacherDashboard() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching teacher details with token:', token);
        const response = await axios.get('/api/teacher/details', {
          headers: { 'x-auth-token': token }
        });
        console.log('Fetched teacher details:', response.data);
        setTeacherDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teacher details:', err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.message : 'Failed to load teacher details');
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Welcome, {teacherDetails?.firstName} {teacherDetails?.lastName}!
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>Your Details</Typography>
        <Typography>Employee ID: {teacherDetails?.employeeId}</Typography>
        <Typography>Subjects: {teacherDetails?.subjects.join(', ')}</Typography>
        <Typography>Qualifications: {teacherDetails?.qualifications.join(', ')}</Typography>
        <Typography>Date of Joining: {teacherDetails?.dateOfJoining ? new Date(teacherDetails.dateOfJoining).toLocaleDateString() : 'N/A'}</Typography>
        <Typography>Contact Number: {teacherDetails?.contactNumber}</Typography>
        <Typography>Email: {teacherDetails?.email}</Typography>
        <Typography>Address: {teacherDetails?.address}</Typography>
        <Typography>Emergency Contact: {teacherDetails?.emergencyContact}</Typography>
      </Paper>
    </Container>
  );
}

export default TeacherDashboard;
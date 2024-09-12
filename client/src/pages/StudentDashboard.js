import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, makeStyles, CircularProgress } from '@material-ui/core';
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
  noticeTitle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
}));

// Hardcoded notices for now
const notices = [
  { id: 1, title: 'Upcoming Science Fair', content: 'The annual science fair will be held next month. Start preparing your projects!' },
  { id: 2, title: 'Parent-Teacher Meeting', content: 'Parent-teacher meetings are scheduled for next week. Please inform your parents.' },
  { id: 3, title: 'Holiday Announcement', content: 'The school will be closed next Monday for a public holiday.' },
];

function StudentDashboard() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/student/details', {
          headers: { 'x-auth-token': token }
        });
        console.log('Fetched student details:', response.data);
        setStudentDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to load student details');
        setLoading(false);
      }
    };

    fetchStudentDetails();
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
        Welcome, {studentDetails?.firstName} {studentDetails?.lastName}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>Your Details</Typography>
            <Typography>Grade: {studentDetails?.grade}</Typography>
            <Typography>Section: {studentDetails?.section}</Typography>
            <Typography>Roll Number: {studentDetails?.rollNumber}</Typography>
            <Typography>Date of Birth: {studentDetails?.dateOfBirth ? new Date(studentDetails.dateOfBirth).toLocaleDateString() : 'N/A'}</Typography>
            <Typography>Blood Group: {studentDetails?.bloodGroup}</Typography>
            <Typography>Parent Name: {studentDetails?.parentName}</Typography>
            <Typography>Parent Contact: {studentDetails?.parentContact}</Typography>
            <Typography>Address: {studentDetails?.address}</Typography>
            <Typography>Emergency Contact: {studentDetails?.emergencyContact}</Typography>
            {studentDetails?.medicalConditions && (
              <Typography>Medical Conditions: {studentDetails.medicalConditions}</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>Notifications</Typography>
            {notices.map((notice) => (
              <div key={notice.id}>
                <Typography variant="subtitle1" className={classes.noticeTitle}>
                  {notice.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {notice.content}
                </Typography>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentDashboard;
import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, makeStyles, CircularProgress, Avatar, Divider } from '@material-ui/core';
import { School, Notifications, Person, Home, Phone, LocalHospital } from '@material-ui/icons';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    height: '100%',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 5px 15px 5px rgba(0, 0, 0, .07)',
    },
  },
  title: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  noticeTitle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
  },
  noticeContent: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function StudentDashboard() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [studentDetails, setStudentDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [studentResponse, notificationsResponse] = await Promise.all([
          axios.get('/api/student/details', {
            headers: { 'x-auth-token': token }
          }),
          axios.get('/api/notifications/student', {
            headers: { 'x-auth-token': token }
          })
        ]);

        setStudentDetails(studentResponse.data);
        setNotifications(notificationsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className={classes.root} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={classes.root}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Welcome, {studentDetails?.firstName} {studentDetails?.lastName}!
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} src={studentDetails?.profilePicture || '/default-avatar.png'} />
            <Typography variant="h6" gutterBottom>Your Details</Typography>
            <div className={classes.detailItem}>
              <School className={classes.icon} />
              <Typography>Grade: {studentDetails?.grade} | Section: {studentDetails?.section}</Typography>
            </div>
            <div className={classes.detailItem}>
              <Person className={classes.icon} />
              <Typography>Roll Number: {studentDetails?.rollNumber}</Typography>
            </div>
            <div className={classes.detailItem}>
              <Home className={classes.icon} />
              <Typography>Address: {studentDetails?.address}</Typography>
            </div>
            <div className={classes.detailItem}>
              <Phone className={classes.icon} />
              <Typography>Emergency Contact: {studentDetails?.emergencyContact}</Typography>
            </div>
            <div className={classes.detailItem}>
              <LocalHospital className={classes.icon} />
              <Typography>Blood Group: {studentDetails?.bloodGroup}</Typography>
            </div>
            {studentDetails?.medicalConditions && (
              <div className={classes.detailItem}>
                <LocalHospital className={classes.icon} />
                <Typography>Medical Conditions: {studentDetails.medicalConditions}</Typography>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              <Notifications className={classes.icon} style={{ verticalAlign: 'middle' }} />
              Notifications
            </Typography>
            {notifications.length > 0 ? (
              notifications.map((notice) => (
                <React.Fragment key={notice._id}>
                  <Typography variant="subtitle1" className={classes.noticeTitle}>
                    {notice.title}
                  </Typography>
                  <Typography variant="body2" className={classes.noticeContent}>
                    {notice.message}
                  </Typography>
                  <Typography variant="caption">
                    Created at: {new Date(notice.createdAt).toLocaleString()}
                  </Typography>
                  <Divider className={classes.divider} />
                </React.Fragment>
              ))
            ) : (
              <Typography>No notifications available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentDashboard;
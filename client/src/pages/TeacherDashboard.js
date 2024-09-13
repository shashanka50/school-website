import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, makeStyles, CircularProgress, Avatar, Divider } from '@material-ui/core';
import { Person, Email, Phone, Home, School, Work, DateRange, LocalLibrary } from '@material-ui/icons';
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
  sectionTitle: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: 500,
  },
  divider: {
    margin: theme.spacing(2, 0),
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
        Welcome, {teacherDetails?.firstName} {teacherDetails?.lastName}!
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} src={teacherDetails?.profilePicture || '/default-avatar.png'} />
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
            <div className={classes.detailItem}>
              <Person className={classes.icon} />
              <Typography>Name: {teacherDetails?.firstName} {teacherDetails?.lastName}</Typography>
            </div>
            <div className={classes.detailItem}>
              <Email className={classes.icon} />
              <Typography>Email: {teacherDetails?.email}</Typography>
            </div>
            <div className={classes.detailItem}>
              <Phone className={classes.icon} />
              <Typography>Contact: {teacherDetails?.contactNumber}</Typography>
            </div>
            <div className={classes.detailItem}>
              <Home className={classes.icon} />
              <Typography>Address: {teacherDetails?.address}</Typography>
            </div>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.sectionTitle}>Professional Information</Typography>
            <div className={classes.detailItem}>
              <Work className={classes.icon} />
              <Typography>Employee ID: {teacherDetails?.employeeId}</Typography>
            </div>
            <div className={classes.detailItem}>
              <School className={classes.icon} />
              <Typography>Subjects: {teacherDetails?.subjects.join(', ')}</Typography>
            </div>
            <div className={classes.detailItem}>
              <DateRange className={classes.icon} />
              <Typography>Date of Joining: {teacherDetails?.dateOfJoining ? new Date(teacherDetails.dateOfJoining).toLocaleDateString() : 'N/A'}</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>Qualifications</Typography>
            {teacherDetails?.qualifications.map((qualification, index) => (
              <div key={index} className={classes.detailItem}>
                <LocalLibrary className={classes.icon} />
                <Typography>{qualification}</Typography>
              </div>
            ))}
            <Divider className={classes.divider} />
            <Typography variant="h6" gutterBottom>Emergency Contact</Typography>
            <div className={classes.detailItem}>
              <Phone className={classes.icon} />
              <Typography>{teacherDetails?.emergencyContact}</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TeacherDashboard;
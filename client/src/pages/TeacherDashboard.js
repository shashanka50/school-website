import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, makeStyles, CircularProgress, Avatar, Divider, Chip, Button } from '@material-ui/core';
import { Person, Email, Phone, Home, School, Work, DateRange, LocalLibrary, Notifications } from '@material-ui/icons';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import NotificationForm from '../components/NotificationForm';
import { useHistory } from 'react-router-dom';

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
  qualificationsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  qualificationChip: {
    margin: theme.spacing(0.5),
  },
  notificationSection: {
    marginTop: theme.spacing(4),
  },
  notification: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function TeacherDashboard() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const history = useHistory();

  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  useEffect(() => {
    fetchTeacherDetails();
    fetchNotifications();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token used for teacher details:', token);
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('/api/teacher/details', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTeacherDetails(response.data);
    } catch (error) {
      console.error('Error fetching teacher details:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('/api/notifications/teacher', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error.response?.data || error.message);
      // Handle the error appropriately
    }
  };

  const handleNotificationAdded = (newNotification) => {
    setNotifications([newNotification, ...notifications]);
    setOpenNotificationModal(false);
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/${notificationId}`);
      setNotifications(notifications.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  if (!teacherDetails) {
    return <CircularProgress />;
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
            <div className={classes.qualificationsContainer}>
              {teacherDetails?.qualifications.map((qualification, index) => (
                <Chip
                  key={index}
                  icon={<LocalLibrary />}
                  label={`${qualification.degree} - ${qualification.institution} (${qualification.year})`}
                  className={classes.qualificationChip}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </div>
            <Divider className={classes.divider} />
            <Typography variant="h6" gutterBottom>Emergency Contact</Typography>
            <div className={classes.detailItem}>
              <Phone className={classes.icon} />
              <Typography>{teacherDetails?.emergencyContact}</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
      
      <div className={classes.notificationSection}>
        <Typography variant="h5" gutterBottom>
          <Notifications className={classes.icon} />
          Notifications
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenNotificationModal(true)}
        >
          Add Notification
        </Button>
        {notifications.map((notification) => (
          <Paper key={notification._id} className={classes.notification}>
            <Typography variant="h6">{notification.title}</Typography>
            <Typography>{notification.message}</Typography>
            <Typography variant="caption">
              Created at: {new Date(notification.createdAt).toLocaleString()}
            </Typography>
            <Button onClick={() => handleDeleteNotification(notification._id)}>Delete</Button>
          </Paper>
        ))}
      </div>
      
      <NotificationForm
        open={openNotificationModal}
        handleClose={() => setOpenNotificationModal(false)}
        onNotificationAdded={handleNotificationAdded}
        userRole="teacher"
      />
    </Container>
  );
}

export default TeacherDashboard;
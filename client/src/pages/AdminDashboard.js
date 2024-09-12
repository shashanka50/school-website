import React, { useState, useContext } from 'react';
import { Container, Typography, Grid, Paper, Button, makeStyles } from '@material-ui/core';
import { PersonAdd, Person, MenuBook, School, Settings } from '@material-ui/icons';
import AddStudentModal from '../components/AddStudentModal';
import AddTeacherModal from '../components/AddTeacherModal';
import AddAdminModal from '../components/AddAdminModal';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    paddingTop: theme.spacing(4),
  },
  content: {
    padding: theme.spacing(4),
  },
  gridItem: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
  },
  icon: {
    fontSize: 60,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  cardTitle: {
    fontFamily: '"Roboto", sans-serif',
    marginBottom: theme.spacing(2),
    color: '#34495e',
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function AdminDashboard() {
  const classes = useStyles();
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openTeacherModal, setOpenTeacherModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOpenModal = (modalType) => {
    switch (modalType) {
      case 'student':
        setOpenStudentModal(true);
        break;
      case 'teacher':
        setOpenTeacherModal(true);
        break;
      case 'admin':
        setOpenAdminModal(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = (modalType) => {
    switch (modalType) {
      case 'student':
        setOpenStudentModal(false);
        break;
      case 'teacher':
        setOpenTeacherModal(false);
        break;
      case 'admin':
        setOpenAdminModal(false);
        break;
      default:
        break;
    }
  };

  if (!user || user.userType !== 'admin') {
    return <Typography>Access Denied. Admin privileges required.</Typography>;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Teacher Card */}
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.cardContent}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Person className={classes.icon} />
                  <MenuBook className={classes.icon} style={{ position: 'absolute', bottom: 0, right: -20, fontSize: 40 }} />
                </div>
                <Typography variant="h5" className={classes.cardTitle}>
                  Add Teacher
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Add new teachers to the school system. Manage faculty members easily.
                </Typography>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenModal('teacher')}
                className={classes.button}
                startIcon={<PersonAdd />}
              >
                Add New Teacher
              </Button>
            </Paper>
          </Grid>
          {/* Student Card */}
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.cardContent}>
                <School className={classes.icon} />
                <Typography variant="h5" className={classes.cardTitle}>
                  Add Student
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Enroll new students into the school system. Manage student records efficiently.
                </Typography>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenModal('student')}
                className={classes.button}
                startIcon={<PersonAdd />}
              >
                Add New Student
              </Button>
            </Paper>
          </Grid>
          {/* Admin Card */}
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.cardContent}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Person className={classes.icon} />
                  <Settings className={classes.icon} style={{ position: 'absolute', bottom: 0, right: -20, fontSize: 40 }} />
                </div>
                <Typography variant="h5" className={classes.cardTitle}>
                  Add Admin
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Add new administrators to the school system. Manage system access and permissions.
                </Typography>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenModal('admin')}
                className={classes.button}
                startIcon={<PersonAdd />}
              >
                Add New Admin
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <AddStudentModal 
        open={openStudentModal} 
        handleClose={() => handleCloseModal('student')} 
      />
      <AddTeacherModal 
        open={openTeacherModal} 
        handleClose={() => handleCloseModal('teacher')} 
      />
      <AddAdminModal 
        open={openAdminModal} 
        handleClose={() => handleCloseModal('admin')} 
      />
    </div>
  );
}

export default AdminDashboard;
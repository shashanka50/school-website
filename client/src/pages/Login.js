import React, { useState, useContext } from 'react';
import { Container, Typography, Grid, Paper, Button, makeStyles, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { PersonAdd, Person, MenuBook, School, Settings } from '@material-ui/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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

function Login() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUserType, setCurrentUserType] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleOpenModal = (userType) => {
    setCurrentUserType(userType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    setError('');
    try {
      if (!username || !password) {
        throw new Error('Username and password are required');
      }

      console.log('Attempting login with:', { username, password, userType: currentUserType });
      const response = await axios.post('/api/auth/login', { username, password, userType: currentUserType });
      console.log('Login response:', response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      login({ ...user, role: currentUserType }); // Store the user's role
      handleCloseModal();
      history.push('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Invalid username or password');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Grid container spacing={4}>
          {/* Student Card */}
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.cardContent}>
                <School className={classes.icon} />
                <Typography variant="h5" className={classes.cardTitle}>
                  Student Login
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Access your student account and view your academic information.
                </Typography>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenModal('student')}
                className={classes.button}
                startIcon={<PersonAdd />}
              >
                Login as Student
              </Button>
            </Paper>
          </Grid>
          {/* Teacher Card */}
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.cardContent}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Person className={classes.icon} />
                  <MenuBook className={classes.icon} style={{ position: 'absolute', bottom: 0, right: -20, fontSize: 40 }} />
                </div>
                <Typography variant="h5" className={classes.cardTitle}>
                  Teacher Login
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Access your teacher account and manage your classes.
                </Typography>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenModal('teacher')}
                className={classes.button}
                startIcon={<PersonAdd />}
              >
                Login as Teacher
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
                  Admin Login
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                  Access the admin panel to manage the school system.
                </Typography>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenModal('admin')}
                className={classes.button}
                startIcon={<PersonAdd />}
              >
                Login as Admin
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{`${currentUserType.charAt(0).toUpperCase() + currentUserType.slice(1)} Login`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
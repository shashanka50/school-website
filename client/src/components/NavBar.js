import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
  },
}));

function NavBar() {
  const classes = useStyles();
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          School Management System
        </Typography>
        <Button color="inherit" component={RouterLink} to="/" className={classes.link}>
          Home
        </Button>
        {user ? (
          <>
            {user.role === 'student' && (
              <Button color="inherit" component={RouterLink} to="/student-dashboard" className={classes.link}>
                Dashboard
              </Button>
            )}
            {user.role === 'teacher' && (
              <Button color="inherit" component={RouterLink} to="/teacher-dashboard" className={classes.link}>
                Dashboard
              </Button>
            )}
            {user.role === 'admin' && (
              <Button color="inherit" component={RouterLink} to="/admin-dashboard" className={classes.link}>
                Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={logout} className={classes.link}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login" className={classes.link}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
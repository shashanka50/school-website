import React, { useContext } from 'react';
import { Container, Typography, Paper, makeStyles } from '@material-ui/core';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

function TeacherDashboard() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Welcome, {user.firstName} {user.lastName}!
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h6">Teacher Dashboard</Typography>
        <Typography>
          This is your dashboard. More features will be added soon.
        </Typography>
      </Paper>
    </Container>
  );
}

export default TeacherDashboard;
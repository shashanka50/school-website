import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
  },
  welcomeSection: {
    marginBottom: theme.spacing(4),
  },
  carouselContainer: {
    position: 'relative',
    height: 400,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  imageLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  principalPhotosContainer: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  principalPhotoWrapper: {
    position: 'relative',
    height: '48%',
  },
  principalPhoto: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
}));

const images = [
  {
    label: 'School Building',
    imgPath: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  // ... (add more images)
];

const principalPhotos = [
  {
    label: 'Principal',
    imgPath: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Vice Principal',
    imgPath: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

function Home() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [maxSteps]);

  return (
    <Container>
      <Box className={classes.welcomeSection}>
        <Typography variant="h4" gutterBottom>Welcome to Our School</Typography>
        <Typography variant="body1" paragraph>
          This is the home page of our school management system. Please use the navigation bar above to log in and access your dashboard.
        </Typography>
        <Typography variant="body1" paragraph>
          If you're a student, teacher, or administrator, you can manage your school-related activities through our easy-to-use interface.
        </Typography>
      </Box>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} className={classes.carouselContainer}>
            <img
              className={classes.img}
              src={images[activeStep].imgPath}
              alt={images[activeStep].label}
            />
            <Typography className={classes.imageLabel}>
              {images[activeStep].label}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box className={classes.principalPhotosContainer}>
            {principalPhotos.map((photo, index) => (
              <Paper key={index} elevation={3} className={classes.principalPhotoWrapper}>
                <img
                  className={classes.principalPhoto}
                  src={photo.imgPath}
                  alt={photo.label}
                />
                <Typography className={classes.imageLabel}>
                  {photo.label}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
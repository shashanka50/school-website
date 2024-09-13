import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Grid, Paper, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  welcomeSection: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  title: {
    fontFamily: '"Playfair Display", serif',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontFamily: '"Roboto", sans-serif',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
  },
  carouselContainer: {
    position: 'relative',
    height: 400,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
  },
  carouselSlider: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    height: '100%',
  },
  carouselSlide: {
    minWidth: '100%',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    textAlign: 'center',
  },
  principalPhotosContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  principalPhotoWrapper: {
    position: 'relative',
    height: 190,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
  },
  principalPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoSection: {
    marginTop: theme.spacing(4),
  },
  infoCard: {
    padding: theme.spacing(3),
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  infoIcon: {
    fontSize: 40,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const images = [
  { imgPath: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b', label: 'Our Modern Campus' },
  { imgPath: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d', label: 'State-of-the-art Laboratories' },
  { imgPath: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da', label: 'Spacious Library' },
  { imgPath: 'https://images.unsplash.com/photo-1577412647305-991150c7d163', label: 'Sports Facilities' },
  { imgPath: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837', label: 'Advanced Computer Lab' },
];

const principalPhotos = [
  { imgPath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', label: 'Dr. John Doe - Principal' },
  { imgPath: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e', label: 'Mrs. Jane Smith - Vice Principal' },
];

function Home() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const maxSteps = images.length;
  const timerRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (!isHovering) {
          setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
        }
      }, 5000); // Changed to 5 seconds for a smoother experience
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [maxSteps, isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <Container className={classes.root}>
      <Box className={classes.welcomeSection}>
        <Typography variant="h3" className={classes.title}>Welcome to Our School</Typography>
        <Typography variant="h5" className={classes.subtitle}>Empowering Minds, Shaping Futures</Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            className={classes.carouselContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={classes.carouselSlider} 
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {images.map((step, index) => (
                <div key={step.label} className={classes.carouselSlide}>
                  <img className={classes.img} src={step.imgPath} alt={step.label} />
                  <Typography className={classes.imageLabel}>
                    {step.label}
                  </Typography>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
      <Grid container spacing={4} className={classes.infoSection}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className={classes.infoCard}>
            <Typography variant="h6" gutterBottom>Our Mission</Typography>
            <Typography>
              To provide a nurturing environment that fosters academic excellence, personal growth, and social responsibility.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className={classes.infoCard}>
            <Typography variant="h6" gutterBottom>Our Vision</Typography>
            <Typography>
              To be a leading institution that prepares students to become global citizens and lifelong learners.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className={classes.infoCard}>
            <Typography variant="h6" gutterBottom>Core Values</Typography>
            <Typography>
              Excellence, Integrity, Innovation, Inclusivity, and Community Engagement.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
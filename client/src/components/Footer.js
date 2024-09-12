import React from 'react';
import { Container, Typography, IconButton } from '@material-ui/core';
import { Twitter, LinkedIn, Facebook, Instagram } from '@material-ui/icons';

function Footer() {
  return (
    <footer style={{ marginTop: 'auto', padding: '20px 0', backgroundColor: '#f5f5f5' }}>
      <Container>
        <Typography variant="body2" align="center">
          Follow us on social media:
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <IconButton href="#" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </IconButton>
          <IconButton href="#" target="_blank" rel="noopener noreferrer">
            <LinkedIn />
          </IconButton>
          <IconButton href="#" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </IconButton>
          <IconButton href="#" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </IconButton>
        </div>
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          © 2024 Your School Name. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
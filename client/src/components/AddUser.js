import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import axios from 'axios';

function AddUser({ userType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/auth/register', 
        { username, password, userType },
        { headers: { 'x-auth-token': token } }
      );
      console.log('User added:', response.data);
      setMessage('User added successfully');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
      setMessage('Error adding user: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Box>
      {message && <Typography color={message.includes('Error') ? 'error' : 'primary'} gutterBottom>{message}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddUser;
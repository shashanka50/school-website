import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios';

function AddUserModal({ open, handleClose, userType }) {
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
      setTimeout(() => {
        handleClose();
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
      setMessage('Error adding user: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New {userType.charAt(0).toUpperCase() + userType.slice(1)}</DialogTitle>
      <DialogContent>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserModal;
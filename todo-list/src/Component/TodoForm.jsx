import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <form className='ToDoForm' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='todo-input' 
          placeholder='What is the task today?' 
          onChange={(e) => setValue(e.target.value)} 
          value={value} 
        />
        <button type='submit' className='todo-btn'>Add Task</button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert 
          onClose={handleClose}
          severity="success"
          sx={{
            backgroundColor: '#4caf50',
            color: '#ffffff',
          }}
        >
          Task added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
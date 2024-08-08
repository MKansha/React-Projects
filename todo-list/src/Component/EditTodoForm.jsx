
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const EditTodoForm = ({ editTask, task }) => {
  const [value, setValue] = useState(task.task);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(value, task.id);
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
          placeholder='Update Task'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type='submit' className='todo-btn'>Update Task</button>
      </form>
      
    
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000} 
      >
        <Alert onClose={handleClose} severity="success">
          Updated Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
 

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDelete(false);
  };

  const confirmDelete = () => {
    deleteTodo(taskToDelete);
    setOpenDelete(false);
  };

  



  return (
    <div className='Todo'>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : 'incompleted'}`}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(task.id)} />
      </div>
      <Snackbar
        open={openDelete}
        autoHideDuration={6000}
        onClose={handleCloseDelete}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseDelete}
          severity="warning"
          action={
            <>
              <Button color="inherit" size="small" onClick={confirmDelete}>
                YES
              </Button>
              <Button color="inherit" size="small" onClick={handleCloseDelete}>
                NO
              </Button>
            </>
          }
        >
          Are you sure you want to delete this task?
        </Alert>
      </Snackbar>
     
    </div>
  );
};
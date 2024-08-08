import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const addTodo = (value) => {
    if (!value) return;
    setTodos([...todos, { id: uuidv4(), task: value, completed: false, isEditing: false }]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : { ...todo, isEditing: false }
    ));
    showSnackbar("Edit mode enabled", "info"); // Show snackbar when edit mode is enabled
  };

  const editTask = (task, id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, task, isEditing: false } : todo
    ));
    showSnackbar("Task updated successfully", "success"); // Show snackbar when task is updated
  };

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {
        todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm key={todo.id} editTask={editTask} task={todo} />
          ) : (
            <Todo key={todo.id} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
          )
        )
      }
      {/* Snackbar for edit pop-up */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

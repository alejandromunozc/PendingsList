const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../lib/validateSession');

const {
    renderNewTaskForm,
    createNewTask,
    renderTasks,
    renderEditTaskForm,
    editTask,
    editStateBkTask,
    editStateFwTask,
    deleteTask
} = require('../controllers/task.controller');

// New task
router.get('/task/new', isAuthenticated, renderNewTaskForm);
router.post('/task/new', isAuthenticated, createNewTask);

// Get all tasks
router.get('/task', isAuthenticated, renderTasks);

//Edit task
router.get('/task/edit/:id', isAuthenticated, renderEditTaskForm);
router.put('/task/edit/:id', isAuthenticated, editTask);
router.put('/task/edit/statebk/:id', isAuthenticated, editStateBkTask);
router.put('/task/edit/statefw/:id', isAuthenticated, editStateFwTask);

// Delete task
router.delete('/task/delete/:id', isAuthenticated, deleteTask);

module.exports = router;
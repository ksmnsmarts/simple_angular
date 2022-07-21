const router = require('express').Router();
const todoController = require('./todo_controller');


/* todo  */
router.get('/getTodoList', todoController.getTodoList);
router.post('/addTodo', todoController.addTodo);
router.post('/editTodo', todoController.editTodo);

module.exports = router;

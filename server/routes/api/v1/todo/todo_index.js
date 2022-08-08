const router = require('express').Router();
const todoController = require('./todo_controller');


/* todo  */
router.get('/getAllTodo', todoController.getAllTodo);
router.get('/getMyTodo', todoController.getMyTodo);
router.post('/addTodo', todoController.addTodo);
router.post('/editTodo', todoController.editTodo);
router.post('/deleteTodo', todoController.deleteTodo);


module.exports = router;

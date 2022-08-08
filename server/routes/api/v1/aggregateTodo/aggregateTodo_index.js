const router = require('express').Router();
const aggregateTodoController = require('./aggregateTodo_controller');


/* aggregate todo */
router.get('/aggregate_getAllTodo', aggregateTodoController.aggregate_getAllTodo);
router.get('/aggregate_getMyTodo', aggregateTodoController.aggregate_getMyTodo);
router.post('/aggregate_addTodo', aggregateTodoController.aggregate_addTodo)
module.exports = router;

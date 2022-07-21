const router = require('express').Router();

const todo = require('./todo/todo_index');
const file = require('./file/file_index');


/*-----------------------------------
	API
-----------------------------------*/
router.use('/todo', todo);
router.use('/file', file);



module.exports = router;
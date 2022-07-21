const { ObjectId } = require('bson');
var fs = require("fs");
const mongoose = require('mongoose');


// To do list 가져오기
exports.getTodoList = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: req.decoded._id
  router.get('/getTodoList', todoController.getTodoList);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    try {
        const findTodo = await dbModels.Todo.find();

        if (!findTodo) {
            return res.status(401).send({
                message: 'An error has occurred'
            });
        }

        return res.send(
            findTodo
        );

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}


// To do 생성
exports.addTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: req.decoded._id
  router.post('/addTodo', todoController.addTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;
    const data = req.body;

    const todoData = {
        todo: req.body.todo,
    }


    try {
        const newTodo = await dbModels.Todo(todoData)
        await newTodo.save();

        return res.send({
            message: 'success todo save'
        });


    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}


// To do 수정
exports.editTodo = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: req.decoded._id
  router.post('/editTodo', todoController.editTodo);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const data = req.body;
    // console.log(data)

    try {
        const findTodo = await dbModels.Todo.findOneAndUpdate(
            {
                _id: data._id
            },
            {
                todo: data.todo
            }
        )

        return res.send({
            message: 'success todo edit'
        });


    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }

}
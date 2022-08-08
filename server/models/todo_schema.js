const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const todo_Schema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // 참조할 모델(collection) 명
        },
        name: {
            type: String,
        },
        todo: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model('Todo', todo_Schema)

module.exports = Todo;
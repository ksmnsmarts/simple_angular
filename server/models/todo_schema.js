const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const todo_Schema = mongoose.Schema(
    {
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
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const aggregateTodo_Schema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // 참조할 모델(collection) 명
        },
        todo: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const aggregateTodo = mongoose.model('aggregateTodo', aggregateTodo_Schema)

module.exports = aggregateTodo;
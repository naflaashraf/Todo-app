const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;


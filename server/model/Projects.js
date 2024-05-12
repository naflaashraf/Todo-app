const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;


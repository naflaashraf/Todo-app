const express = require('express')
const { createTodoCntrl, allTodoCntrl, singleTodoCntrl, updateTodoCntrl, deleteTodoCntrl } = require('../../controller/todo/todoController')

const todosRoute = express.Router()

todosRoute.post('/project/:projectId/createtodo',createTodoCntrl)

todosRoute.get('/todos/:projectid',allTodoCntrl)

todosRoute.get('/:projectId/todos/:todoId',singleTodoCntrl)

todosRoute.put('/todos/:todoId',updateTodoCntrl)

todosRoute.delete('/todos/:todoId',deleteTodoCntrl)

module.exports = todosRoute;
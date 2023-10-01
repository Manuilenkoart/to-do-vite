/* eslint-disable @typescript-eslint/no-var-requires */
const createTodo = require('./todoControllers/createTodo');
const updateTodo = require('./todoControllers/updateTodo');
const deleteTodo = require('./todoControllers/deleteTodo');
const getAllTodo = require('./todoControllers/getAllTodo');
const getTodoById = require('./todoControllers/getTodoById');

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  getTodoById,
};

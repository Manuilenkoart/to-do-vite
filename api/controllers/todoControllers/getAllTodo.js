/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getAllTodosDb } = require('../../db/actions/todoActions');

const getAllTodo = async (req, res) => {
  try {
    const data = await getAllTodosDb();

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send('Server error');
    }
  } catch (error) {
    console.error('Error while fetching all todos:', error);
    res.status(500).send('Server error');
  }
};

module.exports = getAllTodo;

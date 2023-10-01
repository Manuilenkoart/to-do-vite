/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createTodoDb } = require('../../db/actions/todoActions');

const createTodo = async (req, res) => {
  try {
    const data = await createTodoDb(req.body.data);
    if (data) {
      res.status(201).json(data);
    } else {
      res.status(500).send('Server error');
    }
  } catch (error) {
    console.error('Error while creating a todo:', error);
    res.status(500).send('Server error');
  }
};

module.exports = createTodo;

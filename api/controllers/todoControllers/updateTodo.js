/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const { updateTodoDb } = require('../../db/actions/todoActions');

const updateTodo = async (req, res) => {
  const { data } = req.body;

  try {
    const updatedTodo = await updateTodoDb(data._id, data);

    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(500).send('Server error');
    }
  } catch (error) {
    console.error('Error while updating a todo:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateTodo;

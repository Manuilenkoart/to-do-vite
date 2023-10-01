/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const { deleteTodoDb } = require('../../db/actions/todoActions');

const deleteTodo = async (req, res) => {
  try {
    const data = await deleteTodoDb(req.body.id);

    if (!data) {
      return res.status(404).json({ err: 'Todo not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error while deleting a todo:', error);
    res.status(500).send('Server error');
  }
};

module.exports = deleteTodo;

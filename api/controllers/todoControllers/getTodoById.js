/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getTodoByIdDB } = require('../../db/actions/todoActions');

const getTodoById = async (req, res) => {
  const todoId = req.params.id;
  try {
    const data = await getTodoByIdDB(todoId);

    if (data) {
      res.status(200).json(data);
    } else {
      return res.status(404).json({ err: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error while fetching a todo by ID:', error);

    if (error.name === 'CastError') {
      return res.status(404).json({ err: 'Todo not found' });
    }

    res.status(500).send('Server error');
  }
};

module.exports = getTodoById;

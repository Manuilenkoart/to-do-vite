/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router();

const { createTodo, updateTodo, deleteTodo, getAllTodo, getTodoById } = require('../../controllers/index');

router.get('/:id', getTodoById);
router.get('/', getAllTodo);
router.post('/', createTodo);
router.put('/', updateTodo);
router.delete('/', deleteTodo);

module.exports = router;

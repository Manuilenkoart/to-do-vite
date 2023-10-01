/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 3,
    },
  },
  {
    versionKey: false,
    strict: 'throw',
  }
);

module.exports = mongoose.model('Todo', todoSchema);

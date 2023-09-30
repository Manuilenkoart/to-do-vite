/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const { DB } = require('../config');

async function connectToMongoDB() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectToMongoDB;

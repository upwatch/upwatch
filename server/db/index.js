//this is the access point for all things database related!

const db = require('./db');
const Listing = require('./models/Listing');
const Metrics = require('./models/Metrics');

//associations could go here!

module.exports = {
  db,
  models: {
    Listing,
    Metrics,
  },
};

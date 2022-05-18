const router = require('express').Router();
const {
  models: { Listing },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

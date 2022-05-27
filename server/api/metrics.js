const router = require('express').Router();
const {
  models: { Metrics },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const metrics = await Metrics.findOne({ where: { id: 1 } });
    res.json(metrics);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

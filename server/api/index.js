const router = require('express').Router();
module.exports = router;

router.use('/listings', require('./listings'));
router.use('/metrics', require('./metrics'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

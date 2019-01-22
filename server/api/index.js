const router = require('express').Router();

router.route('/posts').get((req, res, next) => {
  res.json({
    message: 'GET all posts',
  });
});

module.exports = router;

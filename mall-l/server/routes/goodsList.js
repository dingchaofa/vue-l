var express = require('express');
var router = express.Router();

/* GET goodsList. */
router.get('/', function(req, res, next) {
  res.render('goodsList', { title: 'Express' });
});

module.exports = router;

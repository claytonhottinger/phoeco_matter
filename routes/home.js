var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Phoenix Covenant', height: 6, width: 8});
});

module.exports = router;

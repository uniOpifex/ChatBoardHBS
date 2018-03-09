var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Message Board Generator' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Message Board Generator' });
});


module.exports = router;

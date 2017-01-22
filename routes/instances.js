var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
  res.render('instances/index');
});

module.exports = router;

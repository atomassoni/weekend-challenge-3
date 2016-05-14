var express = require('express');
var router = express.Router();
var path = require('path');
var num = {'solution':0};

router.post('/', function(req, res) {
  console.log('obj', req.body);
  num.solution = Number(req.body.number1)+Number(req.body.number2);

  res.send(num);


});


module.exports = router;

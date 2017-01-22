var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  //fetch a list of all the current container instances

  request.get('https://betaapi.azuqua.com/flo/6684719c2d94797815a095ab2c305777/invoke?clientToken=87bdf3281c6b7b8fb4bed6f0b5babb2f8b5625fc2e2251c8f2aec84004d237ca', function(error, response, body) {
    if (error) console.error(error);
    var parsedJson = {};
    try {
      parsedJson = JSON.parse(body);
    } catch (e) {
      if (e) console.error(e);
    }
    for (var key in parsedJson.Response.Output) {
      if (!parsedJson.Response.Output.hasOwnProperty(key)) {
        //The current property is not a direct property of p
        continue;
    }
      var instance = parsedJson.Response.Output[key];
      var stages = instance.stages;
      for (var key2 in stages) {
        if (!stages.hasOwnProperty(key2)) {
          continue;
        }
        var stage = stages[key2];
        var now = moment();
        console.log(stage.start_time);
        var stageTime = moment('2016-06-06T21:03:55');
        var timePassed = now.diff(stageTime, 'hours');
        console.log(stageTime, now, timePassed);

      }
    }
  });
  res.render('index', {});
});

module.exports = router;

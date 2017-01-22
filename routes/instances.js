var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

router.get('/:id', function(req, res) {
  request.get('https://betaapi.azuqua.com/flo/c974fa912d0d58a2736ca7db9cda8743/invoke?uuid=' + req.params.id, function(error, response, body) {
    if (error) console.error(error);

    var parsedJson = {};
    try {
      parsedJson = JSON.parse(body);
    } catch (e) {
      console.error(e);
    }
    var stages = parsedJson.Response.Output.stages;

    for (var key in stages) {
      if (!stages.hasOwnProperty(key)) {
        continue;
      }
      var startTime = stages[key].start_time;
      var now = moment();
      var stageTimePassed = now.diff(startTime, 'hours');
      stages[key].time_passed = stageTimePassed;
    }


    console.log(stages);
    res.render('instances/index', {stages: stages, id: req.params.id});
  });
});

module.exports = router;

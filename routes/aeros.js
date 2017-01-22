var express = require('express');
var Dropbox = require('dropbox');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var router = express.Router();

//CR routes for aero object (request/response objects
router.get('/', function(req, res) {
  var db = req.app.db;
  res.render('aeros/index');
});

//create new aero
router.get('/new', function(req, res) {
  res.render('aeros/new');
});

router.post('/new', function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(files);
    var fileUpload = files.file.path + '/' + files.file.name;
    console.log(fileUpload);
    fs.readFile(files.file.path, function(err, data) {
      if (err) {
        console.error(err);
      }

      //dropbox logic
      var dbx = new Dropbox({accessToken: 'j2cxMouqKcAAAAAAAAAACZ3VjV5sLK8IVeF-MZhWWMgQ7GTbZllL2DgqdGZnk0Kc'});
      dbx.filesUpload({path: '/NYC_Ports_Hackathon_v2/' + files.file.name, contents: data})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(e) {
          console.error(e);
        });
    });
  });
  res.json('200 OK');
});

//get aero at id
router.get('/:id', function(req, res) {
  //call to FLO API endpoint for requesting information about aero from database
  //pretend data that the FLO returned
  var sampleAeroId = 'ab543ccdde3450032';
  res.render('aeros/show', {aeroId: sampleAeroId});
});

module.exports = router;

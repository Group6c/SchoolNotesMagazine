'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './modules/events/client/img/'); // where to store it
  },
  filename: function (req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
      console.log("filename error");
      var err = new Error();
      err.code = 'filetype'; // to check on file type
      return cb(err);
    } else {
      console.log("produced filename");
      var day = new Date();
      var d = day.getDay();
      var h = day.getHours();
      var fileNamee = d + '_' + h + '_' + file.originalname;
      console.log("filename produced is: " + fileNamee);
      cb(null, fileNamee);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 20971520 } // Max file size: 20MB
}).single('myfile'); // name in form

exports.uploads = function (req, res) {
  console.log("in uploads");
  upload(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ success: false, message: 'File size is too large. Max limit is 20MB' });
      } else if (err.code === 'filetype') {
        res.json({ success: false, message: 'File type is invalid. Accepted types are .png/.jpg/.jpeg/.pdf' });
      } else {
        console.log('err = ' + err);
        res.json({ success: false, message: 'File was not able to be uploaded' });
      }
    } else {
      if (!req.file) {
        console.log("reached here with !rep.file");
        var event = new Event(req.body);
        event.user = req.user;

        event.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(event);
          }
        });
      }
      else if (req.file) {
        console.log("reached here with req.file");
        res.json({ success: true, message: 'File was uploaded!' });
      }

    }
    // Everything went fine
  });
};

/**
 * Create a event
 */
exports.create = function(req, res) {
  var event = new Event(req.body);
  event.user = req.user;

  event.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(event);
    }
  });
};

/**
 * Show the current event
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var event = req.event ? req.event.toJSON() : {};

  // Add a custom field to the event, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the event model.
  event.isCurrentUserOwner = req.user && event.user && event.user._id.toString() === req.user._id.toString();

  res.jsonp(event);
};

/**
 * Update a event
 */
exports.update = function(req, res) {
  var event = req.event;

  event = _.extend(event, req.body);

  // event.title = req.body.title;
  // event.body = req.body.body;
  // event.tags = req.body.tags;
  // event.thumbnail = req.body.thumbnail;

  event.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(event);
    }
  });
};

/**
 * Delete an event
 */
exports.delete = function(req, res) {
  var event = req.event;

  event.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(event);
    }
  });
};

/**
 * List of events
 */
exports.list = function(req, res) {
  Event.find().sort('-created').populate('user', 'displayName').exec(function(err, events) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(events);
    }
  });
};

/**
 * event middleware
 */
exports.eventByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'event is invalid'
    });
  }

  Event.findById(id).populate('user', 'displayName').exec(function (err, event) {
    if (err) {
      return next(err);
    } else if (!event) {
      return res.status(404).send({
        message: 'No event with that identifier has been found'
      });
    }
    req.event = event;
    next();
  });
};

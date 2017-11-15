'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Contest = mongoose.model('Contest'),
  Submission = mongoose.model('Submission'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Contest
 */
exports.create = function(req, res) {
  var contest = new Contest(req.body);
  contest.user = req.user;

  contest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contest);
    }
  });
};

/**
 * Show the current Contest
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  console.log("In read");
  var contest = req.contest ? req.contest.toJSON() : {};

  console.log("var contest");
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  contest.isCurrentUserOwner = req.user && contest.user && contest.user._id.toString() === req.user._id.toString();
  console.log("contest.isCurrentUserOwner");
  res.jsonp(contest);
  console.log("res.jsonp(contest);");
};

/**
 * Update a Contest
 */
exports.update = function(req, res) {
  var contest = req.contest;

  contest = _.extend(contest, req.body);

  contest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contest);
    }
  });
};

/**
 * Delete an Contest
 */
exports.delete = function(req, res) {
  var contest = req.contest;

  contest.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contest);
    }
  });
};

/**
 * List of Contests
 */
exports.list = function(req, res) {
  console.log("in list");
  Contest.find().sort('-created').populate('user', 'displayName').exec(function(err, contests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contests);
    }
  });
};

/**
 * Contest middleware
 */
exports.contestByID = function(req, res, next, id) {
  console.log("In contestByID");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Contest is invalid'
    });
  }

  Contest.findById(id).populate('user', 'displayName').exec(function (err, contest) {
    if (err) {
      return next(err);
    } else if (!contest) {
      return res.status(404).send({
        message: 'No Contest with that identifier has been found'
      });
    }
    req.contest = contest;
    next();
  });
};



exports.createSubmission = function(req, res) {
  console.log("In create Submission");
  var submission = new Submission(req.body);
  submission.user = req.user;

  submission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(submission);
    }
  });
};

/**
 * Show the current Contest
 */
exports.readSubmission = function(req, res) {
  // convert mongoose document to JSON
  console.log("In read Submission");
  var submission = req.submission ? req.submission.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  submission.isCurrentUserOwner = req.user && submission.user && submission.user._id.toString() === req.user._id.toString();
  res.jsonp(submission);
};

/**
 * Update a Contest
 */
exports.updateSubmission = function(req, res) {
  console.log("In update Submission");
  // var contest = req.contest;

  // contest = _.extend(contest, req.body);

  // contest.save(function(err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(contest);
  //   }
  // });
};

/**
 * Delete an Contest
 */
exports.deleteSubmission = function(req, res) {
  console.log("In delete Submission");
  // var contest = req.contest;

  // contest.remove(function(err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(contest);
  //   }
  // });
};

/**
 * List of Contests
 */
exports.listSubmission = function(req, res) {
  console.log("In list Submission");
  // Contest.find().sort('-created').populate('user', 'displayName').exec(function(err, contests) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(contests);
  //   }
  // });
};

/**
 * Contest middleware
 */
exports.submissionByID = function(req, res, next, id) {
console.log("In SubmissionbyID");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Submission is invalid'
    });
  }

  Submission.findById(id).populate('user', 'displayName').exec(function (err, submission) {
    if (err) {
      return next(err);
    } else if (!submission) {
      return res.status(404).send({
        message: 'No Submission with that identifier has been found'
      });
    }
    req.submission = submission;
    next();
  });
};

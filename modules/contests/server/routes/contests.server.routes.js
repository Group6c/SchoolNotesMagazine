'use strict';

/**
 * Module dependencies
 */
var contestsPolicy = require('../policies/contests.server.policy'),
  contests = require('../controllers/contests.server.controller');

module.exports = function(app) {
  // Contests Routes
  app.route('/api/contests').all(contestsPolicy.isAllowed)
    .get(contests.list)
    .post(contests.create);

  app.route('/api/contests/submissions').all(contestsPolicy.isAllowed)
    .get(contests.listSubmission)
    .post(contests.createSubmission);

  app.route('/api/contests/submissions/:submissionId').all(contestsPolicy.isAllowed)
    .get(contests.readSubmission)
    .put(contests.updateSubmission)
    .delete(contests.deleteSubmission);

  app.route('/api/contests/:contestId').all(contestsPolicy.isAllowed)
    .get(contests.read)
    .put(contests.update)
    .delete(contests.delete);

  // Finish by binding the Contest middleware
  app.param('contestId', contests.contestByID);
  app.param('submissionId', contests.submissionByID);
};

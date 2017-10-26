'use strict';

/**
 * Module dependencies
 */
var questsPolicy = require('../policies/quests.server.policy'),
  quests = require('../controllers/quests.server.controller');

module.exports = function(app) {
  // Quests Routes
  app.route('/api/quests').all(questsPolicy.isAllowed)
    .get(quests.list)
    .post(quests.create);

  app.route('/api/quests/:questId').all(questsPolicy.isAllowed)
    .get(quests.read)
    .put(quests.update)
    .delete(quests.delete);

  // Finish by binding the Quest middleware
  app.param('questId', quests.questByID);
};

// Quests service used to communicate Quests REST endpoints
(function () {
  'use strict';

  angular
    .module('quests')
    .factory('QuestsService', QuestsService);

  QuestsService.$inject = ['$resource'];

  function QuestsService($resource) {
    return $resource('/api/quests/:questId', {
      questId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

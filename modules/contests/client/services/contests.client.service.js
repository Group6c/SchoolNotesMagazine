// Contests service used to communicate Contests REST endpoints
(function () {
  'use strict';

  angular
    .module('contests')
    .factory('ContestsService', ContestsService);

  ContestsService.$inject = ['$resource'];

  function ContestsService($resource) {
    return $resource('api/contests/:contestId', {
      contestId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

// Contests service used to communicate Contests REST endpoints
(function () {
  'use strict';

  angular
    .module('contests')
    .factory('SubmissionsService', SubmissionsService);

  SubmissionsService.$inject = ['$resource'];

  function SubmissionsService($resource) {
    return $resource('/api/contests/submissions/:submissionId', {
      submissionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

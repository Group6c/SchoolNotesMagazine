(function () {
  'use strict';

  // Contests controller
  angular
    .module('contests')
    .controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'contestResolve'];

  function SubmissionsController ($scope, $state, $window, Authentication, contest) {
    var vm = this;

    vm.authentication = Authentication;
    vm.submission = submission;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    console.log("submissionid" + submission._id);

    // Remove existing Contest
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.submission.$remove($state.go('contests.list'));
      }
    }

    // Save Contest
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.submissionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.submission._id) {
        vm.submission.$update(successCallback, errorCallback);
      } else {
        vm.submission.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('contests.list', {
          submissionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

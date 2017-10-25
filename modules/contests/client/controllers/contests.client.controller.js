(function () {
  'use strict';

  // Contests controller
  angular
    .module('contests')
    .controller('ContestsController', ContestsController);

  ContestsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'contestResolve'];

  function ContestsController ($scope, $state, $window, Authentication, contest) {
    var vm = this;

    vm.authentication = Authentication;
    vm.contest = contest;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Contest
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.contest.$remove($state.go('contests.list'));
      }
    }

    // Save Contest
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contestForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.contest._id) {
        vm.contest.$update(successCallback, errorCallback);
      } else {
        vm.contest.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('contests.view', {
          contestId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

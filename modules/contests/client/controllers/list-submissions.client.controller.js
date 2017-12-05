(function () {
  'use strict';

  angular
    .module('contests')
    .controller('SubmissionsListController', SubmissionsListController);

  SubmissionsListController.$inject = ['SubmissionsService', 'contestResolve'];

  function SubmissionsListController(SubmissionsService, contest) {
    var vm = this;
    vm.contest = contest;
    vm.submissions = SubmissionsService.query();
    vm.save = save;
    vm.error = null;
    vm.form = {};
    
    // update Contest Winner
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contestForm');
        return false;
      }

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

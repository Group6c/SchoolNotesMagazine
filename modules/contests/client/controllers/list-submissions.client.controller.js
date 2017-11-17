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
  }
}());

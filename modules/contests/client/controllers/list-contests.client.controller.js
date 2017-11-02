(function () {
  'use strict';

  angular
    .module('contests')
    .controller('ContestsListController', ContestsListController);

  ContestsListController.$inject = ['ContestsService'];

  function ContestsListController(ContestsService) {
    var vm = this;

    vm.contests = ContestsService.query();
  }
}());

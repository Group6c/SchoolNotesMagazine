(function () {
  'use strict';

  angular
    .module('quests')
    .controller('QuestsListController', QuestsListController);

  QuestsListController.$inject = ['QuestsService'];

  function QuestsListController(QuestsService) {
    var vm = this;

    vm.quests = QuestsService.query();
  }
}());

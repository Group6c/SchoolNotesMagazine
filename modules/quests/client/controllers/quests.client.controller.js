(function () {
  'use strict';

  // Quests controller
  angular
    .module('quests')
    .controller('QuestsController', QuestsController);

  QuestsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'questResolve'];

  function QuestsController ($scope, $state, $window, Authentication, quest) {
    var vm = this;

    vm.authentication = Authentication;
    vm.quest = quest;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    console.log("questid" + quest._id);

    // Remove existing Quest
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.quest.$remove($state.go('quests.list'));
      }
    }

    // Save Quest
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.questForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.quest._id) {
        vm.quest.$update(successCallback, errorCallback);
      } else {
        vm.quest.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('quests.view', {
          questId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

//   function HomeController($rootScope) {
//     var vm = this;
//   }
// }());
//HomeController.$inject = ['EventsService'];


function HomeController($scope, $state, Authentication, menuService, EventsService) {
    var vm = this;
    var hc = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    //Get the events for the front page
    hc.events = EventsService.query();
    //console.log("Events");
    // console.log(hc.events);

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
    angular
    .module('events')
    .controller('EventsListController', EventsListController);

  EventsListController.$inject = ['EventsService'];

  function EventsListController(EventsService) {
    var vm = this;

    vm.events = EventsService.query();
    console.log(vm.events);

  }

}());
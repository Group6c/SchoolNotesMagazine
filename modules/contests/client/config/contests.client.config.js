(function () {
  'use strict';

  angular
    .module('contests')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Contests',
      state: 'contests',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'contests', {
      title: 'List Contests',
      state: 'contests.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'contests', {
      title: 'Create Contest',
      state: 'contests.create',
      roles: ['admin']
    });

    // menuService.addSubMenuItem('topbar', 'contests', {
    //   title: 'View Submissions',
    //   state: 'contests.listSubmissions',
    //   roles: ['admin']
    // });
  }
}());

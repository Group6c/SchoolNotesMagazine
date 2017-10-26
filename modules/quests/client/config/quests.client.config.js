(function () {
  'use strict';

  angular
    .module('quests')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Quests',
      state: 'quests',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'quests', {
      title: 'List Quests',
      state: 'quests.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'quests', {
      title: 'Create Quest',
      state: 'quests.create',
      roles: ['admin']
    });
  }
}());

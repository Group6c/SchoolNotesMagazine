(function () {
  'use strict';

  angular
    .module('quests')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('quests', {
        abstract: true,
        url: '/quests',
        template: '<ui-view/>'
      })
      .state('quests.list', {
        url: '',
        templateUrl: 'modules/quests/client/views/list-quests.client.view.html',
        controller: 'QuestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Quests List'
        }
      })
      .state('quests.create', {
        url: '/create',
        templateUrl: 'modules/quests/client/views/form-quest.client.view.html',
        controller: 'QuestsController',
        controllerAs: 'vm',
        resolve: {
          questResolve: newQuest
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Quests Create'
        }
      })
      .state('quests.edit', {
        url: '/:questId/edit',
        templateUrl: 'modules/quests/client/views/form-quest.client.view.html',
        controller: 'QuestsController',
        controllerAs: 'vm',
        resolve: {
          questResolve: getQuest
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Quest {{ questResolve.name }}'
        }
      })
      .state('quests.view', {
        url: '/:questId',
        templateUrl: 'modules/quests/client/views/view-quest.client.view.html',
        controller: 'QuestsController',
        controllerAs: 'vm',
        resolve: {
          questResolve: getQuest
        },
        data: {
          pageTitle: 'Quest {{ questResolve.name }}'
        }
      });
  }

  getQuest.$inject = ['$stateParams', 'QuestsService'];

  function getQuest($stateParams, QuestsService) {
    return QuestsService.get({
      questId: $stateParams.questId
    }).$promise;
  }

  newQuest.$inject = ['QuestsService'];

  function newQuest(QuestsService) {
    return new QuestsService();
  }
}());

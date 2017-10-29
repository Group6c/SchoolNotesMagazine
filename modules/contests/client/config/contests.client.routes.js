(function () {
  'use strict';

  angular
    .module('contests')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('contests', {
        abstract: true,
        url: '/contests',
        template: '<ui-view/>'
      })
      .state('contests.list', {
        url: '',
        templateUrl: 'modules/contests/client/views/list-contest.client.view.html',
        controller: 'ContestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Contests List'
        }
      })
      .state('contests.create', {
        url: '/create',
        templateUrl: 'modules/contests/client/views/form-contest.client.view.html',
        controller: 'ContestsController',
        controllerAs: 'vm',
        resolve: {
          contestResolve: newContest
        },
        data: {
          roles: ['user'],
          pageTitle: 'Contests Create'
        }
      })
      .state('contests.edit', {
        url: '/:contestId/edit',
        templateUrl: 'modules/contests/client/views/form-contest.client.view.html',
        controller: 'ContestsController',
        controllerAs: 'vm',
        resolve: {
          contestResolve: getContest
        },
        data: {
          roles: ['user'],
          pageTitle: 'Edit Contest {{ contestResolve.name }}'
        }
      })
      .state('contests.view', {
        url: '/:contestId',
        templateUrl: 'modules/contests/client/views/view-contest.client.view.html',
        controller: 'ContestsController',
        controllerAs: 'vm',
        resolve: {
          contestResolve: getContest
        },
        data: {
          pageTitle: 'Contest {{ contestResolve.name }}'
        }
      });
  }

  getContest.$inject = ['$stateParams', 'ContestsService'];

  function getContest($stateParams, ContestsService) {
    return ContestsService.get({
      contestId: $stateParams.contestId
    }).$promise;
  }

  newContest.$inject = ['ContestsService'];

  function newContest(ContestsService) {
    return new ContestsService();
  }
}());

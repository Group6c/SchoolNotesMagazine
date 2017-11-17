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
        templateUrl: '/modules/contests/client/views/list-contest.client.view.html',
        controller: 'ContestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Contests List'
        }
      })
      .state('contests.create', {
        url: '/create',
        templateUrl: '/modules/contests/client/views/form-contest.client.view.html',
        controller: 'ContestsController',
        controllerAs: 'vm',
        resolve: {
          contestResolve: newContest
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Contests Create'
        }
      })
      .state('contests.listSubmissions', {
        url: '/submission',
        templateUrl: '/modules/contests/client/views/list-submissions.client.view.html',
        controller: 'SubmissionsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Submissions List'
        }
      })
      .state('contests.createSubmission', {
        url: '/submission/create',
        templateUrl: '/modules/contests/client/views/form-submission.client.view.html',
        controller: 'SubmissionsController',
        controllerAs: 'vm',
        resolve: {
          submissionResolve: newSubmission
        },
        data: {
          pageTitle: 'Submissions Create'
        }
      })
      // .state('contests.edit', {
      //   url: '/:contestId/edit',
      //   templateUrl: 'modules/contests/client/views/form-contest.client.view.html',
      //   controller: 'ContestsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     contestResolve: getContest
      //   },
      //   data: {
      //     roles: ['admin'],
      //     pageTitle: 'Edit Contest {{ contestResolve.name }}'
      //   }
      // })
      .state('contests.viewSubmissions', {
        url: '/submission/:submissionId',
        templateUrl: '/modules/contests/client/views/view-submission.client.view.html',
        controller: 'SubmissionsController',
        controllerAs: 'vm',
        resolve: {
          submissionResolve: getSubmission
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Submission {{ submissionResolve.name }}'
        }
      }).state('contests.edit', {
        url: '/:contestId/edit',
        templateUrl: '/modules/contests/client/views/form-contest.client.view.html',
        controller: 'ContestsController',
        controllerAs: 'vm',
        resolve: {
          contestResolve: getContest
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Contest {{ contestResolve.name }}'
        }
      })
      .state('contests.view', {
        url: '/:contestId',
        templateUrl: '/modules/contests/client/views/view-contest.client.view.html',
        controller: 'ContestsController',
        controllerAs: 'vm',
        resolve: {
          contestResolve: getContest
          //submissionResolve: getSubmission
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


  getSubmission.$inject = ['$stateParams', 'SubmissionsService'];

  function getSubmission($stateParams, SubmissionsService) {
    return SubmissionsService.get({
      submissionId: $stateParams.submissionId
    }).$promise;
  }

  newSubmission.$inject = ['SubmissionsService'];

  function newSubmission(SubmissionsService) {
    return new SubmissionsService();
  }

}());

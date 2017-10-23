(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig)
    .run(function ($rootScope, $location) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.currentPath = toState.url;
        //console.log(toState);
      });
    });

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'
      })
      .state('home.menu', {
        url: 'menu',
        templateUrl: '/modules/core/client/views/home.menu.client.view.html',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'

      })
      .state('home.calendar', {
        url: 'calendar',
        templateUrl: '/modules/core/client/views/home.calendar.client.view.html',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'

      })
      .state('home.articles', {
        url: 'articles',
        templateUrl: '/modules/core/client/views/home.articles.client.view.html',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'

      })
      .state('home.quests', {
        url: 'quests',
        templateUrl: '/modules/core/client/views/home.quests.client.view.html',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'

      })
      .state('home.game', {
        url: 'game',
        templateUrl: '/modules/core/client/views/home.game.client.view.html',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'

      })
      .state('home.contact', {
        url: 'contact',
        templateUrl: '/modules/core/client/views/home.contact.client.view.html',
        controllerAs: 'vm',
        css: 'modules/core/client/css/style.css'

      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
}());

(function () {
  'use strict';

  describe('Contests Route Tests', function () {
    // Initialize global variables
    var $scope,
      ContestsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ContestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ContestsService = _ContestsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('contests');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/contests');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ContestsController,
          mockContest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('contests.view');
          $templateCache.put('modules/contests/client/views/view-contest.client.view.html', '');

          // create mock Contest
          mockContest = new ContestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Contest Name'
          });

          // Initialize Controller
          ContestsController = $controller('ContestsController as vm', {
            $scope: $scope,
            contestResolve: mockContest
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:contestId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.contestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            contestId: 1
          })).toEqual('/contests/1');
        }));

        it('should attach an Contest to the controller scope', function () {
          expect($scope.vm.contest._id).toBe(mockContest._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/contests/client/views/view-contest.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ContestsController,
          mockContest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('contests.create');
          $templateCache.put('modules/contests/client/views/form-contest.client.view.html', '');

          // create mock Contest
          mockContest = new ContestsService();

          // Initialize Controller
          ContestsController = $controller('ContestsController as vm', {
            $scope: $scope,
            contestResolve: mockContest
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.contestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/contests/create');
        }));

        it('should attach an Contest to the controller scope', function () {
          expect($scope.vm.contest._id).toBe(mockContest._id);
          expect($scope.vm.contest._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/contests/client/views/form-contest.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ContestsController,
          mockContest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('contests.edit');
          $templateCache.put('modules/contests/client/views/form-contest.client.view.html', '');

          // create mock Contest
          mockContest = new ContestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Contest Name'
          });

          // Initialize Controller
          ContestsController = $controller('ContestsController as vm', {
            $scope: $scope,
            contestResolve: mockContest
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:contestId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.contestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            contestId: 1
          })).toEqual('/contests/1/edit');
        }));

        it('should attach an Contest to the controller scope', function () {
          expect($scope.vm.contest._id).toBe(mockContest._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/contests/client/views/form-contest.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

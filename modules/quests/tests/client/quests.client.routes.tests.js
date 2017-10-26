(function () {
  'use strict';

  describe('Quests Route Tests', function () {
    // Initialize global variables
    var $scope,
      QuestsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _QuestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      QuestsService = _QuestsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('quests');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/quests');
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
          QuestsController,
          mockQuest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('quests.view');
          $templateCache.put('modules/quests/client/views/view-quest.client.view.html', '');

          // create mock Quest
          mockQuest = new QuestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Quest Name'
          });

          // Initialize Controller
          QuestsController = $controller('QuestsController as vm', {
            $scope: $scope,
            questResolve: mockQuest
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:questId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.questResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            questId: 1
          })).toEqual('/quests/1');
        }));

        it('should attach an Quest to the controller scope', function () {
          expect($scope.vm.quest._id).toBe(mockQuest._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/quests/client/views/view-quest.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          QuestsController,
          mockQuest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('quests.create');
          $templateCache.put('modules/quests/client/views/form-quest.client.view.html', '');

          // create mock Quest
          mockQuest = new QuestsService();

          // Initialize Controller
          QuestsController = $controller('QuestsController as vm', {
            $scope: $scope,
            questResolve: mockQuest
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.questResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/quests/create');
        }));

        it('should attach an Quest to the controller scope', function () {
          expect($scope.vm.quest._id).toBe(mockQuest._id);
          expect($scope.vm.quest._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/quests/client/views/form-quest.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          QuestsController,
          mockQuest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('quests.edit');
          $templateCache.put('modules/quests/client/views/form-quest.client.view.html', '');

          // create mock Quest
          mockQuest = new QuestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Quest Name'
          });

          // Initialize Controller
          QuestsController = $controller('QuestsController as vm', {
            $scope: $scope,
            questResolve: mockQuest
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:questId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.questResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            questId: 1
          })).toEqual('/quests/1/edit');
        }));

        it('should attach an Quest to the controller scope', function () {
          expect($scope.vm.quest._id).toBe(mockQuest._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/quests/client/views/form-quest.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

(function () {
  'use strict';

  describe('Contests List Controller Tests', function () {
    // Initialize global variables
    var ContestsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ContestsService,
      mockContest;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ContestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ContestsService = _ContestsService_;

      // create mock article
      mockContest = new ContestsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Contest Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Contests List controller.
      ContestsListController = $controller('ContestsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockContestList;

      beforeEach(function () {
        mockContestList = [mockContest, mockContest];
      });

      it('should send a GET recontest and return all Contests', inject(function (ContestsService) {
        // Set POST response
        $httpBackend.expectGET('api/contests').respond(mockContestList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.contests.length).toEqual(2);
        expect($scope.vm.contests[0]).toEqual(mockContest);
        expect($scope.vm.contests[1]).toEqual(mockContest);

      }));
    });
  });
}());

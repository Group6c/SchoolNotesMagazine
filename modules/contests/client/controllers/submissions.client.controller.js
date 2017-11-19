(function () {
  'use strict';

  // Contests controller
  angular
    .module('contests')
    .controller('SubmissionsController', SubmissionsController);

  SubmissionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'submissionResolve', 'ContestsService', '$timeout'];

  function SubmissionsController ($scope, $state, $window, Authentication, submission, ContestsService, $timeout) {
    var vm = this;

    vm.authentication = Authentication;
    vm.submission = submission;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.contest = ContestsService.query();
    console.log("contests" + vm.contests);

    // Remove existing Contest
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.submission.$remove($state.go('contests.list'));
      }
    }

    // Save Contest
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.submissionForm');
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contestForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.submission._id) {
        vm.submission.$update(successCallback, errorCallback);
      } else {
        vm.submission.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('contests.list', {
          submissionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

      if (vm.contest._id) {
        vm.contest.$update(successCallback, errorCallback);
      } else {
        vm.contest.$save(successCallback, errorCallback);
      }
      function successCallback(res) {
        $state.go('contests.view', {
          contestId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    $scope.photoChanged = function (files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
        $scope.uploading = true;
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
          $timeout(function () {
            // Render art.
            $scope.art = {};
            $scope.art = e.target.result;
            //console.log("thumbail is" + $scope.art);
            var day = new Date();
            var d = day.getDay();
            var h = day.getHours();
            vm.submission.art = 'modules/submissions/client/img/' + d + '_' + h + '_' + files[0].name;
            vm.submission.imageString = $scope.art;
            $scope.uploading = false;
            $scope.message = false;
          });
        };
      } else {
        $scope.art = {};
        $scope.message = false;
      }
    };
    $scope.photoChanged2 = function (files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
        $scope.uploading = true;
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
          $timeout(function () {
            // Render art.
            $scope.picture = {};
            $scope.picture = e.target.result;
            //console.log("thumbail is" + $scope.art);
            var day = new Date();
            var d = day.getDay();
            var h = day.getHours();
            vm.submission.picture = 'modules/submissions/client/img/' + d + '_' + h + '_' + files[0].name;
            vm.submission.imageString = $scope.picture;
            $scope.uploading = false;
            $scope.message = false;
          });
        };
      } else {
        $scope.picture = {};
        $scope.message = false;
      }
    };
  }
}());

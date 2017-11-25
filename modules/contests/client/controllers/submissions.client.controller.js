(function () {
  'use strict';

  // Contests controller
  angular
    .module('contests')
    .controller('SubmissionsController', SubmissionsController)
    .directive('fileModel', fileModel);

    fileModel.$inject = ['$parse'];

  function fileModel($parse){
    return{
      restrict:'A',
      link: function(scope, element, attrs) {
        var parsedFile = $parse(attrs.fileModel);
        var parsedFileSetter = parsedFile.assign;

        element.bind('change', function() {
          scope.$apply(function () {
            parsedFileSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }

  SubmissionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'submissionResolve', 'ContestsService', '$timeout', '$http'];

  function SubmissionsController ($scope, $state, $window, Authentication, submission, ContestsService, $timeout, $http) {
    var vm = this;

    vm.authentication = Authentication;
    vm.submission = submission;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.contests = ContestsService.query();
    //console.log("contests" + vm.contests);

    // Remove existing Contest
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.submission.$remove($state.go('contests.list'));
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
            vm.submission.artImageString = $scope.art;
            //console.log(JSON.stringify(vm.submission, null, 4));
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
            vm.submission.pictureImageString = $scope.picture;
            //console.log(JSON.stringify(vm.submission, null, 4));
            $scope.uploading = false;
            $scope.message = false;
          });
        };
      } else {
        $scope.picture = {};
        $scope.message = false;
      }
    };

    // Save Contest
    function save(isValid) {
      console.log("save called");
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.submissionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.submission._id) {
        console.log("about to update submissions");
        vm.submission.$update(successCallback, errorCallback);
      } else {
        console.log("about to submit submissions");
        console.log(JSON.stringify(vm.submission, null, 4));
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
    }

    
  }
}());

(function () {
  'use strict';

  // Contests controller
  angular
    .module('contests')
    .controller('ContestsController', ContestsController);

  ContestsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'contestResolve', '$timeout', 'ContestsService'];

  function ContestsController ($scope, $state, $window, Authentication, contest, $timeout, ContestsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.contest = contest;
    // vm.contest = contest;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    //console.log("contestid" + contest._id);
    vm.contests = ContestsService.query();

    //To upload file
    // update or add pictures
    $scope.photoChanged2 = function (files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
        $scope.uploading = true;
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
          $timeout(function () {
            // Render art.
            $scope.thumbnail = {};
            $scope.thumbnail = e.target.result;
            //console.log("thumbail is" + $scope.art);
            var day = new Date();
            var d = day.getDay();
            var h = day.getHours();
            //vm.contest.thumbnail = 'modules/contests/client/img/' + d + '_' + h + '_' + files[0].name;
            vm.contest.thumbnail = $scope.thumbnail;
            //console.log(JSON.stringify(vm.contest, null, 4));
            $scope.uploading = false;
            $scope.message = false;
          });
        };
      } else {
        $scope.thumbnail = {};
        $scope.message = false;
      }
    };

    // Remove existing Contest
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.contest.$remove($state.go('contests.list'));
      }
    }

    // Save Contest
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contestForm');
        return false;
      }

      // TODO: move create/update logic to service
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
  }
}());

(function () {
  'use strict';

  // events controller,
  angular
    .module('events')
    .controller('EventsController', EventsController)
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

  EventsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'eventResolve', '$timeout', '$http', 'EventsService'];

  function EventsController ($scope, $state, $window, Authentication, event, $timeout, $http, EventsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.event = event;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.events = EventsService.query();
    var upload = function(file){
      console.log("upload called");
      var fd = new FormData();
      fd.append('myfile', file.upload);
      return $http.post('/api/events/', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });
    };


    $scope.file = {};

    $scope.uploadSubmit = function () {
      console.log("uploadsubmit called");
      $scope.uploading = true;
      upload($scope.file).then(function (data) {
        if(data.data.success) {
          console.log("datadatasuccess");
          $scope.uploading = false;
          $scope.alert = 'alert alert-success';
          $scope.message = data.data.message;
          $scope.file = {};
        } else {
          console.log("failed");
          $scope.uploading = false;
          $scope.alert = 'alert alert-danger';
          $scope.message = data.data.message;
          $scope.file = {};
        }
      });
    };

    // function for adding pictures into database
    $scope.photoChanged = function (files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
        $scope.uploading = true;
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
          $timeout(function () {
            // Render thumbnail.
            $scope.thumbnail = {};
            $scope.thumbnail = e.target.result;
            //console.log("thumbail is" + $scope.thumbnail);
            var day = new Date();
            var d = day.getDay();
            var h = day.getHours();
            vm.event.thumbnail = 'modules/events/client/img/' + d + '_' + h + '_' + files[0].name;
            vm.event.imageString = $scope.thumbnail;
            $scope.uploading = false;
            $scope.message = false;
          });
        };
      } else {
        $scope.thumbnail = {};
        $scope.message = false;
      }
    };

    // Remove existing event
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.event.$remove($state.go('events.list'));
      }
    }

    // Save event
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.eventForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.event._id) {
        vm.event.$update(successCallback, errorCallback);
      } else {
        console.log(JSON.stringify(vm.event, null, 4));
        $scope.uploadSubmit();
        vm.event.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        //$scope.uploadSubmit();
        $state.go('events.view', {
          eventId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

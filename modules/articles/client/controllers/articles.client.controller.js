(function () {
  'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController)
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

  ArticlesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'articleResolve', '$timeout', '$http'];

  function ArticlesController ($scope, $state, $window, Authentication, article, $timeout, $http) {
    var vm = this;

    vm.authentication = Authentication;
    vm.article = article;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    var upload = function(file){
      var fd = new FormData();
      fd.append('myfile', file.upload);
      return $http.post('/api/articles/', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });
    };


    $scope.file = {};

    $scope.uploadSubmit = function () {
      $scope.uploading = true;
      upload($scope.file).then(function (data) {
        if(data.data.success) {
          $scope.uploading = false;
          $scope.alert = 'alert alert-success';
          $scope.message = data.data.message;
          $scope.file = {};
        } else {
          $scope.uploading = false;
          $scope.alert = 'alert alert-danger';
          $scope.message = data.data.message;
          $scope.file = {};
        }
      });
    };

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
            var day = new Date();
            var d = day.getDay();
            var h = day.getHours();
            $scope.article.thumbnail = 'modules/articles/client/img/' + d + '_' + h + '_' + files[0].name;
            $scope.uploading = false;
            $scope.message = false;
          });
        };
      } else {
        $scope.thumbnail = {};
        $scope.message = false;
      }
    };

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        vm.article.$update(successCallback, errorCallback);
      } else {
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

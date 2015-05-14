'use strict';

angular.module('crowdPricingApp')
  .controller('headerCtrl', function ($scope, Auth, $location, $window) {
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function(data) {
          // Logged in, redirect to home
          $scope.setting.authUser=true;
          var a = Auth.getCurrentUser().$promise;
          a.then(function(res){
            console.log('====',res.name);
            $scope.user.name = res.name;

          });
           
          $location.path('/');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    
    
    $scope.logout = function() {
      Auth.logout();
      $scope.setting.authUser=false;
      $location.path('/');
    };


    $scope.loginOauth = function(provider) {
      console.log(provider);
      $window.location.href = '/auth/' + provider;
    };
  });

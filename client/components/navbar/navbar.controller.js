'use strict';

angular.module('crowdPricingApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

$scope.namevar=true;

    $scope.logout = function() {
      Auth.logout();
      $scope.namevar=true;
      $location.path('/');

    };

  });

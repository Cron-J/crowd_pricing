'use strict';

angular.module('crowdPricingApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    $scope.setting={authUser:false};

    $scope.user = {};
  });

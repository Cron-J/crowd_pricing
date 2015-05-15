'use strict';

angular.module('crowdPricingApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    $scope.setting={authUser:false};

    $scope.user = {};

    $http.get('/api/categories/').
	  success(function(data, status, headers, config) {
	    $scope.categories = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.log('error',data);
	  });
  });

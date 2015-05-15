'use strict';

angular.module('crowdPricingApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    $scope.setting={authUser:false};

    $scope.user = {};

    $http.get('/api/categories/').
	  success(function(data, status, headers, config) {
	  	console.log(data);
	    $scope.categories = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.log('error',data);
	  });

	  $http.get('/api/products/featured').
	  success(function(data, status, headers, config) {
	  	console.log('featured product',data);
	  	$scope.featuredProducts = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.log('error',data);
	  });
  });

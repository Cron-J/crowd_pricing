'use strict';

angular.module('crowdPricingApp')
  .controller('ProductListCtrl', function ($scope, $http , $stateParams) {
     console.log('lll',$stateParams.category);
     var category = $stateParams.category
     $http.get('/api/products/category/'+ category).
	  success(function(data, status, headers, config) {
	    $scope.productsbyCategory = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.log('error',data);
	  });
  });

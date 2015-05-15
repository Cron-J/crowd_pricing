'use strict';

angular.module('crowdPricingApp')
  .controller('ProductDetailCtrl', function ($scope, $http , $stateParams) {
     var productId = $stateParams.id;
     console.log(productId);
     $http.get('/api/products/product/'+ productId).
	  success(function(data, status, headers, config) {
	  	console.log(data);
	    //$scope.product = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.log('error',data);
	  });
  });

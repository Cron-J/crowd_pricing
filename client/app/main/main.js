'use strict';

angular.module('crowdPricingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('listing', {
        url: '/products',
        templateUrl: 'components/product-list/listing.html',
        controller: 'MainCtrl'
      })
      .state('detail', {
        url: '/product-detail',
        templateUrl: 'components/product-details/product-detail.html',
        controller: 'MainCtrl'
      });
  });
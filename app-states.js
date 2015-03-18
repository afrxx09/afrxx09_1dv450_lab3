(function() {
    'use strict';

    angular
    .module('appStates', ['ngResource'])
    .config(appStatesConfig);

    appStatesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appStatesConfig($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/'
            })
            .state('people', {
                url: '/people',
                templateUrl: 'views/people/list.html',
                controller: 'peopleController'
            })
            .state('tags', {
                url: '/tags',
                templateUrl: 'views/tags/list.html',
                controller: 'tagsController'
            })
            .state('places', {
                url: '/places',
                templateUrl: 'views/places/list.html',
                controller: 'placesController'
            });
            
        //$locationProvider.html5Mode(true);
    };
})();

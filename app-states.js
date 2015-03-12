(function() {
    'use strict';

    angular
    .module('appStates', [])
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
                controller: 'PeopleController'
            })
            .state('tags', {
                url: '/tags',
                templateUrl: 'views/tags/list.html',
                controller: 'TagsController'
            })
            .state('places', {
                url: '/places',
                templateUrl: 'views/places/list.html',
                controller: 'PlacesController'
            });

        //$locationProvider.html5Mode(true);
    };
})();

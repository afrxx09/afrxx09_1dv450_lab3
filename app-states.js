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
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/profile/details.html',
                controller: 'profileController'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'views/users/list.html',
                controller: 'usersController'
            })
            .state('user', {
                url: '/users/{id}',
                templateUrl: 'views/users/details.html',
                controller: 'userController'
            })
            .state('tags', {
                url: '/tags',
                templateUrl: 'views/tags/list.html',
                controller: 'tagsController'
            })
            .state('tag', {
                url: '/tag/{id}',
                templateUrl: 'views/tags/details.html',
                controller: 'tagController'
            })
            .state('places', {
                url: '/places',
                templateUrl: 'views/places/list.html',
                controller: 'placesController'
            })
            .state('place', {
                url: '/place/{id}',
                templateUrl: 'views/places/details.html',
                controller: 'placeController'
            });
    };
})();

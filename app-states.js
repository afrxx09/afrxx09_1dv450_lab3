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
                url: '/',
                title: ''
            })
            .state('profile', {
                url: '/profile',
                requiresLogin: true,
                title: 'Profile',
                templateUrl: 'views/profile/details.html',
                controller: 'profileController'
            })
            .state('users', {
                url: '/users',
                title: 'Users',
                templateUrl: 'views/users/list.html',
                controller: 'usersController'
            })
            .state('user', {
                url: '/users/{id}',
                title: 'User Details',
                templateUrl: 'views/users/details.html',
                controller: 'userController'
            })
            .state('tags', {
                url: '/tags',
                title: 'Tags',
                templateUrl: 'views/tags/list.html',
                controller: 'tagsController'
            })
            .state('tag', {
                url: '/tag/{id}',
                title: 'Tag Details',
                templateUrl: 'views/tags/details.html',
                controller: 'tagController'
            })
            .state('places', {
                url: '/places',
                title: 'Places',
                templateUrl: 'views/places/list.html',
                controller: 'placesController'
            })
            .state('place', {
                url: '/place/{id}',
                title: 'Place Details',
                templateUrl: 'views/places/details.html',
                controller: 'placeController'
            })
            .state('search', {
                url: '/search',
                title: 'Search',
                templateUrl: 'views/search/search.html',
                controller: 'searchController'
            })
            .state('sign-in', {
                url: '/sign-in',
                title: 'Sign In',
                templateUrl: 'views/sign-in/sign-in.html',
                controller: 'signInController'
            })
            .state('sign-out', {
                url: '/sign-out',
                controller: 'signOutController'
            })
            .state('new-event', {
                url: '/new-event',
                requiresLogin: true,
                title: 'New Event',
                templateUrl: 'views/events/new.html',
                controller: 'newEventController'
            })
            .state('edit-event', {
                url: '/edit-event/{id}',
                requiresLogin: true,
                title: 'Edit Event',
                templateUrl: 'views/events/edit.html',
                controller: 'editEventController'
            })
            .state('delete-event', {
                url: '/delete-event/{id}',
                requiresLogin: true,
                title: 'Delete Event',
                templateUrl: 'views/events/delete.html',
                controller: 'deleteEventController'
            });
    };
})();

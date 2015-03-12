(function() {
    'use strict';

    angular
    .module('appRoutes', ['ngRoute'])
    .config(AppRoutesConfig);

    AppRoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

    function AppRoutesConfig($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    };
})();

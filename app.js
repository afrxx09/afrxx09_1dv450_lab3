(function() {
    'use strict';

    angular
    .module('app',[
    	'ngAnimate',
    	'ngRoute',
    	'ngResource',
    	'ui.router',
    	'appStates',
    	'googleMapsDirective'
    ])
    .constant('CONST', {
        'API_URL': 'http://localhost:3000/api/v2/',
        'API_KEY': '524c94faf385b814ce22d7d83b73cbd3'
    })
    .config(appConfig);
    
    appConfig.$inject = ['$httpProvider', 'CONST'];
    function appConfig($httpProvider, CONST){
        $httpProvider.defaults.headers.common = {
            'X-ApiKey': CONST.API_KEY
        };
    }

    //Vill ha Konstanter, fungerar inte?
    
})();
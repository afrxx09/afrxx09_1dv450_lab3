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
    ]);

    //Vill ha Konstanter, fungerar inte?
    /*
    .constant('CONST', appConst);

    var appConst = {
    	'API_URL': 'http://localhost:3000/api/v2/',
    	'API_KEY': '524c94faf385b814ce22d7d83b73cbd3'
    };
    */ 
})();
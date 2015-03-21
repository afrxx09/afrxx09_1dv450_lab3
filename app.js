(function() {
    'use strict';

    angular
    .module('app',[
    	'ngAnimate',
    	'ngRoute',
    	'ngResource',
    	'ui.router',
    	'appStates',
    	'googleMapsDirective',
        'angular-storage',
        'angular-jwt'
    ])
    .constant('CONST', {
        'API_URL': 'http://localhost:3000/api/v2/',
        'API_KEY': '524c94faf385b814ce22d7d83b73cbd3'
    })
    .config(appConfig)
    .run(appRun);
    
    appConfig.$inject = ['$httpProvider', 'CONST', 'jwtInterceptorProvider'];
    function appConfig( $httpProvider, CONST, jwtInterceptorProvider){
        //Set API-key on all requests
        $httpProvider.defaults.headers.common = {
            'X-ApiKey': CONST.API_KEY
        };
        
        jwtInterceptorProvider.tokenGetter = function(store){
            return store.get('jwt');
        }
        jwtInterceptorProvider.authHeader = 'JWT';
        jwtInterceptorProvider.authPrefix = '';
        $httpProvider.interceptors.push('jwtInterceptor');
    }
    
    appRun.$inject = ['$rootScope', '$state', 'store', 'signInService'];
    function appRun($rootScope, $state, store, signInService){
        signInService.decodeJWT();//Sign in user if JWT-token is stored in local storage
        
        //Check if a state requires user to be signed in
        $rootScope.$on('$stateChangeStart', function(e, to){
            if(to.data && to.data.requiresLogin){
                if(!store.get('jwt')){
                    e.preventDefault();
                    $state.go('home');
                }
            }
        });
    }
    
})();
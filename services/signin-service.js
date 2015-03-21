(function(){
	'use strict';

	angular
	.module('app')
	.factory('signInService', SignInService);

	SignInService.$inject = ['$rootScope', '$http', '$state', 'jwtHelper', 'store', 'CONST'];
	function SignInService($rootScope, $http, $state, jwtHelper, store, CONST){
		$rootScope.currentUser = null;
		var decodeJWT = function(){
			var jwt = store.get('jwt');
			var decoded = jwt && jwtHelper.decodeToken(jwt);
			if(decoded){
				$rootScope.currentUser = {
					id: decoded['user_id'],
					email: store.get('email')
				};
				if($rootScope.currentUser.id){
					var now = new Date().getTime() / 1000;
					if(now > decoded.exp){
						console.log('Token timeout');
						signOut();
					}
				}
			}
		};
		
		var signOut = function(){
			store.set('jwt', null);
	        $rootScope.currentUser = null;
	        $state.go('home', {}, {reload: true});
		};
		
		var signIn = function(email, password){
			var user = {email: email, password: password};
			$http.post(CONST.API_URL + 'authenticate', user)
			.success(function(data){
				store.set('jwt', data.token);
				store.set('email', data.user.email);
				decodeJWT();
			})
			.error(function(err){
				console.log(err.error);
			});
		};
		
		return {
			decodeJWT: function(){
				decodeJWT();
			},
			signIn: function(email, password){
				signIn(email, password);
			},
			signOut: function(){
				signOut();
			}
		};
	}
})();
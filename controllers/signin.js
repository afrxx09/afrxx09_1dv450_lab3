(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('signinController', SigninController);
	
	SigninController.$inject = ['$http', '$scope', 'signInService'];
	function SigninController($http, $scope, signInService){
		$scope.user = {email: 'user1@test.com', password: 'password'};
		$scope.signIn = function(){
			var email = $scope.user.email;
			var password = $scope.user.password;
			signInService.signIn(email, password);
		};
		
		$scope.signOut = function(){
			signInService.signOut();
		};
	}
})();
(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('signInController', SignInController);
	
	SignInController.$inject = ['$http', '$scope', 'signInService'];
	function SignInController($http, $scope, signInService){
		$scope.user = {email: 'user1@test.com', password: 'password'};
		$scope.signIn = function(){
			var email = $scope.user.email;
			var password = $scope.user.password;
			signInService.signIn(email, password);
		};
	}
})();
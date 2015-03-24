(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('signInController', SignInController)
	.controller('signOutController', SignOutController);
	
	SignInController.$inject = ['$scope', 'signInService'];
	function SignInController($scope, signInService){
		$scope.user = {email: 'user1@test.com', password: 'password'};
		$scope.signIn = function(){
			var email = $scope.user.email;
			var password = $scope.user.password;
			signInService.signIn(email, password);
		};
	}
	
	SignOutController.$inject = ['signInService'];
	function SignOutController(signInService){
		signInService.signOut();
	}
})();
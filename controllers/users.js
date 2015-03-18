(function() {
	'use strict';

	angular
	.module('app')
	.controller('usersController', UsersController)
	.controller('userController', UserController);

	UsersController.$inject = ['$scope', 'userService'];
	function UsersController($scope, userService) {
		userService.getUsers()
		.success(function(data){
			$scope.users = data.users;
		})
		.error(function(){
			console.log('error getting users');
		});
	}
	
	UserController.$inject = ['$scope', '$stateParams', 'userService'];
	function UserController($scope, $stateParams, userService) {
		userService.getUser($stateParams.id)
		.success(function(data){
			$scope.user = data;
		})
		.error(function(){
			console.log('error getting user');
		});
	}
})();
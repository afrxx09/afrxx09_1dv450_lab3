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
			setupPrevNext(data);
		})
		.error(function(){
			console.log('error getting users');
		});
		
		$scope.nextPage = function(){
			if($scope.nextDisabled != 'disabled'){
				$http.get($scope.nextURL)
				.success(function(data){
					$scope.places = data.places;
					setupPrevNext(data);
				});
			}
		};
		
		$scope.prevPage = function(){
			if($scope.prevDisabled != 'disabled'){
				$http.get($scope.prevURL)
				.success(function(data){
					$scope.places = data.places;
					setupPrevNext(data);
				});
			}
		};
		
		var setupPrevNext = function(data){
			$scope.prevDisabled = 'disabled';
			$scope.nextDisabled = 'disabled';
			if(data.prev){
				$scope.prevDisabled = '';
				$scope.prevURL = data.prev;
			}
			if(data.next){
				$scope.nextDisabled = '';
				$scope.nextURL = data.next;
			}
		}
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
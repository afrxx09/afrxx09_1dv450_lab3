(function() {
	'use strict';

	angular
	.module('app')
	.controller('profileController', ProfileController);

	ProfileController.$inject = ['$rootScope', '$scope', 'userService'];
	function ProfileController($rootScope, $scope, userService) {
		userService.getUser($rootScope.currentUser.id)
		.success(function(data){
			$scope.user = data;
		})
		.error(function(){
			console.log('error getting profile');
		});
	}
})();
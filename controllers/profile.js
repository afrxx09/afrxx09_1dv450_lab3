(function() {
	'use strict';

	angular
	.module('app')
	.controller('profileController', ProfileController);

	ProfileController.$inject = ['$rootScope', '$scope', 'userService', 'signInService', 'myMessages'];
	function ProfileController($rootScope, $scope, userService, signInService, myMessages) {
		userService.getUser($rootScope.currentUser.id)
		.success(function(data){
			$scope.user = data;
		})
		.error(function(){
			myMessages.error('Error getting profile');
		});
		
		$scope.signOut = function(){
			signInService.signOut();
		};
	}
})();
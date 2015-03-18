(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('signinController', SigninController);
	
	SigninController.$inject = ['$http', '$scope', 'CONST'];
	function SigninController($http, $scope, CONST){
		$scope.user = {};
		$scope.signIn = function(){
			$http.post(CONST.API_URL + 'authenticate', $scope.user)
			.success(function(data){
				console.log(data);
			})
			.error(function(err){
				console.log(err.error);
			});
		}
	}
})();
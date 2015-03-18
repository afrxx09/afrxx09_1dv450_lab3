(function(){
	'use strict';

	angular
	.module('app')
	.factory('userService', UserService);

	UserService.$inject = ['$http', 'CONST'];

	function UserService($http, CONST){
		return {
			getUsers: function(){
				return $http.get(CONST.API_URL + 'users');
			},
			getUser: function(id){
				return $http.get(CONST.API_URL + 'users/' + id);
			}
		};
	}
})();
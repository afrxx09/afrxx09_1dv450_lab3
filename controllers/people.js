(function() {
	'use strict';

	angular
	.module('app')
	.controller('peopleController',PeopleController);

	PeopleController.$inject = ['$scope', 'peopleService'];

	function PeopleController($scope, peopleService) {
		peopleService.getPeople()
		.success(function(data){
			console.log(data.users);
			$scope.people = data.users;
		})
		.error(function(){
			console.log('error getting people');
		});
	}
})();
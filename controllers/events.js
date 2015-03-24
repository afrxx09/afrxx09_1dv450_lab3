(function() {
	'use strict';

	angular
	.module('app')
	.controller('editEventController', EditEventController)
	.controller('deleteEventController', DeleteEventController);

	EditEventController.$inject = ['$scope', '$stateParams', 'eventService', 'myMessages'];
	function EditEventController($scope, $stateParams, eventService, myMessages){
		eventService.getEvent($stateParams.id)
		.success(function(data){
			$scope.event = data;
		})
		.error(function(){
			myMessages.error('Could not find Event.');
		});
	}
	
	DeleteEventController.$inject = ['$scope', '$state', '$stateParams', 'eventService', 'myMessages'];
	function DeleteEventController($scope, $state, $stateParams, eventService, myMessages){
		$scope.delete = function(){
			eventService.deleteEvent($stateParams.id)
			.success(function(){
				$state.go('profile');
				myMessages.success('Event Deleted');
			})
			.error(function(){
				myMessages.error('Could not find Event.');
			});
		};
	}
})();
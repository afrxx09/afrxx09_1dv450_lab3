(function() {
	'use strict';

	angular
	.module('app')
	.controller('newEventController', NewEventController)
	.controller('editEventController', EditEventController)
	.controller('deleteEventController', DeleteEventController);

	NewEventController.$inject = ['$scope', '$stateParams', '$state', 'eventService', 'myMessages', 'myGoogleMap'];
	function NewEventController($scope, $stateParams, $state, eventService, myMessages, myGoogleMap){
		myGoogleMap.enableDraggableMarker();
		$scope.event = {};
		$scope.create = function(){
			var pos = myGoogleMap.draggableMarker.getPosition();
			$scope.event.lat = pos.lat();
			$scope.event.lng = pos.lng();
			eventService.createEvent($scope.event)
			.success(function(data){
				myMessages.success('Event Created');
				$state.go('profile');
			})
			.error(function(err){
				myMessages.error('Could not save Event.');
			});
		}
		
		$scope.$on('$destroy', function(){
			myGoogleMap.disableDraggableMarker();
		});
	}
	
	EditEventController.$inject = ['$scope', '$stateParams', '$state', 'eventService', 'myMessages'];
	function EditEventController($scope, $stateParams, $state, eventService, myMessages){
		eventService.getEvent($stateParams.id)
		.success(function(data){
			$scope.event = data;
		})
		.error(function(){
			myMessages.error('Could not find Event.');
		});
		$scope.save = function(){
			eventService.updateEvent($scope.event)
			.success(function(data){
				myMessages.success('Event Saved');
				$state.go('profile');
			})
			.error(function(err){
				myMessages.error('Could not save Event.');
			});
		}
	}
	
	DeleteEventController.$inject = ['$scope', '$state', '$stateParams', 'eventService', 'myMessages'];
	function DeleteEventController($scope, $state, $stateParams, eventService, myMessages){
		$scope.delete = function(){
			eventService.deleteEvent($stateParams.id)
			.success(function(){
				myMessages.success('Event Deleted');
				$state.go('profile');
			})
			.error(function(){
				myMessages.error('Could not find Event.');
			});
		};
	}
})();
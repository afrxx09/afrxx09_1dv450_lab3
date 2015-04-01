(function() {
	'use strict';

	angular
	.module('app')
	.controller('eventController', EventController)
	.controller('newEventController', NewEventController)
	.controller('editEventController', EditEventController)
	.controller('deleteEventController', DeleteEventController);
	
	EventController.$inject = ['$rootScope', '$scope', '$stateParams', 'eventService', 'myMessages', 'myGoogleMap'];
	function EventController($rootScope, $scope, $stateParams, eventService, myMessages, myGoogleMap){
		$scope.event = {};
		eventService.getEvent($stateParams.id)
		.success(function(data){
			$scope.event = data;
			myGoogleMap.map.setZoom(15);
			myGoogleMap.map.setCenter({lat: parseFloat($scope.event.position.lat), lng: parseFloat($scope.event.position.lng)});
			$rootScope.currentStateTitle = (data.place) ? data.place.name : '';
			myGoogleMap.addMarker($scope.event.position.lat, $scope.event.position.lng);
			myGoogleMap.placeMarkers();
		})
		.error(function(){
			myMessages.error('Could not find Event.');
		});
	}
	
	NewEventController.$inject = ['$scope', '$stateParams', '$state', 'eventService', 'myMessages', 'myGoogleMap'];
	function NewEventController($scope, $stateParams, $state, eventService, myMessages, myGoogleMap){
		$scope.event = {};
		myGoogleMap.map.setZoom(14);
		myGoogleMap.draggable = new google.maps.Marker({
		    position: myGoogleMap.map.getCenter(),
		    map: myGoogleMap.map,
		    draggable:true
		});
		$scope.create = function(){
			var pos = myGoogleMap.draggable.getPosition();
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
			myGoogleMap.draggable.setMap(null);
			myGoogleMap.draggable = null;
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
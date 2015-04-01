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
	
	UserController.$inject = ['$rootScope', '$scope', '$stateParams', 'userService', 'eventService', 'myGoogleMap'];
	function UserController($rootScope, $scope, $stateParams, userService, eventService, myGoogleMap) {
		userService.getUser($stateParams.id)
		.success(function(data){
			$scope.user = data;
			$rootScope.currentStateTitle = 'Events by: ' + $scope.user.first_name;
			myGoogleMap.map.setZoom(8);
			eventService.getEventsByUserId($scope.user.id)
			.success(function(data){
				$scope.events = data.events;
				for(var i = 0; i < $scope.events.length; i++){
					myGoogleMap.addMarker($scope.events[i].position.lat, $scope.events[i].position.lng);
					$scope.events[i].marker = myGoogleMap.markers[i];
				}
				myGoogleMap.placeMarkers();
			})
			.error(function(){
				myMessages.error('Error getting events.');
			});
		})
		.error(function(){
			console.log('error getting user');
		});
		
		$scope.showEvent = function(index){
			$scope.event = $scope.events[index];
			myGoogleMap.map.setCenter({lat: parseFloat($scope.event.position.lat), lng: parseFloat($scope.event.position.lng)});
			myGoogleMap.map.setZoom(12);
			
		}
		$scope.$on('$destroy', function(){
			myGoogleMap.clearMarkers();
		});
	}
})();
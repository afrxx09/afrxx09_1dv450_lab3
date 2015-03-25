(function(){
	'use strict';

	angular
	.module('app')
	.factory('eventService', EventService);

	EventService.$inject = ['$http', 'CONST'];

	function EventService($http, CONST){
		return {
			getEvents: function(){
				return $http.get(CONST.API_URL + 'events');
			},
			getEvent: function(id){
				return $http.get(CONST.API_URL + 'events/' + id);
			},
			getNearbyEvents: function(lat, lng){
				return $http.get(CONST.API_URL + 'events/nearby?lat=' + lat + '&lng=' + lng + '&radius=10');
			},
			deleteEvent: function(id){
				return $http.delete(CONST.API_URL + 'events/' + id);
			},
			updateEvent : function(event){
				return $http.put(CONST.API_URL + 'events/' + event.id, event);
			},
			createEvent: function(event){
				return $http.post(CONST.API_URL + 'events/', event);
			}
		};
	}
})();
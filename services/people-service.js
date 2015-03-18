(function(){
	'use strict';

	angular
	.module('app')
	.factory('peopleService', PeopleService);

	PeopleService.$inject = ['$http', '$resource'];

	function PeopleService($http, $resource){
		
		$http.defaults.headers.common = {
            'X-ApiKey': '524c94faf385b814ce22d7d83b73cbd3',
        };
		return {
			getPeople : function(){
				return $http.get('http://localhost:3000/api/v2/users');
			}
		};
	}
})();
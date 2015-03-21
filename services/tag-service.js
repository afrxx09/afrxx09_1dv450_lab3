(function(){
	'use strict';

	angular
	.module('app')
	.factory('tagService', TagService);

	TagService.$inject = ['$http', 'CONST'];

	function TagService($http, CONST){
		return {
			getTags: function(){
				return $http.get(CONST.API_URL + 'tags');
			},
			getTag: function(id){
				return $http.get(CONST.API_URL + 'tags/' + id);
			}
		};
	}
})();
(function(){
	'use strict';

	angular
	.module('serviceModule',[])
	.factory('myService', MyService);

	MyService.$inject = [];

	function MyService(){
		var myPrivateMethod = function(){
			return 'private method';
		};
		
		return {
			myMethod : function(){
				return 'public method';
			}
		};
	}
})();
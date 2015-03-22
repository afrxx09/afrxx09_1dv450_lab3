(function(){
	'use strict';

	angular
	.module('messagesDirective', [])
	.factory('myMessages', MyMessagesFactory)
	.directive('messages', MyMessagesDirective);
	
	MyMessagesFactory.$inject = [];
	function MyMessagesFactory(){
		return {
			type: null,
			content: null,
			success: function(content){
				this.type = 'success',
				this.content = content
			},
			warning: function(content){
				this.type = 'warning',
				this.content = content
			},
			error: function(content){
				this.type = 'error',
				this.content = content
			}
		};
	}
	
	MyMessagesDirective.$inject = [];
	function MyMessagesDirective(){
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			template: '<div id="my-messages" class="{{factory.type}}" data-ng-show="show" data-ng-click="hide()"><p>{{factory.content}}</p></div>',
			controller: MyMessagesController
		};
		
		MyMessagesController.$inject = ['$scope', '$element', '$attrs', '$timeout', 'myMessages'];

		function MyMessagesController($scope, $element, $attrs, $timeout, myMessages){
			$scope.show = false;
			$scope.factory = myMessages;
			$scope.$watch('factory.content', toggledisplay)
			
			var timer;
			$scope.hide = function(){
				$scope.show = false;
				$timeout.cancel(timer);
			};
			
			function toggledisplay(){
                $scope.show = !!($scope.factory.content);
                timer = $timeout($scope.hide, 5000);
            }
            
            $scope.$on('$destroy', function(e){
				$timeout.cancel(timer);
			});
		}
	}
})();
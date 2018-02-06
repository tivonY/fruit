(function() {
    var module = angular.module("starter.services", ['ngDialog'])
    .factory("indexfactory", ['$q','$http','$cacheFactory', function($q,$http,$cacheFactory){
    	return{
    		resizePager:function(rightWidth){

			}
    	}
    }]);

	module.service("createNewsService", ['$q', 'ngDialog', function($q,ngDialog){

	}]);



})()

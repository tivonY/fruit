var pushService = {
	unifiedPushAll : function(http,$q,msg){
		var deferred = $q.defer();
		http.post('/push/unified/all',{'msg':msg}).success(function(data) {
			deferred.resolve(data);
   		}).error(function(data, status, headers, config){
   			deferred.reject(data, status, headers, config);
   		}) 		
   		return deferred.promise;
	},

	unifiedPushByChannels :function(http,$q,msg,channels){
		var deferred = $q.defer();
		//console.log(Channels);
		http.post('/push/unified/Channels',{'msg':msg,'channels':channels}).success(function(data) {
      		//console.log(data);
      		deferred.resolve(data);
   		}).error(function(data, status, headers, config){
   			//console.log(data);
   			deferred.reject(data, status, headers, config);
   			//cb.error && cb.error(data, status, headers, config);
   		})

   		return deferred.promise;
	},
	baiduPushAll:function(http,msg){
		http.post('/push/baidu/all',{'msg':msg}).success(function(data) {
      		console.log(data);
   		})
	},
	baiduPushByTag:function(http,tag,msg){
		console.log(msg);
		http.post('/push/baidu/tag',{'msg':msg,'tag':tag}).success(function(data) {
      		console.log(data);
   		}).error(function(data, status, headers, config){
   			console.log(data);
   		})
	}
}
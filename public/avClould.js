var avClould = {
	setPublished:function($q,todoParam){
		var deferred = $q.defer();

		//deferred.notify('');

		var Todo = AV.Object.extend("CDCNews");
		var todo = new Todo();

		todo.set("objectId", todoParam.objectId);
		todo.set("done", todoParam.done);
		todo.set("published", true);
		/*todo.set("done",false);
		todo.set("published", false);*/
		todo.save(null,{
			success:function(data){
				deferred.resolve(data);
			},
			error:function(data,error){
				deferred.reject(error);
			}
		});

		return deferred.promise;
	}
}
(function() {

    var module = angular.module("starter.services", ['ngDialog'])

    .factory("indexfactory", ['$q','$http','$cacheFactory', function($q,$http,$cacheFactory){
    	return{
    		resizePager:function(rightWidth){
    			var winWidth=document.documentElement.clientWidth;
    			var winHeight=document.documentElement.clientHeight;
    			var rightW=document.getElementById(rightWidth);
    			if(winWidth<=1000){
    				rightW.style.width=750+"px";    				
    			}
    			if(winHeight<=300){
    				rightW.style.width=500+"px"; 
    			}
				 	rightW.style.width = winWidth-250+"px";
				 	rightW.style.height = winHeight-60+"px";

			}
    	}
    }]).factory('pushService',[function(){
    	return	pushService;
    }])

    .factory("queryClassFactory", ['$q','$http','$cacheFactory','ngDialog', function($q,$http,$cacheFactory,ngDialog){
  		return{

  			queryClasslist:function(objextend){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
	        	var query = new AV.Query(Todo);
	        	query.find({
	            	success: function(results) {
                		var newslist=JSON.parse(JSON.stringify(results));
                		return deferred.resolve(newslist);	                			                        
                    }
	            })

	            return deferred.promise;
			},

		     openNotify:function (alert) {
	            var dialog = ngDialog.open({
	                template:
	                    "<p>"+alert+"</p>" +
	                    '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">Close</button></div>',
	                plain: true
	            });
	            dialog.closePromise.then(function (data) {
	                console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
	            });
	        },

	        openTimed:function (alarm) {
			    var dialog = ngDialog.open({
			        template: '<p>'+alarm+'</p>',
			        plain: true,
			        closeByDocument: false,
			        closeByEscape: false
			    });
			    setTimeout(function () {
			        dialog.close();
			    }, 2000);
			},
			updatePushTime : function(id){
				var deferred = $q.defer();
				var Todo = AV.Object.extend('CDCNews');
				var query = new AV.Query(Todo);
				query.get(id, {
					success: function(results) {
						results.set("updateTime",new Date().getTime());
						results.save();
						return deferred.resolve("update");
					}
				});
				return deferred.promise;
			},
			queryaNewsType:function(id){
				var deferred = $q.defer();
				var Todo = AV.Object.extend('CDCNewsType');
				var query = new AV.Query(Todo);
				query.get(id, {
					success: function(results) {
						var group=JSON.parse(JSON.stringify(results));
						return deferred.resolve(group);
					}
				});
				return deferred.promise;
			},

			querylists:function(){

				var deferred = $q.defer();
				
				// select include post,include author from Comment
	            // var sql_user="select include CDCVote.voteOption, * from CDCNews where objectId=55e5704900b04a630000d71a";
	            var News = AV.Object.extend("CDCNews");
			    var vote = AV.Object.extend("CDCVote");
			    var detail = AV.Object.extend("CDCVoteDetail");
			    var newsQuery = new AV.Query(News);
				newsQuery.equalTo("objectId", "55e5704900b04a630000d71a");
				var voteQuery = new AV.Query(vote);
				voteQuery.matchesKeyInQuery("voteOption","voteType", "objectId", newsQuery);
				voteQuery.find({
			        success: function(results) {
			        	var group=JSON.parse(JSON.stringify(result));
		          		return deferred.resolve(group);
			        }
		    	});

			    // AV.Query.doCloudQuery(sql_user, {
		     //      	success: function(result){
		     //      		var group=JSON.parse(JSON.stringify(result));
		     //      		return deferred.resolve(group);	
		     //      	}
		     //  	});        
	            return deferred.promise;

			},

			
			querynewslist:function(objextend){
//                var Test = AV.Object.extend("Test");
				var deferred = $q.defer();


                var file = AV.File.withURL('test.jpg', 'images/pepole1.png');

                file.save().then(function() {
                    // The file has been saved to AV.
                }, function(error) {
                    // The file either could not be read, or could not be saved to AV.
                });
				return deferred.promise;
			},
			
			cancelpush:function(objextend,todos){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
	            var todo = new Todo();
	            var query = new AV.Query(Todo);
	            query.get(todos.objectId, {
            		success: function(results) {
            			results.set("published",false);            			
            			results.save();
            			return deferred.resolve("update");

            		}
            	});
	            return deferred.promise;
			},

			fuzzysearch:function(searchCon,typev){
				var deferred = $q.defer();
				var sql="";
				if(searchCon==""||searchCon==undefined){
					if(typev=="All"){
						sql="select * from CDCNews";
					}else{
						sql="select * from CDCNews where newsTypeid='"+typev+"' ";
					}					
					
				}else{
					if(typev=="All"){
						sql="select * from CDCNews where title like '"+searchCon+"%'";	
					}else{
						sql="select * from CDCNews where title like '"+searchCon+"%' and newsTypeid='"+typev+"'";
					}					
					
				}

				
				AV.Query.doCloudQuery(sql, {
					success: function(result){						
						var obj=JSON.parse(JSON.stringify(result));
	          			return deferred.resolve(obj);						
					}
				});
				return deferred.promise;	
			},
			querygroup:function(){

				var deferred = $q.defer();
				var Todo = AV.Object.extend("CDCGroup");
				var query = new AV.Query(Todo);
				query.exists("objectId").find({
					success: function(results) {
						return deferred.resolve(JSON.parse(JSON.stringify(results)));
					}
				});
				return deferred.promise;
			},
			queryuser:function(){

				var deferred = $q.defer();
				var Todo = AV.Object.extend("CDCUser");
				var query = new AV.Query(Todo);
				query.exists("objectId").find({
					success: function(results) {
						return deferred.resolve(JSON.parse(JSON.stringify(results)));
					}
				});
				return deferred.promise;
			},
			querygrouptag:function(){
				var deferred = $q.defer();
				var Todo = AV.Object.extend("CDCgrouptag");
				var query = new AV.Query(Todo);
				query.exists("objectId").find({
					success: function(results) {
						return deferred.resolve(JSON.parse(JSON.stringify(results)));
					}
				});
				return deferred.promise;
			},
			querychannelID:function(parm){
				var deferred = $q.defer();
				var list="";
	            for(var i=0;i<parm.grouptagid.length;i++){
	            	if(i==0){
	            		list="\'"+parm.grouptagid[i]+"\'";

	            	}else{
	            		list=list+","+"\'"+parm.grouptagid[i]+"\'";
	            	}
	            }
	            var sql_user="select * from Channel where eid in (select Name from CDCUser where objectId in (select UserId from CDCgrouptag where GroupId in ("+list+")))";
			    AV.Query.doCloudQuery(sql_user, {
		          	success: function(result){
		          		var group=JSON.parse(JSON.stringify(result.results));
		          		return deferred.resolve(group);	
		          	}
		      	});        
	            return deferred.promise;				
			},

			addClassType:function(objextend,typeName){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
	            var todo = new Todo();
	            var query = new AV.Query(Todo);
	            query.equalTo("Name", typeName);
	            query.find({
	            	success: function(results) {
	            		if(results.length>0){
	            			alert("This name already exists, please re-enter");
                            return false;
	            		}else{
	            			todo.set("Name", typeName);
	            			todo.save(null, {
	            			 	success: function(result) { 
                                    var newslist=JSON.parse(JSON.stringify(result));
            						return deferred.resolve(newslist);	
                                }
	            			});
	            		}	            		
	            	}
	            });

	            return deferred.promise;
			},
			queryUserObj:function(param){
				var deferred = $q.defer();
				var list="";

	            for(var i=0;i<param.length;i++){
	            	if(i==0){
	            		list="\'"+param[i]+"\'";

	            	}else{
	            		list=list+","+"\'"+param[i]+"\'";
	            	}
	            }
	            var sql_user="select * from Channel where eid in ("+list+")";
	            AV.Query.doCloudQuery(sql_user, {
		          	success: function(result){
		          		var data=JSON.parse(JSON.stringify(result.results));
		          		return deferred.resolve(data);	
		          	}
	          	});
	            return deferred.promise;
			},

			querynewstype:function(){
				var deferred = $q.defer();
				var Todo = AV.Object.extend("CDCNewsType");
	            var query = new AV.Query(Todo);
                query.exists("objectId").find({
	            	success: function(results) {
						return deferred.resolve(JSON.parse(JSON.stringify(results)));
	            	}

                });
				return deferred.promise;
			},

			queryUser:function(objextend,typeName,email){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
	            var todo = new Todo();
	            var query = new AV.Query(Todo);
	            query.equalTo("Name", typeName);
                query.find({
	            	success: function(results) {
	            		if(results.length>0){
	            			// var 
                            var queryResult=results[0]["id"];
    						return deferred.resolve(queryResult);	
	            		}else{
	            			todo.set("Name", typeName);
	            			todo.set("email", email);
	            			todo.save(null, {
	            			 	success: function(result) { 
                                    var queryObj=result.id;
            						return deferred.resolve(queryObj);	
                                }
	            			});            				
	            		}	            		
	            	}

                });

                return deferred.promise;
			},
			querygroupObj:function(objextend,param){
				var deferred = $q.defer();
				var list="";
	            for(var i=0;i<param.length;i++){
	            	if(i==0){
	            		list="\'"+param[i]+"\'";

	            	}else{
	            		list=list+","+"\'"+param[i]+"\'";
	            	}
	            }
	            var sql_user="select Name from CDCGroup where objectId in ("+list+")";
	            AV.Query.doCloudQuery(sql_user, {
		          	success: function(results){
		          		var group=JSON.parse(JSON.stringify(results));
		          		return deferred.resolve(group);	
		          	}
	          	});
	            return deferred.promise;
			},
			querygroupname:function(objextend,param){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
	        	var query = new AV.Query(Todo);
	        	query.get(param, {         
	                success: function(results) {
	                	var aNews=JSON.parse(JSON.stringify(results));

	                	return deferred.resolve(aNews);
	                }
	            })
	            return deferred.promise;
			},	

			updatefinish:function(objextend,param){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
	            var todo = new Todo();
	            var query = new AV.Query(Todo);
				todo.set("published", true);
                todo.save(null, {
                    success: function(result) {			                                
                        console.log('Push done');
                        return deferred.resolve("true");
                    }
                });                

                return deferred.promise;
			},			

			deleteData:function(dataList,objextend){
				var deferred = $q.defer();
				var Todo = AV.Object.extend(objextend);
            	var query = new AV.Query(Todo);
            	query.get(dataList.objectId, {           
	              	success: function(results) {
	              		results.destroy({
	              			success: function(result) {
	              				return deferred.resolve(objextend);
	              			}
	              		});
	              	}
          		})
          		return deferred.promise;
      		},

			deleteAllData:function(dataList,objextend){
				var deferred = $q.defer();
				var list="",len=0;
	            for(var i=0;i<dataList.length;i++){
	            	if(i==0){
	            		list="\'"+dataList[i].objectId+"\'";

	            	}else{
	            		list=list+","+"\'"+dataList[i].objectId+"\'";
	            	}
	            }
	            var sql="select * from "+objextend+" where objectId in ("+list+")";

				AV.Query.doCloudQuery(sql, {
				  	success: function(result){
				  		var news=result.results;
				  		AV.Object.destroyAll(news,{
				  			success: function(result){
				  				return deferred.resolve(objextend);
				  			}
				  		});
				  	}
				});	

          		return deferred.promise;
      		},


      		baiduPushByTag:function(andriod,msg,ios){	
      			var deferred = $q.defer();	
      			var taglength=[],isotag=[],serve="";
      			taglength=andriod.toString();
      			isotag=ios.toString(); 

				function pushtag(server){
					$http.post(serve,{"msg":msg,"channels":taglength}).success(function(data) {	
					console.log(data);
					//deferred.resolve(data);
					if(serve=="../push/unified/channels"||ios.length==0){
						deferred.resolve('push');
					}			      		 

					}).error(function(data, status, headers, config){   			
						console.log(data);
						deferred.reject('test');
						
					})
				}
     			
      			if(taglength.length==0&&isotag.length==0){
      				deferred.resolve('no device');
      			}else{

      				console.log(taglength);
      				console.log("infomsg"+msg);
      				if(andriod.length>0){      					
      					serve='../push/baidu/channels';
      					pushtag(serve);
      				}

      				if(ios.length>0){
      					serve='../push/unified/channels';
      					taglength=isotag;
      					pushtag(serve);
      				};

       			}

		   		return deferred.promise;
			},

      		getCurrentTime:function(){

      			Date.prototype.Format = function (fmt) { //author: meizz 
		            var o = {
		                "M+": this.getMonth() + 1, //月份 
		                "d+": this.getDate(), //日 
		                "h+": this.getHours(), //小时 
		                "m+": this.getMinutes(), //分 
		                "s+": this.getSeconds(), //秒 
		                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		                "S": this.getMilliseconds() //毫秒 
		            };
		            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		            for (var k in o)
		            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		            return fmt;
		        }
		        var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
		        return time2;
      		},

      		todopush:function(objextend,param,currentTime){
      			var pushDate=new Date(currentTime);
      			var deferred = $q.defer();
  				var Todo = AV.Object.extend(objextend);
       			var todo = new Todo();
       			var status="";
       			var query = new AV.Query(Todo);
		        	//var _authedUser = AV.User.current();
		            //if (_authedUser == null) {
		            // TODO: sign up/in with phone number & sms
		            //alert('You have to sign in to push you contents');
		            //} else {
        		if(param.objectId!=""){
		            	query.get(param.objectId, {
		            		success: function(results) {
		            			if(param.published==false){
		            				results.set("updateTime",pushDate);
		            				results.set("published",true);
		            				status="new";
		            			}else{
		            				results.set("published",false);
		            				status="update";
		            			}		            			
		            			results.save();
		            			return deferred.resolve(status);
		            		}
		            	});
		            }

		        return deferred.promise;

      		}			
		}
     }]);

	module.service("createNewsService", ['$q', 'ngDialog', function($q,ngDialog){

		this.queryClasslist=function(objextend){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
        	var query = new AV.Query(Todo);
        	query.find({
            	success: function(results) {
                		var newslist=JSON.parse(JSON.stringify(results));
                		return deferred.resolve(newslist);	                			                        
                    }
            })

            return deferred.promise;
		};

		this.getCurrentTime=function(){
			
  			Date.prototype.Format = function (fmt) { //author: meizz 
	            var o = {
	                "M+": this.getMonth() + 1, //月份 
	                "d+": this.getDate(), //日 
	                "h+": this.getHours(), //小时 
	                "m+": this.getMinutes(), //分 
	                "s+": this.getSeconds(), //秒 
	                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	                "S": this.getMilliseconds() //毫秒 
	            };
	            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	            for (var k in o)
	            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	            return fmt;
	        }
	        var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
	        // time2=format(time2);
	        return time2;
  		};


		this.queryallgroup=function(obj,martchval){
			var sql="";
			var deferred = $q.defer();
			if(martchval==undefined||martchval==""){
				sql="select * from "+obj+"";
			}else{
				sql="select * from "+obj+" where Name like '"+martchval+"%'";
			}			
			AV.Query.doCloudQuery(sql, {
				success: function(result){

					var type=JSON.parse(JSON.stringify(result.results));
          			return deferred.resolve(type);
				}
			});
			return deferred.promise;
		};

		this.openNotify=function (alert) {
		    var dialog = ngDialog.open({
		        template:
		            "<p>"+alert+"</p>" +
		            '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">Close</button></div>',
		        plain: true
		    });
		    dialog.closePromise.then(function (data) {
		        console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
		    });
		},

		this.openTimed=function (alarm) {
		    var dialog = ngDialog.open({
		        template: '<p>'+alarm+'</p>',
		        plain: true,
		        closeByDocument: false,
		        closeByEscape: false
		    });
		    setTimeout(function () {
		        dialog.close();
		    }, 2000);
		},

		this.queryObj=function(objextend,param){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
        	var query = new AV.Query(Todo);
        	query.get(param, {           
                success: function(results) {
                	var aNews=JSON.parse(JSON.stringify(results));
                	return deferred.resolve(aNews);
                }
            })
            return deferred.promise;
		};


		this.queryGroupObj=function(param){
			var deferred = $q.defer();
		    var list="";
            for(var i=0;i<param.length;i++){
            	if(i==0){
            		list="\'"+param[i]+"\'";

            	}else{
            		list=list+","+"\'"+param[i]+"\'";
            	}
            }
            var sql_user="select * from CDCGroup where objectId in ("+list+")";
            AV.Query.doCloudQuery(sql_user, {
	          	success: function(result){
	          		var group=JSON.parse(JSON.stringify(result.results));
	          		return deferred.resolve(group);	
	          	}
          	});
            return deferred.promise;
		};

		this.querySendUser=function(obj,lists){
			var deferred = $q.defer();
			var list="";
			for(var i=0;i<lists.length;i++){
            	if(i==0){
            		list="\'"+lists[i]+"\'";

            	}else{
            		list=list+","+"\'"+lists[i]+"\'";
            	}
            }
            var sql_user="select * from "+obj+" where Name in ("+list+")";
             AV.Query.doCloudQuery(sql_user, {
	          	success: function(result){
	          		var group=JSON.parse(JSON.stringify(result.results));
	          		return deferred.resolve(group);	
	          	}
          	});
            return deferred.promise;

		};

		this.queryVoteOption=function(vote){
			var deferred = $q.defer();
			var Todo = AV.Object.extend("CDCVote");
            var todo = new Todo();
            var query = new AV.Query(Todo); 
            query.equalTo("voteNewsId", vote);
			query.find({
				success: function(results) {
					var Res=JSON.parse(JSON.stringify(results));
					return deferred.resolve(Res);					
				}
			});
			return deferred.promise;
		};

		this.voteOptionSave=function(vote){
			var deferred = $q.defer();
			var Todo = AV.Object.extend("CDCVote");
            var todo = new Todo();
            var startTime=new Date(vote.startTime);
            var endTime=new Date(vote.endTime);
				
            var voteNewsId=vote.newsId;
            var voteType=vote.voteType;
            var voteOption=vote.voteOptions;
            var query = new AV.Query(Todo); 
            query.equalTo("voteNewsId", voteNewsId);
			query.find({
            	success: function(results) {
            		if(results.length>0){
            			results[0].set("voteNewsId",voteNewsId);
            			results[0].set("startTime",startTime);
            			results[0].set("endTime",endTime);
            			results[0].set("voteType",voteType);
            			results[0].set("voteOption",voteOption);            			
            			results[0].save();
            			return deferred.resolve();
            		}else{
            			todo.set("startTime",startTime);
    					todo.set("endTime",endTime);
            			todo.set("voteNewsId",voteNewsId);
		    			todo.set("voteType",voteType);
		    			todo.set("voteOption",voteOption);		    			
		            	todo.save(null, {
		    			 	success: function(res) { 
		    			 		var groupRes=JSON.parse(JSON.stringify(res));
								return deferred.resolve(groupRes);                               
						 	}
		    			});

            		}
            	}
            })
			return deferred.promise;

		};

		this.createNews=function(objextend,newsList,currentTime){
			var currentTimeDate=new Date(currentTime);
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
            var todo = new Todo();
            var query = new AV.Query(Todo);
            //var newstypeid=newsList.newstypeid;
            var newstitle=newsList.productName;
            var description=newsList.description;
            var state=newsList.state;
            var rushStatus=newsList.rushStatus;
            
            //var grouptagid=newsList.grouptagid;
           // var sendperson=newsList.sendPerson;
            //var published=newsList.published;
            var coverImage=newsList.coverImage;
            if(newsList.objectId!=""){
            	query.get(newsList.objectId, {
            		success: function(results) {
            			//results.set("newsTypeid",newstypeid);
            			results.set("productName",newsList.productName);
            			// results.set("image",images);
            			results.set("coverImage",coverImage);    					
						results.set("description",description);
            			results.set("state",state);
            			results.set("rushStatus",rushStatus);
            			results.set("coverImage",coverImage);
            			results.save();
            			return deferred.resolve(newsList);
            		}
            	});
            }else{
    			todo.set("productName",newstitle);
    			todo.set("description",description);
    			todo.set("state",state);
    			todo.set("coverImage",coverImage);    			
    			todo.set("rushStatus",rushStatus);
    			todo.set("updateTime",currentTimeDate);
            	todo.save(null, {
    			 	success: function(res) { 
    			 		var groupRes=JSON.parse(JSON.stringify(res));
						return deferred.resolve(groupRes);                               
				 	}
    			});
            }
            return deferred.promise;
            
		};

		this.addgrouptag=function(objextend,objname,newstagid){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
            var todo = new Todo();
            var query = new AV.Query(Todo);           
			
			if(newstagid!=""){

	           query.get(newstagid, {
            		success: function(results) {
            			results.set("grouptag",objname);
            			results.save();
            			var updatetag=JSON.parse(JSON.stringify(results));
            			return deferred.resolve(updatetag);
            		}
            	});
					
			}else{
				
				 todo.set("grouptag",objname);
				 todo.save(null, {
				 	success: function(result) { 
	                    var grouptags=JSON.parse(JSON.stringify(result));
						return deferred.resolve(grouptags);	
	                }
				});
			}
			return deferred.promise;
		};


	}]);

	module.service("createTypeService", ['$q','$http','ngDialog', function($q,$http,ngDialog){		


		 this.groupParm=true;
	     this.openNotify = function (alert) {
            var dialog = ngDialog.open({
                template:
                    "<p>"+alert+"</p>" +
                    '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">Close</button></div>',
                plain: true
            });
            dialog.closePromise.then(function (data) {
                console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
            });
        };

        this.openTimed = function (alarm) {
		    var dialog = ngDialog.open({
		        template: '<p>'+alarm+'</p>',
		        plain: true,
		        closeByDocument: false,
		        closeByEscape: false
		    });
		    setTimeout(function () {
		        dialog.close();
		    }, 2000);
		};

		//save a type
		this.saveAType=function(objextend,name){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
			var todo = new Todo();
        	var query = new AV.Query(Todo);
        	query.equalTo("Name", name.newsTypeVal);
			query.find({
            	success: function(results) {
					if(results.length>0){
						return deferred.resolve("exist");
					}else{
						todo.set("Name",name.newsTypeVal);
						todo.set("icon",name.icon);
						todo.save(null, {
						 	success: function(result) { 
			                    var obj=JSON.parse(JSON.stringify(result));
								return deferred.resolve(obj);	
			                }
						});
					}	
				}
			});
        	

			return deferred.promise;
		};

		this.existobj=function(obj,id){
			var exst="",list="";
			var deferred = $q.defer();
			var Todo = AV.Object.extend("CDCNews");
			var todo = new Todo();
			var query = new AV.Query(Todo);
			if(obj=="CDCGroup"){
				exst="grouptagid";
				// query.equalTo(exst, id);
				list="\'"+id+"\'";
				//匹配分组id
				 var sql_user="select * from CDCNews where "+exst+" in ("+list+")";
	            AV.Query.doCloudQuery(sql_user, {
		          	success: function(result){
		          		var Member=JSON.parse(JSON.stringify(result.results));
		          		return deferred.resolve(Member);	
		          	}
	          	});

			}else{

				if(obj=="CDCNewsType"){
					exst="newsTypeid";
				}else if(obj=="CDCkeyword"){
					exst="keywordid";
				}
																
				query.equalTo(exst, id);
				query.find({
	            	success: function(results) {
	            		return deferred.resolve(results);
	            	}
	            });
			}
			 


            return deferred.promise;
		}


		//del member
		this.delAgroupmember=function(objextend,groupid,memberid){
			var deferred = $q.defer();
			var sql="select * from CDCgrouptag where GroupId='"+groupid+"' and UserId='"+memberid+"'";			
        	AV.Query.doCloudQuery(sql, {
				success: function(res){
					var val=res.results[0];
              		val.destroy({
              			success: function(result) {
              				return deferred.resolve(result);
              			}
              		});
				}
			});
			
            return deferred.promise;
		};

		//query all type
		this.marchMember=function(objextend,param){
			var deferred = $q.defer();
			var sql="select * from CDCUser where objectId in (select UserId from CDCgrouptag where GroupId='"+param.objectId+"')";			
        	AV.Query.doCloudQuery(sql, {
				success: function(result){
					var group=JSON.parse(JSON.stringify(result.results));
	          		return deferred.resolve(group);
				}
			});

            return deferred.promise;
		};

		this.saveAgroupmember=function(objextend,groupid,memberid){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
            var todo = new Todo();
			todo.set("UserId",memberid);
			todo.set("GroupId",groupid);
			todo.save(null, {
			 	success: function(result) { 
                    var grouptags=JSON.parse(JSON.stringify(result));
					return deferred.resolve(grouptags);	
                }
			});
			return deferred.promise;
		};

		//query all type
		this.querytype=function(objextend,typename){
			var deferred = $q.defer();
			var sql="select * from "+objextend+" where Name like '"+typename+"%'";
			if(typename==undefined||typename==""){
				sql="select * from "+objextend+"";
			}
        	AV.Query.doCloudQuery(sql, {
				success: function(result){
					var group=JSON.parse(JSON.stringify(result.results));
	          		return deferred.resolve(group);
				}
			});
            return deferred.promise;
		};

		//delete type
		this.deleteSelectType=function(objextend,param){

			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
        	var query = new AV.Query(Todo);
        	query.get(param.objectId, {           
              	success: function(results) {
              		results.destroy({
              			success: function(result) {
              				return deferred.resolve("del");
              			}
              		});
              	}
      		})
      		return deferred.promise;
		};


		//check group name
		this.checkGroupName=function(grouname){
			var deferred = $q.defer();
			var sql="select * from CDCGroup where Name='"+grouname+"'";
			AV.Query.doCloudQuery(sql, {
				success: function(result){

					var obj=JSON.parse(JSON.stringify(result.results));
          			return deferred.resolve(obj);
					
				}
			});
			return deferred.promise;
		};
		//match group
		this.groupMarchVal=function(groupname){
			var deferred = $q.defer();
			var sql="select * from CDCGroup where Name like '"+groupname+"%'";
			AV.Query.doCloudQuery(sql, {
				success: function(result){
					var group=JSON.parse(JSON.stringify(result));
	          		return deferred.resolve(group);
				}
			});

			return deferred.promise;
		};

		//save group member
		this.saveGroupmember=function(objextend,groupId,userId){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
			var todo = new Todo();
			var sql="select * from "+objextend+" where UserId='"+userId+"' and GroupId='"+groupId+"'";
			AV.Query.doCloudQuery(sql, {
				success: function(result){					
					var group=JSON.parse(JSON.stringify(result));
					if(group.results.length>0){
						return deferred.resolve("exist");
					}else{
						todo.set("UserId",userId);
						todo.set("GroupId",groupId);
						todo.save(null, {
						 	success: function(result) { 
			                    var obj=JSON.parse(JSON.stringify(result));
								return deferred.resolve("true");	
			                }
						});
					}
	          		
				}
			});

			return deferred.promise;
		}

		//query member
		this.queryGroupMember=function(groupname){
			var deferred = $q.defer();
 			var sql="select UserId from CDCgrouptag where GroupId in (select objectId from CDCGroup where Name='"+groupname+"')";
 			
 			AV.Query.doCloudQuery(sql, {
	          success: function(result){                
	          	
	            var UserIdlist=JSON.parse(JSON.stringify(result));
	            var list="";
	            for(var i=0;i<UserIdlist.results.length;i++){
	            	if(i==0){
	            		list="\'"+UserIdlist.results[i].UserId+"\'";

	            	}else{
	            		list=list+","+"\'"+UserIdlist.results[i].UserId+"\'";
	            	}
	            }
	            var sql_user="select Name from CDCUser where objectId in ("+list+")";
	            AV.Query.doCloudQuery(sql_user, {
		          	success: function(results){
		          		var Member=JSON.parse(JSON.stringify(results));
		          		return deferred.resolve(Member);	
		          	}
	          	});
	           
	          },
	          error: function(error){
	            //查询失败，查看 error
	            console.dir(error);
	          }
	        });

	        return deferred.promise;
		}
		
		this.queryAuser=function(objextend,param){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
        	var query = new AV.Query(Todo);
        	query.get(param, {
            	success: function(results) {
                		var newslist=JSON.parse(JSON.stringify(results));
                		return deferred.resolve(newslist);	                			                        
                    }
            })

            return deferred.promise;
		};

		
		this.querygrouptag=function(objextend,groupid){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
        	var query = new AV.Query(Todo);
			query.equalTo("GroupId", groupid);
			query.find({
            	success: function(results) {
					var memberlist=JSON.parse(JSON.stringify(results));
        			return deferred.resolve(memberlist);	
				}
			});
			return deferred.promise;	
		};

		this.addType=function(objextend,typeName){
			if(typeName==""){
				alert("Added value can not be empty!");
				return false;
			}
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
            var todo = new Todo();
            var query = new AV.Query(Todo);
            query.equalTo("Name", typeName);
            if(objextend=="CDCUser"){
            	todo.set("email", typeName+"@accenture.com");
            }
            query.find({
            	success: function(results) {
            		if(results.length>0){
            			
                        // if(objextend=="CDCUser"){
                        // 	var userobj=JSON.parse(JSON.stringify(results));
                        // 	return deferred.resolve(userobj);
                        // }else{
                        	alert("This name already exists, please re-enter");
                        	return false;
                        // }

            		}else{
            			todo.set("Name", typeName);
            			todo.save(null, {
            			 	success: function(result) { 
                                var newslist=JSON.parse(JSON.stringify(result));
        						return deferred.resolve(newslist);	
                            }
            			});
            		}	            		
            	}
            });

            return deferred.promise;
		};

		this.deleteType=function(dataList){
			var deferred = $q.defer();
			var Todo = AV.Object.extend("CDCUser");
        	var query = new AV.Query(Todo);
        	var memberid=dataList.objectId;
        	var TodoS = AV.Object.extend("CDCgrouptag");
        	var querys= new AV.Query(TodoS);
        	delreletiveclass();
        	function delreletiveclass(){
        		deluserclass().then(function(){
					querys.equalTo("UserId", memberid); 

					querys.find({
	            	success: function(result) {
	            			var re=result; 
		            		if(re.length>0){
		            			for(var i=0;i<re.length;i++){
									re[i].destroy({
	  									success: function(res){
	  										if(i==re.length-1){
	  											return deferred.resolve("del");
	  										}
	  										
		  								}
		  							})
								}
		            		}
		            	}
		            });
        		})
        	}       	

        	function deluserclass(){
        		var defe = $q.defer();
				query.get(dataList.objectId, {           
	              	success: function(results) {
	              		results.destroy({
	              			success: function(result) {
	              				return defe.resolve("del");         					
	              			}
	              		});
	              	}
	      		})
	      		return defe.promise;
        	}
      		return deferred.promise;
  		};

		this.queryGroupmember=function(objextend,groupID,userID){
			var deferred = $q.defer();
			var Todo = AV.Object.extend(objextend);
            var todo = new Todo();
            var query = new AV.Query(Todo);
            query.equalTo("groupID", groupID);

            query.find({
             	success: function(results) {
             		var lenth=0;
             		if(results.length>0){
             			for(var i=0;i<results.length;i++){
             				var res=results[i];
             				if(res.get("UserId")==userID){
             					lenth++;
             				}
             			}
             			if(lenth==0){
             				todo.set("UserId", userID);
             				todo.set("GroupId", groupID);
	            			todo.save(null, {
	            			 	success: function(result) {
	            			 		var groupResult=JSON.parse(JSON.stringify(res)); 
            						return deferred.resolve(groupResult);	
                                }
	            			});
	             		}else{
	             			return deferred.resolve("false");
	             		}
             		}else{
             			todo.set("UserId", userID);
         				todo.set("GroupId", groupID);
            			todo.save(null, {
            			 	success: function(res) { 
            			 		var groupRes=JSON.parse(JSON.stringify(res));
        						return deferred.resolve(groupRes);
                            }
            			});
             		}

             	}
            });

			return deferred.promise;

		}


	}]);

    module.service("newsDetailService", ['$q','$http','ngDialog', function($q,ngDialog,$http){

	this.queryObj=function(objextend,param){
		var deferred = $q.defer();
		var Todo = AV.Object.extend(objextend);
    	var query = new AV.Query(Todo);
    	query.get(param, {           
            success: function(results) {
            	var aNews=JSON.parse(JSON.stringify(results));
            	return deferred.resolve(aNews);
            }
        })
        return deferred.promise;
	};

	this.queryObjgroup=function(objextend,param){
		var deferred = $q.defer();
		var list="";
	    for(var i=0;i<param.length;i++){
	    	if(i==0){
	    		list="\'"+param[i]+"\'";

	    	}else{
	    		list=list+","+"\'"+param[i]+"\'";
	    	}
	    }
	    var sql_user="select Name from CDCGroup where objectId in ("+list+")";
	    AV.Query.doCloudQuery(sql_user, {
	      	success: function(result){
	      		var group=JSON.parse(JSON.stringify(result.results));
	      		return deferred.resolve(group);	
	      	}
	  	});
	    return deferred.promise;
	};




}]);
	

})()

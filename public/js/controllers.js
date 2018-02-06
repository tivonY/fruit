(function() {

    var module = angular.module("starter.controllers", ["starter.services","ngDialog"])

    .run(function() {

    //    AV.initialize("XBbPjjXsdK7j0aShube2fs6w", "GiBnVCJnxKOKqk0lCQTIrAgu");
          AV.initialize('8pefiEReF1m1Q2QSBBRH6nDQ', 'CVqVU0aM0mNrYx1TJ6Rp25QF');

    })

    .controller('indexCtrl', ['$http', '$scope','$q', '$stateParams', '$state', 'indexfactory',  function($http, $scope, $q , $stateParams, $state, indexfactory) {
     // $state.go('todo.playlists');
     indexfactory.resizePager("rightCon");
     window.onresize=function(){
        indexfactory.resizePager("rightCon");
     }
     $scope.isNews=true;

     $scope.createnewslist=function(){
        $state.go("todo.playlists");
     }

}])

    .controller("productsListCtrl",
        ['$http', '$scope','$q', '$stateParams', '$state','queryClassFactory', function($http, $scope, $q, $stateParams, $state, queryClassFactory) {


    }])

    .controller("createTypeCtrl",['$http', '$scope','$rootScope', 'ngDialog', '$timeout', '$q', '$stateParams', '$state' , 'createTypeService', function($http, $scope, $rootScope, ngDialog, $timeout, $q, $stateParams, $state, createTypeService) {

   $scope.newsTypetodo=[];
   $scope.grouptodo=[];
   $scope.keywordtodo=[];
   $scope.groupMember=[];
   $scope.matchGroup=[];
   $scope.typelist=[];
   $scope.addUserGroup=[];
   $rootScope.jsonData = '{"foo": "bar"}';
   $rootScope.theme = 'ngdialog-theme-default';
   $scope.queryalltypename=[];
   $scope.groupuser=[];
   $scope.taggroupname="select group";
   $scope.choiceUser=[];
   $scope.currentUser=[];
   $scope.groupNameDialog=[];
    //type manager begin

    //dialog
    var param=$stateParams.typename;
    // if(param=="group"){
    //     $scope.groupMember=true;
    // }else{
    //     $scope.groupMember=false;
    // }
    $scope.dialog_group=false;
    $scope.Typetitle=param;
    $scope.querylength=false;
    $scope.typeEmpty=false;
    $scope.nomember=false,$scope.addtoggle=false;
    //close dialog
    $scope.closedialog=function(param){
        if(param=="dialog_group"){
            $scope.dialog_group=false;
        }else{
           $scope.addtoggle=false;
        }
    }

    $scope.pagetypelist=function(){
        $state.go("todo.playlists");
    }

    //toggle current user
    $scope.usertoggle=function(pam,$event){
        var checkbox=$event.target;
        var actions=(checkbox.checked ? "add":"del");
        if(actions=="add"){

            $scope.currentUser.push(pam);

        }else{

            for(var i=0;i<$scope.currentUser.length;i++){
                if($scope.currentUser[i].objectId==pam.objectId){
                    $scope.currentUser.splice(i,1);
                }
            }
        }
    }
    var alarmlink=0,typeval="",typeobj="";
    //alarm dialog
    $scope.alarmDialog=function(val,obj,delval,delobj){
        document.getElementById(obj).style.display="";
        $scope.delalarmInfoTxt="Are You Sure Delete?";
        alarmlink++;
        if(alarmlink==1){
            typeval=delval;
            typeobj=delobj;
        }
        if(val=="close"){
            alarmlink=0;
            document.getElementById(obj).style.display="none";
        }
        else if(val=="true"){
            alarmlink=0;
            document.getElementById(obj).style.display="none";
            $scope.deleteType(typeval,typeobj);

        }
    }


    //query all member
    $scope.queryallMember=function(para){
        // var grouplist=$scope.dialog_group;
        // $scope.dialog_group = grouplist === false ? true: false;
        // $scope.queryAllType();
        $scope.load=true;
        createTypeService.querytype("CDCUser",'').then(function(res){
            if(res.length>0){
                for(var i=0;i<res.length;i++){
                    $scope.groupuser.push(res[i]);
                    $scope.groupuser[i].checked=false;
                }
                $scope.queryAppintUser(para);
                $scope.load=false;
            }
        });
    }

    //query all choice member
    $scope.queryAppintUser=function(parm){
        if(parm){
            createTypeService.marchMember("CDCGroup",parm).then(function(res){
                if(res){
                    for(var i=0;i<res.length;i++){
                       for(var len=0;len<$scope.groupuser.length;len++){
                          if(res[i].objectId==$scope.groupuser[len].objectId){
                              $scope.choiceUser.push(res[i]);
                              //left select user
                              $scope.currentUser.push(res[i]);
                              $scope.groupuser[len].checked=true;
                          }
                       }
                    }
                }
            });
        }
    }

    // document.getElementById('ngdialogUser').style.display = "none";

    $scope.openUserdialog=function(para){
        $scope.memberval="";
        $scope.choiceUser=[],$scope.currentUser=[];
        document.getElementById('ngdialogUser').style.display = "";
        $scope.groupNameDialog=para;
        $scope.queryallMember(para);
        $scope.groupuser.group=para.objectId;
        // $scope.queryAppintUser(para);
    }

    $scope.cancelChoice=function(param){
        for(var i=0;i<$scope.groupuser.length;i++){
            if($scope.groupuser[i].objectId==param.objectId){
                $scope.groupuser[i].checked=false;
                i=$scope.groupuser.length;
            }
        }

        for(var len=0;len<$scope.currentUser.length;len++){
            if($scope.currentUser[len].objectId==param.objectId){
                $scope.currentUser.splice(len,1);
                return false;
            }
        }

    }


    $scope.closeThisDialog=function(){
        $scope.groupuser=[];
        document.getElementById('ngdialogUser').style.display = "none";
    }

    //query desigin member
    var memclick=0,memberval=[],member=[];
    $scope.querydesignMember=function(){
        var nPos="";
        if(memclick==0){
           member=$scope.groupuser;
        }
        if($scope.memberval=="" || $scope.memberval==undefined){
            $scope.groupuser=member;
        }else{
            $scope.groupuser=[];
            for(var i=0;i<member.length;i++){
                nPos = member[i].Name.toLowerCase().indexOf($scope.memberval.toLowerCase());
                if(nPos!=-1){
                    $scope.groupuser.push(member[i]);
                }

            }
            memclick++;
        }
    }


    $scope.submThisDialogit=function(){
        memclick=0;
        if(member.length>0){
            $scope.groupuser=member;
        }
        for(var i=0;i<$scope.groupuser.length;i++){
            var checkedval=0;
            if($scope.groupuser[i].checked==true){

                if($scope.choiceUser.length==0){
                    createTypeService.saveAgroupmember("CDCgrouptag",$scope.groupNameDialog.objectId,$scope.groupuser[i].objectId);
                }else{

                   for(var len=0;len<$scope.choiceUser.length;len++){
                        if($scope.groupuser[i].objectId==$scope.choiceUser[len].objectId){
                            // $scope.choiceUser=res[i];
                            checkedval++;
                        }
                        if(checkedval==0 && $scope.choiceUser.length-1==len){
                            createTypeService.saveAgroupmember("CDCgrouptag",$scope.groupNameDialog.objectId,$scope.groupuser[i].objectId);
                        }

                    }
                }

            }else if($scope.groupuser[i].checked==false&&$scope.choiceUser.length>0){
                for(var l=0;l<$scope.choiceUser.length;l++){
                    if($scope.groupuser[i].objectId==$scope.choiceUser[l].objectId){

                        createTypeService.delAgroupmember("CDCgrouptag",$scope.groupNameDialog.objectId,$scope.groupuser[i].objectId).then(
                            function(res){
                                console.log(res);
                            }
                        );
                    }
                }
            }

            if($scope.groupuser.length-1==i){
                $scope.closeThisDialog();
            }

        }
    }

    //march query all type
    $scope.queryAllType=function(params){
        $scope.load=true;
        var classical="",val="";
        if(params=="keyword"){
            classical="CDCkeyword";
            val=$scope.keywordval;
        }else if(params=="group"){
            classical="CDCGroup";
            val=$scope.groupval;
        }else if(params=="newstype"){
            classical="CDCNewsType";
            val=$scope.newstypeval;
        }
        createTypeService.querytype(classical,val).then(function(res){
            if(res.length!=0){
                $scope.typelist=res;

                $scope.typelength=res.length;
                for(var i=0;i<res.length;i++){
                   $scope.typelist[i].checked=true;
                   $scope.typelist[i].view=false;
                   $scope.typelist[i].isActive=false;
                }
                $scope.querylength=false;
                $scope.typelength=res.length;
            }else{
                $scope.querylength=true;
                $scope.typelength=0;
            }
            $scope.load=false;

        });

    };

    //popup val match
    $scope.Exactqueryall=function(typename){
        if(param=="keyword"||param=="group"||param=="newstype"){
            var classical="";
            if(param=="keyword"){
                classical="CDCkeyword";
            }else if(param=="group"){
                classical="CDCGroup";
            }else if(param=="newstype"){
                classical="CDCNewsType";
            }
        }
        createTypeService.querytype(classical,$scope.newTypeName).then(function(res){

            if(res.length!=0){
                $scope.queryalltypename=res;
            }

        });

    }


    //delete all type
    $scope.deleteType=function(params,val){
            var alarm="deleted Successed",classical="",updateval="";
            if(val=="keyword"){
                classical='CDCkeyword';
            }else if(val=="group"){
                classical='CDCGroup';
            }else if(val=="newstype"){
                classical='CDCNewsType';
            }

            //查询出列表是否存在这个选项
            createTypeService.existobj(classical,params.objectId).then(function(res){
                if(res.length>0){
                    createTypeService.openNotify("Delete failed！this type has been used in the news, please delete this type of news.");
                    return false;
                }else{
                    createTypeService.deleteSelectType(classical,params).then(function(res){
                        if(res=="del"){
                            if(val=="keyword"){
                                $scope.queryAllType('keyword');
                            }else if(val=="group"){
                                $scope.queryAllType('group');
                            }else if(val=="newstype"){
                                $scope.queryAllType('newstype');
                            }
                            createTypeService.openTimed(alarm);
                        }
                    });

                }
            });

    }

    $scope.newAtype=function(params){

        if(params=="keyword"||params=="group"||params=="newstype"){
            var classical="",val=[];
            if(params=="keyword"){
                if($scope.keywordval==undefined||$scope.keywordval==""){
                    createTypeService.openNotify("Please enter add content!");
                    return false;
                }
                classical="CDCkeyword";
                val.newsTypeVal=$scope.keywordval;
            }else if(params=="group"){
                if($scope.groupval==undefined||$scope.groupval==""){
                    createTypeService.openNotify("Please enter add content!");
                    return false;
                }
                classical="CDCGroup";
                val.newsTypeVal=$scope.groupval;
            }else if(params=="newstype"){
                if($scope.newstypeval==undefined||$scope.groupval==""){
                    if($scope.newstypeval==undefined||$scope.icon!=""){
                        createTypeService.openNotify("Please upload a news type icon!");
                    }else{
                        createTypeService.openNotify("Please enter add content!");
                    }
                    return false;
                }
                classical="CDCNewsType";
                val.newsTypeVal=$scope.newstypeval;
                val.icon=$scope.icon;
            }
        }
        createTypeService.saveAType(classical,val).then(function(res){

            if(res=="exist"){
                var alarm=params+"name already exists, please re-enter!";
                createTypeService.openNotify(alarm);

            }else{
                createTypeService.openTimed("save successed!");
                res.isActive=false;
                $scope.typelist.push(res);
                $scope.typelength=$scope.typelist.length;

                if(params=="keyword"){
                    $scope.keywordval="";
                }else if(params=="group"){
                    $scope.groupval="";
                }else if(params=="newstype"){
                    $scope.newstypeval="";
                    $scope.icon="";
                }
                $scope.querylength=false;
            }
        });


    }

    // toggle click class
    $scope.tplists=function(params){
        for(var i=0; i<$scope.typelist.length; i++){
            if($scope.typelist[i].objectId==params.objectId){
               $scope.typelist[i].view=true;
               $scope.typelist[i].isActive=true;
            }else{
                $scope.typelist[i].view=false;
                 $scope.typelist[i].isActive=false;
            }
        }
    }

     //add group member
     $scope.addgroupmember=function(){
        if($scope.taggroupname=="select group"){
            createTypeService.openNotify("please select group!");
            return false;
        }
        var userId="",groupId="";
        var groupname=$scope.trim($scope.taggroupname);
        var username=$scope.trim($scope.formMarchname);
        if(groupname==""||username==""){
            alert("Group name or user name can not be empty!");
            return false;
        }

        var newstypename=($scope.formMarchname).toLowerCase();

        createTypeService.checkGroupName(groupname).then(function(res){

            if(res){
                groupId=res[0].objectId;
                createTypeService.addType("CDCUser",newstypename).then(
                    function(userobj){
                        userId=userobj.objectId;
                        createTypeService.saveGroupmember("CDCgrouptag",groupId,userId).then(
                            function(result){
                                if(result=="exist"){
                                    alert("This username already exists, please re-enter");
                                    $scope.formMarchname="";
                                }else{
                                    $scope.formMarchname="";
                                    $scope.taggroupname="select group";
                                    createTypeService.openTimed("create successed!");
                                    // $scope.addUser.push(res);
                                }
                            }
                        );
                    }
                );


            }else{
                alert("Please enter the correct group name!");
                return false;
            }
        });

     }


    //delete typelist
    $scope.deletemember=function(params){

        createTypeService.deleteType(params).then(
            function(res){
                $scope.getType(classical);
            }
        );
    };




    //type manager end
   //add newstype
    $scope.newsType=function(param){

        var classical="",Paraname="";

        if(param=="newstp"){

            classical="CDCNewsType";
            Paraname=$scope.newsTpyeNm;

        }else if(param=="keyword"){

            classical="CDCkeyword";
            Paraname=$scope.keyword;

        }else if(param=="group"){

            classical="CDCGroup";
            Paraname=$scope.groupNm;
        }
        createTypeService.addType(classical,Paraname).then(
            function(res){

                if(res!=false){
                    if(param=="newstp"){

                       $scope.newsTpyeNm="";
                       $scope.newsTypetodo.push(res);

                    }else if(param=="keyword"){

                        $scope.keyword="";
                        $scope.keywordtodo.push(res);

                    }else if(param=="group"){

                        $scope.groupNm="";
                        $scope.grouptodo.push(res);

                    }
                    alert("add successed!");
                }
            }
        )
    }



     //query group member
    $scope.queryMemberName=function(){

        var groupname=$scope.grouptag;
        if(groupname==""||groupname==undefined){
            alert("Group name cannot be empty!");
            return false;
        }
        createTypeService.queryGroupMember(groupname).then(
            function(res){
                $scope.emptyshow=false;
                $scope.membershow=true;
                if(res.results.length>0){
                    $scope.groupMember=res.results;

                }else{
                   $scope.groupMember=[];
                   $scope.emptyshow=true;
                   $scope.emptyvalue="No member of this group!";
                   $scope.membershow=false;
                }

            }
        );
    }

    //trim
    $scope.trim=function(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    //member march
    $scope.groupMarch=function(param){
        var groupname="";
        if(param=="groupselect"){
            groupname=$scope.trim($scope.groupselect);
            $scope.choiceshow=false;
        }else{
            groupname=$scope.trim($scope.grouptag);
            $scope.membershow=false;
        }

        if(groupname==""||groupname==undefined){

            alert("The empty group cannot match!");
            return false;
        }
        createTypeService.groupMarchVal(groupname).then(function(res){
            if(res.results.length>0){
                if(param=="groupselect"){
                    $scope.addDataEmpty=false;
                    $scope.choiceshow=true;
                    $scope.addUserGroup=res.results;
                }else{
                    $scope.emptyshow=false;
                    $scope.matchshow=true;
                    $scope.matchGroup=res.results;
                }

            }else{
                if(param=="groupselect"){
                    $scope.addDataEmpty=true;
                    $scope.addGroupMemberValue="Related groups not found!";
                }else{
                    $scope.emptyshow=true;
                    $scope.emptyvalue="Related groups not found!";
                }
            }
        });

    }

    //select match group
    $scope.chioceMatch=function(param,tag){
        var chioceV="";
        if(tag=="addUsertag"){
            chioceV=param.Name;
            $scope.groupselect=chioceV;
            $scope.choiceshow=false;
        }else{
            chioceV=param.Name;
            $scope.grouptag=chioceV;
            $scope.matchshow=false;
        }
    }
    if($stateParams.type!=""&&$stateParams.type=="keyword"){
        $scope.queryAllType('keyword');

    }else if($stateParams.type!=""&&$stateParams.type=="newstype"){
        $scope.queryAllType('newstype');
        // set popheight width
        // createTypeService.loadpopwidth();
    }else if($stateParams.type!=""&&$stateParams.type=="group"){
        $scope.queryAllType('group');
        // set popheight width
        // createTypeService.loadpopwidth();

    }


}])

    .controller("createProductCtrl",['$http', '$scope','$q','$timeout', '$stateParams', '$state' ,  'createNewsService', function($http, $scope, $q, $timeout, $stateParams, $state, createNewsService) {

        $scope.newTodo = {
            objectId:"",
            state:1,
            productName: "",
            description:"",
            rushStatus:1,
            coverImage:""
        };
        $scope.voteTodo={
            newsId:"",
            voteType:"",
            endTime:"",
            startTime:"",
            voteOptions:[]
        }


        $scope.pagerTitle="Create a news";
        $scope.todos = [];
        $scope.grouptag=[];
        $scope.keywordtag=[];
        $scope.keywordname=[];
        $scope.tagname=[];
        $scope.newsTypetodo=[];
        $scope.keywordtodo=[];
        $scope.grouptodo=[];
        $scope.imgUpload=[];
        $scope.tagCon=false;
        $scope.selectType=[];
        $scope.choicty=[];
        $scope.AllUser=[];
        $scope.currentUser=[];
        $scope.submituser=[];
        $scope.voteOptions=[];
        $scope.voteType="";

        $scope.voteTodo.startTime= JSON.stringify(createNewsService.getCurrentTime()).slice(1,-10);
        // alert($scope.voteTodo.startTime);
        $scope.voteTodo.endTime= $scope.voteTodo.startTime;
        // alert($scope.voteTodo.startTime);


        var start = {
            elem: '#start',
            format: 'YYYY-MM-DD',
            isclear:false,
            min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16', //最大日期
            istime: false,
            istoday: false,
            choose: function(datas){

                $scope.voteTodo.startTime=datas;
                // alert("startTime:"+$scope.newTodo.startTime);
                 end.min = datas; //开始日选好后，重置结束日的最小日期
                 end.start = datas //将结束日的初始值设定为开始日
            }
        };
        var end = {
            elem: '#end',
            format: 'YYYY-MM-DD',
            isclear:false,
            min: laydate.now(+2),
            max: '2099-06-16',
            istime: false,
            istoday: false,
            choose: function(datas){
                $scope.voteTodo.endTime=datas;
                // alert("endTime:"+$scope.newTodo.endTime);
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };

        $scope.start=function(){
             laydate(start);

        }
        $scope.end=function(){
            laydate(end);
        }




    //alarm dialog
    $scope.alarmDialog=function(val,obj){
        document.getElementById(obj).style.display="";
        $scope.ESCAlarmInfoTxt="Not Saved, Sure To Leave?";
        if(val=="close"){
            document.getElementById(obj).style.display="none";
        }
        else if(val=="true"){
            document.getElementById(obj).style.display="none";
            $scope.pagetypelist();
        }
    }

    $scope.cancelChoice=function(param){
        for(var i=0;i<$scope.AllUser.length;i++){
            if($scope.AllUser[i].objectId==param.objectId){
                $scope.AllUser[i].checked=false;
                i=$scope.AllUser.length;
            }
        }

        for(var len=0;len<$scope.currentUser.length;len++){
            if($scope.currentUser[len].objectId==param.objectId){
                $scope.currentUser.splice(len,1);
                return false;
            }
        }

    }


    //Save vote options
    $scope.saveOption=function(){
      if(!$scope.voteName||$scope.voteName==""){
        $scope.voteAlert="vote options name not empty!";
      }else{

        if($scope.voteTodo.voteOptions.length>0){
            for(var len=0;len<$scope.voteTodo.voteOptions.length;len++){
                if($scope.voteTodo.voteOptions[len]==$scope.voteName){
                   createNewsService.openTimed("The option name exists,please re-enter!");
                   return false;
                }
            }
        }

        $scope.voteTodo.voteOptions.push($scope.voteName);
        $scope.voteName="";

      }
    }

    //Vote
    $scope.choiceOption=function(options){
        $timeout(function() {
            $scope.voteTodo.voteType=options;
            // $scope.voteType=options;
        }, 200);

    }

    //Vote save
    $scope.voteSubmit=function(){
        $scope.dateTimeShow=true;
        $scope.selectVote=$scope.voteTodo.voteType;
        $scope.voteTodo.voteType="";
    }

    //cancel vote option
    $scope.delVoteOption=function(options){
        for(var len=0;len<$scope.voteTodo.voteOptions.length;len++){
            if($scope.voteTodo.voteOptions[len]==options){
                $scope.voteTodo.voteOptions.splice(len,1);
                return false;
            }
        }
    }


    //alarm dialog
    $scope.openUserdialog=function(){
        $scope.memberval="";
        document.getElementById('ngdialogUser').style.display = "";
        $scope.queryallUser();
        // $scope.hasChoicedUser();
    }

    $scope.closeThisDialog=function(){
        document.getElementById('ngdialogUser').style.display = "none";
    }

        //query all member
    $scope.queryallUser=function(){
        $scope.load=true;
        createNewsService.queryClasslist("CDCUser").then(function(res){
            if(res.length>0){
                $scope.AllUser=res;
                for(var i=0;i<res.length;i++){
                    $scope.AllUser[i].checked=false;
                }

                $scope.hasChoicedUser();
                $scope.load=false;

            }
        });
    }


    //query desigin member
    var memclick=0,memberval=[],member=[];
    $scope.querydesignMember=function(){
        var nPos="";
        if(memclick==0){
           member=$scope.AllUser;
        }
        if($scope.memberval=="" || $scope.memberval==undefined){
            $scope.AllUser=member;
        }else{
            $scope.AllUser=[];
            for(var i=0;i<member.length;i++){
                nPos = member[i].Name.toLowerCase().indexOf($scope.memberval.toLowerCase());
                if(nPos!=-1){

                    $scope.AllUser.push(member[i]);
                }
            }

            memclick++;
        }
    }



    $scope.selectcancel=function(parm,obj){
        if(obj=="group"){
            for(var i=0;i<$scope.tagname.length;i++){

                if($scope.tagname[i].objectId==parm.objectId){
                    $scope.grouptag.splice(i,1);
                    $scope.tagname.splice(i,1);

                }
            }

            for(var len=0; len<$scope.grouptodo.length;len++){
                if($scope.grouptodo[len].objectId==parm.objectId){
                    $scope.grouptodo[len].checked=false;
                    return false;
                }
            }

        }else if(obj=="user"){
            for(var i=0;i<$scope.submituser.length;i++){
                if($scope.submituser[i].objectId==parm.objectId){
                    $scope.submituser.splice(i,1);
                }
            }
            for(var len=0;len<$scope.currentUser.length;len++){
                if($scope.currentUser[len].objectId==parm.objectId){
                    $scope.currentUser.splice(len,1);
                }
            }

        }

    }

    $scope.hasChoicedUser=function(){
        if($scope.currentUser.length==0){
            return false;
        }
        for(var i=0;i<$scope.currentUser.length;i++){
            for(var len=0; len<$scope.AllUser.length; len++){
                if($scope.AllUser[len].objectId==$scope.currentUser[i].objectId){
                    $scope.AllUser[len].checked=true;
                }
            }
        }
    }

    $scope.submitUsers=function(){
        $scope.submituser=$scope.currentUser;
        document.getElementById('ngdialogUser').style.display = "none";
    }


    $scope.usertoggle=function(pam,$event){
        var checkbox=$event.target;
        var actions=(checkbox.checked ? "add":"del");
        if(actions=="add"){
            $scope.currentUser.push(pam);

        }else{
            for(var i=0;i<$scope.currentUser.length;i++){
                if($scope.currentUser[i].objectId==pam.objectId){
                    $scope.currentUser.splice(i,1);
                }
            }
        }
    }

    $scope.pagetypelist=function(){
        $state.go("todo.playlists");
    }


    //query newstype and keyword
    var ck=0,getval=[],keywordval=[];
    $scope.fazzinput=function(val){
        var objclass="",inputva="";
        ck++;
        if(val=='fazziV'){
            if(ck==1){
                getval=$scope.grouptodo;
            }
            inputva=$scope.fazziV;

            objclass='CDCGroup';
        }else if(val=="fazzKeyword"){

            if(ck==1){
                keywordval=$scope.keywordtodo;
            }
            inputva=$scope.fazzKeyword;
            objclass='CDCkeyword';
        }

        createNewsService.queryallgroup(objclass,inputva).then(function(res){
            if(res.length>0){
                if(val=='fazziV'){
                    if($scope.fazziV==""||$scope.fazziV==undefined){
                       $scope.grouptodo=getval;
                    }
                    else{
                        $scope.grouptodo=[];
                        for(var i=0;i<res.length;i++){
                            for(var m=0;m<getval.length;m++){
                                if(res[i].objectId==getval[m].objectId){
                                  $scope.grouptodo.push(getval[m]);
                                }
                            }
                        }
                    }
                }else if(val=="fazzKeyword"){

                  if($scope.fazzKeyword==""||$scope.fazzKeyword==undefined){
                       $scope.keywordtodo=keywordval;
                    }
                    else{
                        $scope.keywordtodo=[];
                        for(var i=0;i<res.length;i++){
                            for(var m=0;m<keywordval.length;m++){
                                if(res[i].objectId==keywordval[m].objectId){
                                  $scope.keywordtodo.push(keywordval[m]);
                                }
                            }
                        }
                    }
                }
            }
        })
    }



        //tab newstype
        $scope.tabtype=function(){
            var tag=$scope.tabCon;
            var grouplist=$scope.tabCon;
            $scope.tabCon = grouplist === true ? false: true;
        }

        //choice news type
        $scope.choicetype=function(params){
            if(params){
                if(params.Name=="Vote"){
                    $scope.voteShowStatus=true;
                }else{
                    $scope.voteShowStatus=false;
                }
                $scope.choicty=[];
                $scope.choicty.push(params);
               $scope.selectType=params;
               $scope.tabCon=false;
               $scope.requiredtype=true;
            }
        }


       //get newgroup name
        $scope.getGroupName = function() {
            createNewsService.queryClasslist("CDCGroup").then(
                function(res) {
                   if(res) {
                      $scope.grouptodo=res;
                      for(var i=0;i<$scope.grouptodo.length;i++){
                          $scope.grouptodo.checked=false;
                      }
                   }
               }
            );
        };

         //get newstype name
        $scope.getNewstype = function() {
            createNewsService.queryClasslist("CDCNewsType").then(
                function(res) {
                   if(res) {
                      $scope.newsTypetodo=res;
                       $scope.newsTypetodo.push("All");

                      $scope.newsTypetodo.selectName=res[0].Name;
                   }
               }
            );
        };

        //get newskeyword name
        $scope.getkeyword = function() {

            createNewsService.queryClasslist("CDCkeyword").then(
                function(res) {
                   if(res) {
                      $scope.keywordtodo=res;
                      $scope.keywordtodo.checked=res[0].Name;
                   }
               }
            );
        };

        //upload img
        // $scope.fileUpload=function(){
        //     var fileUploadControl = document.getElementById('fileCoverImage');
        //     if(fileUploadControl.files.length > 0){

        //         var file = fileUploadControl.files[0];
        //         var name = file.name;
        //         var avFile = new AV.File(name, file);

        //         avFile.save().then(function() {
        //             $scope.$apply(function(){
        //                 $scope.imgUpload.push(avFile.url());
        //             })
        //         });

        //     }
        // }
        //del img
        // $scope.delImg=function(todoParam){
        //     $scope.storeimg=[];
        //     $scope.storeimg=$scope.imgUpload;
        //     $scope.imgUpload=[];
        //     for(var i=0; i<$scope.storeimg.length; i++){
        //         if($scope.storeimg[i]!=todoParam){
        //             $scope.imgUpload.push($scope.storeimg[i]);
        //         }
        //     }
        // }


        //close window
        $scope.tagspops=false;
        $scope.keywordpops=false,$scope.isActive=true,$scope.iskeyActive=true;
        $scope.toggleWin=function(val){
            $scope.voteTodo.voteType="";
            var currentstaus=$scope.tagspops;
            var currenclass=$scope.isActive;
            var cuurentkeyclass=$scope.iskeyActive;
            if(val=="keyword"){
                $scope.tagspops=false,$scope.isActive=true;
                currentstaus=$scope.keywordpops;
                $scope.keywordpops = currentstaus === false ? true: false;
                $scope.iskeyActive= cuurentkeyclass===true ? false: true;

            }else{
                $scope.keywordpops=false,$scope.iskeyActive=true;
                currentstaus=$scope.tagspops;
                $scope.tagspops = currentstaus === false ? true: false;
                $scope.isActive = currenclass=== true ? false: true;

            }

        }

        //add send group
        $scope.changeTags=function($event,todoParam,val){
            var tagid="",tagname="";

            var check=$event.target;
            var actions=check.checked? "add":"remove";
            var currentTags=[],currentName=[];
            currentTags=$scope.grouptag;
            currentName=$scope.tagname;

            if(actions=="add"){
                $scope.grouptag.push(todoParam.objectId);
                // for(var i=0;i<$scope.grouptag.length; i++){
                //     if($scope.grouptag[i].objectId==todoParam.objectId){
                //         $scope.grouptag[i].checked=true;
                //     }

                // }
                $scope.tagname.push(todoParam);

            }else if(actions=="remove"){

                $scope.grouptag=[],$scope.tagname=[];
                for(var i=0;i<currentTags.length; i++){

                    if(currentTags[i]!=todoParam.objectId){
                        $scope.grouptag.push(currentTags[i]);
                        $scope.tagname.push(currentName[i]);
                    }

                }


            }

        }

        $scope.keywordselect=function(todoParam){

           $scope.keywordtag=todoParam.objectId;
           $scope.keywordname=todoParam;
        }

        //update a news

        $scope.updateNews=function(){
            if ($stateParams.articleid!=""){
                $scope.pagerTitle="Update a product";
                createNewsService.queryObj("UCProduct",$stateParams.articleid).then(
                    function(res){
                        if(res){
                            $scope.newTodo.objectId=res.objectId;
                            $scope.newTodo.productName=res.productName;
                            $scope.newTodo.description=res.description;
                            $scope.newTodo.coverImage=res.coverImage;
                        }
                    }
                );
            }
        }


        //add a news or edit a news
        $scope.addTodo = function(){

        };

    //$scope.getGroupName();
    //$scope.getNewstype();
    //$scope.getkeyword();
    $scope.updateNews();
}])

    .controller("detailCtrl",['$http', '$scope','$q', '$stateParams', '$state' , 'newsDetailService', function($http, $scope, $q, $stateParams, $state, newsDetailService) {

    $scope.tagname=[],$scope.keywordname=[],$scope.selectType=[],$scope.newsdetails=[];

    $scope.pagetypelist=function(){
        $state.go("todo.playlists");
    }

        //update a news
        $scope.getnewsdetail=function(){
            if ($stateParams.id!=""){
                newsDetailService.queryObj("CDCNews",$stateParams.id).then(
                    function(res){
                        if(res){
                            $scope.newsdetails=res;


                            if(res.newsTypeid){
                                newsDetailService.queryObj("CDCNewsType",res.newsTypeid).then(
                                    function(NewsTy){
                                        if(NewsTy){
                                            $scope.selectType=NewsTy;

                                        }
                                    }
                                );
                            }

                            if(res.keywordid){
                                newsDetailService.queryObj("CDCkeyword",res.keywordid).then(
                                    function(keyword){

                                        if(keyword){

                                            $scope.keywordname=keyword;

                                        }
                                    }
                                );
                            }

                            if(res.grouptagid){
                                newsDetailService.queryObjgroup("CDCGroup",res.grouptagid).then(
                                    function(tag){
                                        if(tag){

                                            for(var l=0;l<tag.length;l++){
                                                $scope.tagname.push(tag[l]);

                                            }

                                        }
                                    }
                                );
                            }

                        }
                    }
                );
            }
        }

        $scope.getnewsdetail();

}])

    .filter('trustHtml', function ($sce) {

    return function (input) {

        return $sce.trustAsHtml(input);

    }

});

})();

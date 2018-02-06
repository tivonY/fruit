(function() {
  var Starter = angular.module('starter', ['ui.router', 'starter.services', 'starter.controllers','angular.editor','angular.pagination','angular.file.input','angular.file.input.no.upload','angular.notice'])

      .config(function($stateProvider, $urlRouterProvider, ngDialogProvider) {

    //menu List
    $stateProvider.state('todo', {
      url : "/index",
      templateUrl : "templates/menu.html",
      controller : 'indexCtrl'
    })

    // News List
    .state('todo.playlists', {
      url : "/playlists",
      views : {
        'menuContent' : {
          templateUrl : "templates/productsList.html",
          controller : 'productsListCtrl'
        }
      }
    })

    // News newsdetail
    .state('todo.newsdetail', {
      url : "/newsdetail/:id",
      views : {
        'menuContent' : {
          templateUrl : "templates/newsdetail.html",
          controller : 'detailCtrl'
        }
      }
    })

    // group Manage
    .state('todo.groupmanage', {
      url : "/groupmanage/:type",
      views : {
        'menuContent' : {
          templateUrl : "templates/groupmanage.html",
          controller : 'createTypeCtrl'
        }
      }
    })

    // keywordmanage Manage
    .state('todo.keywordmanage', {
      url : "/keywordmanage/:type",
      views : {
        'menuContent' : {
          templateUrl : "templates/keywordmanage.html",
          controller : 'createTypeCtrl'
        }
      }
    })


    // newstype Manage
    .state('todo.newstypemanage', {
      url : "/newstypemanage/:type",
      views : {
        'menuContent' : {
          templateUrl : "templates/newstypemanage.html",
          controller : 'createTypeCtrl'
        }
      }
    })
    // News create
    .state('todo.createProduct', {
      url : "/createProduct/:articleid",
      views : {
        'menuContent' : {
          templateUrl : "templates/createProduct.html",
          controller : 'createProductCtrl'
        }
      }
    });

    $urlRouterProvider.when("", "/index/createProduct/");
//    $urlRouterProvider.otherwise('/file-upload/');
//    $urlRouterProvider.when("", "/index/file-upload/");

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function () {
            console.log('default pre-close callback');
        }
    });


  })
  
})();
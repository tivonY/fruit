(function() {
    var Starter = angular.module('starter', ['ui.router', 'starter.services', 'starter.controllers','angular.editor','angular.pagination','angular.file.input','angular.notice'])
        .config(function($stateProvider, $urlRouterProvider, ngDialogProvider) {

            //header
            $stateProvider.state('todo', {
                url : "/index",
                templateUrl : "templates/header.html",
                controller : 'indexCtrl'
            })

            .state('todo.main', {// News List
                url : "/main",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/main.html",
                        controller : 'mainCtrl'
                    }
                }
            })

            .state('todo.services', {// News List
                    url : "/services",
                    views : {
                        'menuContent' : {
                            templateUrl : "templates/services.html",
                            controller : 'servicesCtrl'
                        }
                    }
            })

            .state('todo.blog', {// News List
                url : "/blog",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/blog.html",
                        controller : 'blogCtrl'
                    }
                }
            })

            .state('todo.blog-single', {// News List
                url : "/blog-single",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/blog-single.html",
                        controller : 'blog-singleCtrl'
                    }
                }
            })

            .state('todo.project-details', {// News List
                url : "/project-details",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/project-details.html",
                        controller : 'project-detailsCtrl'
                    }
                }
            })

            .state('todo.project-2', {// News List
                url : "/project-2",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/projects-2.html",
                        controller : 'project-2Ctrl'
                    }
                }
            })
            .state('todo.project-3', {
                url : "/project-3",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/projects-3.html",
                        controller : 'project-3Ctrl'
                    }
                }
            })

            .state('todo.archives', {
                url : "/archives",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/archives.html",
                        controller : 'archivesCtrl'
                    }
                }
            })

            .state('todo.grids', {
                url : "/grids",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/grids.html",
                        controller : 'gridsCtrl'
                    }
                }
            })
            .state('todo.our-team', {
                url : "/our-team",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/our-team.html",
                        controller : 'our-teamCtrl'
                    }
                }
            })
            .state('todo.404', {
                url : "/404",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/404.html",
                        controller : '404Ctrl'
                    }
                }
            })
            .state('todo.contact', {
                url : "/contact",
                views : {
                    'menuContent' : {
                        templateUrl : "templates/contact.html",
                        controller : 'contactCtrl'
                    }
                }
            })


            /**  We Public Library  **/
            //header
            .state('wpl_index', {
                url : "/wpl_index",
                templateUrl : "WePublicLibrary/wpl_header.html",
                controller : 'indexCtrl'
            })
            .state('login', {
                url : "/login",
                templateUrl : "templates/login.html",
                controller : 'loginCtrl'
            })
            .state('wpl_index.wpl_main', {
                url : "/wpl_main",
                views : {
                    'menuContent' : {
                        templateUrl : "WePublicLibrary/wpl_main.html",
                        controller : 'wplMainCtrl'
                    }
                }
            })
            .state('wpl_index.wpl_melibrary', {
                url : "/wpl_melibrary",
                views : {
                    'menuContent' : {
                        templateUrl : "WePublicLibrary/wpl_melibrary.html",
                        controller : 'wplMelibraryCtrl'
                    }
                }
            })
            .state('wpl_index.wpl_setting', {
                url : "/wpl_setting",
                views : {
                    'menuContent' : {
                        templateUrl : "WePublicLibrary/wpl_setting.html",
                        controller : 'wplSettingCtrl'
                    }
                }
            })
            .state('wpl_index.wpl_project-detail', {
                url : "/wpl_project-detail",
                views : {
                    'menuContent' : {
                        templateUrl : "WePublicLibrary/wpl_project-detail.html",
                        controller : 'wplProjectDetailCtrl'
                    }
                }
            })

            $urlRouterProvider.when("", "/login");

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
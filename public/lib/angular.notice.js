/**
 * @author kelvin
 * @date 2015-8-12
 * @description 提示组件
 * @type 分为 primary success info warning danger 具有不同的颜色
 * @example $scope.$emit('angular.notice.push',{
 *      type:''
 *      title:''
 *      content:''
 * })
 */
angular.module('angular.notice', []).directive('notice', function ($parse) {
    return {
        restrict: 'E',
        scope: true,
        template:   '<div class="notices">' +
                        '<div class="alert alert-{{message.type}} alert-dismissible fade in" role="alert" ng-repeat="message in notices">' +
                            '<button type="button" class="close" ng-click="notices.splice($index,1)"><span aria-hidden="true">×</span></button>' +
                            '<strong>{{message.title}}</strong> <span>{{message.content}}</span>' +
                        '</div>'+
                    '</div>',
        replace: true,
        controller: function ($scope, $element, $attrs) {
            $scope.notices = [];
            $scope.$parent.$on('angular.notice.push',function(event,message){
                $scope.notices.push(message);
            });
        }
    };
});
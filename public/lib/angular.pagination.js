/**
 * @author kelvin
 * @date 2015-7-31
 * @description angularJs分页组件，使用bootstrap快速搭建。
 * 使用方法：<pagination ng-model="options"></pagination>
 * 其中options的结构是：
 * options:{
 *  pageIndex:1,//当前页索引，由1开始,缺省值为1
 *  pageSplit:10,//每页显示多少条[5,10,15,20,25,30]，缺省值为10
 *  pageCount:0//总数数缺省为0
 * }
 * 事件监听
 * 每次翻页都会触发 angular.pagination.paging 事件
 * 调用示例：
 * scope.$on('angular.pagination.paging',function(event,options){
 *  //todo:请操作options
 * });
 * 注意：对ngModel进行$watch处理的话请慎重！！
 */
angular.module('angular.pagination', []).directive('pagination', function ($parse) {
    return {
        require: '?ngModel',
        restrict: 'E',
        scope: true,
        template:   '<div class="btn-toolbar" role="toolbar">' +
                        '<div class="btn-group" role="group">' +
                            '<button type="button" class="btn btn-default" ng-click="pagingPrev()" ng-disabled="!pagingCanPrev()">&lt; Prev</button>' +
                        '</div>' +
                        '<div class="btn-group" role="group">' +
                            '<select class="form-control" ng-model="options.pageIndex" ng-change="pagingChange()" ng-options="o for o in pageItems"></select>' +
                        '</div>' +
                        '<div class="btn-group" role="group">' +
                            '<button type="button" class="btn btn-default" ng-click="pagingNext()" ng-disabled="!pagingCanNext()">Next &gt;</button>' +
                        '</div>' +
                        '<div class="btn-group" role="group">' +
                            '<p class="btn">total <span>{{options.pageCount}}</span> items, per page</p>' +
                        '</div>' +
                        '<div class="btn-group" role="group">' +
                            '<select class="form-control" ng-model="options.pageSplit" ng-change="pagingChange()" ng-options="o for o in pageSplits"></select>' +
                        '</div>' +
                        '<div class="btn-group" role="group">' +
                            '<p class="btn">items</p>' +
                        '</div>' +
                    '</div>',
        replace: true,
        controller: function ($scope, $element, $attrs) {
            $scope.pageItems = [];
            $scope.pageSplits = [5,10,15,20,25,30];
            $scope.pageSum = 0;
            $scope.options = {
                pageIndex: 1,
                pageSplit: 10,
                pageCount: 0
            };
            $scope.pagingWatch = function(){
                $scope.pageItems = [];
                $scope.pageSum = $scope.options.pageCount % $scope.options.pageSplit === 0 ?
                    $scope.options.pageCount / $scope.options.pageSplit:
                    Math.ceil($scope.options.pageCount / $scope.options.pageSplit);
                $scope.pageSum = $scope.pageSum || 1;
                $scope.options.pageIndex = Math.min($scope.options.pageIndex, $scope.pageSum);
                for(var i = 1;i<=$scope.pageSum;i++){
                    $scope.pageItems.push(i);
                }
            };
            $scope.pagingGoto = function (index) {
                $scope.options.pageIndex = index;
                eval('$scope.$parent.'+$attrs.ngModel+'=$scope.options');
                $scope.$emit('angular.pagination.paging', $scope.options);
            };
            $scope.pagingCanNext = function(){
                return $scope.options.pageIndex + 1 <= $scope.pageSum;
            };
            $scope.pagingCanPrev = function(){
                return $scope.options.pageIndex - 1 >= 1;
            };
            $scope.pagingPrev = function () {
                $scope.pagingGoto($scope.options.pageIndex - 1 || 1);
            };
            $scope.pagingNext = function () {
                $scope.pagingGoto(Math.min($scope.options.pageIndex + 1, $scope.pageSum));
            };
            $scope.pagingChange = function(){
                $scope.pagingGoto($scope.options.pageIndex);
                $scope.pagingWatch();
            };
            $scope.$watch('$parent.'+$attrs.ngModel+'.pageIndex + $parent.'+$attrs.ngModel+'.pageSplit + $parent.'+$attrs.ngModel+'.pageCount', function(pageIndex){
                $scope.options = eval('$scope.$parent.'+$attrs.ngModel);
                $scope.pagingWatch();
            });
        }
    };
});
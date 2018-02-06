/**
 * @author kelvin
 * @date 2015-7-31
 * @description
 */
angular.module('angular.file.input', []).directive('fileinput', function ($parse) {
    return {
        require: '?ngModel',
        restrict: 'E',
        scope: true,
        template: '<a href="javascript:void(0);" class="btn uploader" style="background-image:url({{imageUrl()}})">' +
                    '<span ng-if="!imageUrl()">+</span><input type="file" accept="image/*" />' +
                    '</a>',
        replace: true,
        link: function (scope, element, attr) {
            var fileUploadControl = element.find('input')[0];
            scope.imageUrl = function (url) {
                if (url) {
                    eval('scope.$parent.' + attr.ngModel + '="' + url + '"');
                } else {
                    return eval('scope.$parent.' + attr.ngModel);
                }
            };
            scope.upload = function () {
                if (fileUploadControl.files.length > 0) {
                    var file = fileUploadControl.files[0],
                        avFile = new AV.File(file.name, file);
                    if(file.size > 2097152){ //这里限制文件大小
                        alert('Please choose less than 2m file.');
                        return false;
                    }
                    element.addClass('loading');
                    avFile.save().then(function() {
                        scope.$apply(function(){
                            scope.imageUrl(avFile.url());
                        });
                        element.removeClass('loading');
                    });
                }
            };
            fileUploadControl.addEventListener('change',function(){
                scope.upload();
            });

        }
    };
});
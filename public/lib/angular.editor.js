window.replacement = function (description) {
    if (description) {
        var index = 0;
        return description.replace(/<img [^>]*>/g, function (originHtml, args, fullHtml) {
            var soureUrl = originHtml.replace(/\"/g, "'").match(/src=\'([^\'|\"]*?)\'/i);
            var width = originHtml.replace(/\"/g, "'").match(/width=\'([^\'|\"]*?)\'/i);
            var style = originHtml.replace(/\"/g, "'").match(/style=\'([^\'|\"]*?)\'/i);
            var align = originHtml.replace(/\"/g, "'").match(/align=\'([^\'|\"]*?)\'/i);
            var imageView2 = '';//'?imageView/2/w/640/q/50';
            soureUrl = soureUrl && soureUrl.length ? soureUrl[1] : '';
            width = width && width.length ? width[1] : '';
            style = style && style.length ? style[1] : '';
            align = align && align.length ? align[1] : '';
            if (soureUrl.indexOf('?') > 0) {
                soureUrl = soureUrl.split('?')[0];
            }
            return "<img id='image" + index + "' align='" + align + "' ng-click=\"imgClick($event,'" + soureUrl + "'," + (index++) + ")\" src='" + (soureUrl + imageView2) + "' width='" + width + "' style='" + style + "'>";
        }).replace(/<a [^>]*>/g, function (originHtml, args, fullHtml) {
            var href = originHtml.replace(/\"/g, "'").match(/href=\'([^\']*?)\'/i);
            var style = originHtml.replace(/\"/g, "'").match(/style=\'([^\'|\"]*?)\'/i);
            var src = originHtml.replace(/\"/g, "'").match(/local=\'([^\']*?)\'/i);
            href = href && href.length ? href[1] : '';
            src = src && src.length ? src[1] : '';
            href = href === 'javascript:void(0);' ? src : href;
            style = style && style.length ? style[1] : '';
            if (href.indexOf('http') === 0 || href.indexOf(':') === -1) {
                return "<a style='" + style + "' ng-click='openURLwithSystem(\"" + href + "\")' href='javascript:void(0);' local='"+href+"'>";
            } else {
                return originHtml;
            }
        });
    }
    return description;
};

angular.module('angular.editor', []).directive('editor', function ($timeout) {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }
            if (!document.getElementById('kind_preview')) {
                angular.element(element).parent().css('position', 'relative').append('<div id="kind_preview"></div>');
            }
            var preview = angular.element(document.getElementById('kind_preview'));

            scope.$watch(attrs['ngModel'], function (n,o) {
                if(n!=''&&o==''){
                    $timeout(function () {
                        KindEditor.create(element[0], {
                            width: '650',
                            minHeight: '550',
                            filterMode: false,
                            items: [
                                'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                                'justifyfull', 'insertorderedlist', 'insertunorderedlist', '/',
                                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
                                'hr', 'pagebreak',
                                'anchor', 'link', 'unlink', '|', 'about'
                            ],
                            afterCreate: function () {
                                this.html(ngModel.$viewValue);
                                preview.css('display', 'none');
                            },
                            afterFocus: function () {
                                preview.css('display', 'block');
                            },
                            afterBlur: function () {
                            },
                            afterChange: function () {
                                var $$this = this,
                                    content = $$this.html(),
                                    res = content.match(/src=\"([^\"]*?)\"/g),
                                    $$images = [];
                                preview.html($$this.html());
                                scope.$apply(function () {
                                    ngModel.$setViewValue($$this.html());
                                });
                                if (res && res.length) {
                                    $$images = res.map(function (e) {
                                        return e.replace('src="', '').replace('"', '');
                                    });
                                } else {
                                    $$images = [];
                                }
                                scope.$emit('angular.editor.change', {
                                    content: content,
                                    images: $$images
                                });
                            },
                            afterUpload: function (url) {
                            }
                        });
                    });
                }
            })
            element[0].style.opacity = 0;
        }
    };
});
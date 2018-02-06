(function() {
var module = angular.module("starter.controllers", ["starter.services","ngDialog"])
.run(function() {
    AV.initialize("XBbPjjXsdK7j0aShube2fs6w", "GiBnVCJnxKOKqk0lCQTIrAgu");
})
.controller('indexCtrl', ['$http', '$scope','$q', '$stateParams', '$state', 'indexfactory',  function($http, $scope, $q , $stateParams, $state, indexfactory) {

        //header js
        /************** Toggle *********************/
        $('.toggle-id').on('click', function() {
            var id = $(this).attr('href');
            $(id).slideToggle(250);
            return false;
        });

        /************** Responsive navigation *********************/
        $('a.toggle-menu').click(function(){
            $('#responsive-menu').stop(true,true).slideToggle();
            return false;
        });


        /************** Superfish (DropDown Menu) *********************/
        function initSuperFish(){

            $(".sf-menu").superfish({
                delay:  50,
                autoArrows: true,
                animation:   {opacity:'show'}
                //cssArrows: true
            });

        }

        initSuperFish();

        $('.sub-menu').addClass('animated fadeInRight');


        /************** Search Overlay *********************/
        $('#search-icon').on('click', function() {
            $('#search-overlay').removeClass('animated bounceOutUp');
            $('#search-overlay').fadeIn(0).addClass('animated bounceInDown');
            $('.search-form-holder input[type="search"]').focus();
            return false;
        });

        $('.close-search').on('click', function() {
            $('#search-overlay').removeClass('animated bounceInDown');
            $('#search-overlay').addClass('animated bounceOutUp');
            return false;
        });

        jQuery(document).keyup(function(e) {
            if (e.keyCode === 27) {
                $('#search-overlay').removeClass('animated bounceInDown');
                $('#search-overlay').addClass('animated bounceOutUp');
                return false;
            } // esc
        });

        /************** SlideJS *********************/
        $('.project-slider').slidesjs({
            pagination: false,
            navigation: {
                active: false,
                effect: "fade"
            }
        });

        /************** Animated Hover Effects *********************/
        $('.staff-member').hover(function(){
            $('.overlay .social-network').addClass('animated fadeIn');
        }, function(){
            $('.overlay .social-network').removeClass('animated fadeIn');
        });

        $('.blog-thumb, .project-item').hover(function(){
            $('.overlay-b a').addClass('animated fadeIn');
        }, function(){
            $('.overlay-b a').removeClass('animated fadeIn');
        });


        /************** FancyBox Lightbox *********************/
        $(".fancybox").fancybox();

        /************** Contact Form *********************/
        $('#contactform').submit(function(){
            var action = $(this).attr('action');

            $("#message").slideUp(750,function() {
                $('#message').hide();
                $('#submit').attr('disabled','disabled');

                $.post(action, {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        comments: $('#comments').val()
                    },
                    function(data){
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#submit').removeAttr('disabled');
                        if(data.match('success') != null) $('#contactform').slideUp('slow');

                    }
                );
            });

            return false;
        });




}])
.controller("mainCtrl",['$http', '$scope','$q', '$stateParams', '$state',
                                            function($http, $scope, $q, $stateParams, $state) {

    /************** Full Screen Slider *********************/
    $(window).resize(function(){
        var height = $(window).height();
        var width  = $(window).width();
        $('.swiper-container, .swiper-slide').height(height);
        $('.swiper-container, .swiper-slide').width(width);

    })
    $(window).resize();

    $('.arrow-left, .arrow-right').on('click', function() {
        $('.slider-caption h2').removeClass('animated fadeInDown');
        $('.slider-caption h2').fadeIn(0).addClass('animated fadeInDown');
        $('.slider-caption p').removeClass('animated fadeInUp');
        $('.slider-caption p').fadeIn(0).addClass('animated fadeInUp');
    });

    var mySwiper = new Swiper('.swiper-container',{
        mode:'horizontal',
        loop: true,
        keyboardControl: true
    })

    $('.arrow-left').on('click', function(e){
        e.preventDefault()
        mySwiper.swipePrev()
    })
    $('.arrow-right').on('click', function(e){
        e.preventDefault()
        mySwiper.swipeNext()
    })

    setTimeout(preloader, 500);

}])

.controller("servicesCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])

.controller("blogCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {


        setTimeout(preloader, 500);


    }])

.controller("blog-singleCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {



        setTimeout(preloader, 500);

    }])

.controller("project-detailsCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {






        setTimeout(preloader, 500);


    }])

.controller("project-2Ctrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {


        /************** Mixitup (Filter Projects) *********************/
        $('.projects-holder').mixitup({
            effects: ['fade','grayscale'],
            easing: 'snap',
            transitionSpeed: 400
        });


        setTimeout(preloader, 500);


    }])

.controller("project-3Ctrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        /************** Mixitup (Filter Projects) *********************/
        $('.projects-holder').mixitup({
            effects: ['fade','grayscale'],
            easing: 'snap',
            transitionSpeed: 400
        });



        setTimeout(preloader, 500);


    }])

.controller("archivesCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])

.controller("gridsCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])

.controller("our-teamCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])

.controller("404Ctrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])
//  We Public Library
.controller("loginCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);

        $scope.submit = function () {

            $state.go('wpl_index.wpl_main');

        }

    }])

.controller("contactCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        /*jQuery(function($){
            $('#map_canvas').gmap3({
                marker:{
                    address: '40.717599,-74.005136'
                },
                map:{
                    options:{
                        zoom: 17,
                        scrollwheel: false,
                        streetViewControl : true
                    }
                }
            });
        });*/


        setTimeout(preloader, 500);

    }])
//  We Public Library
.controller("wplMainCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);

        /************** Mixitup (Filter Projects) *********************/
        $('.projects-holder').mixitup({
            effects: ['fade','grayscale'],
            easing: 'snap',
            transitionSpeed: 400
        });

    }])
.controller("wplMelibraryCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])
.controller("wplSettingCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])
.controller("wplProjectDetailCtrl",['$http', '$scope','$q', '$stateParams', '$state',
    function($http, $scope, $q, $stateParams, $state) {

        setTimeout(preloader, 500);


    }])


.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});


function preloader(){
    $('.loader-item').fadeOut(); // will first fade out the loading animation
    $('#pageloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow-y': 'visible'});
}


})();

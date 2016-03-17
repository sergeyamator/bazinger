;(function($) {
  'use strict';

  if ($('.header_list').length) {
    headerMenu.init();
  }


  if ($('[data-component="slider"]').length) {

    var heroImgArr = [
      '/assets/img/hero-slider/1.png',
      '/assets/img/hero-slider/1.png',
      '/assets/img/hero-slider/1.png',
      '/assets/img/hero-slider/2.png'
    ];


    var sl = new Slider({
      element: $('[data-component="slider"]'),
      imgSrc: heroImgArr,
      controls: true,
      pager: true
    });
  }



}(jQuery));
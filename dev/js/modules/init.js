;(function($) {
  'use strict';

  if ($('.header_list').length) {
    headerMenu.init();
  }


  if ($('[data-component="slider"]').length) {

    var heroImgArr = [
      '/assets/img/hero-slider/1.png',
      '/assets/img/hero-slider/pic2.jpg',
      '/assets/img/hero-slider/pic3.jpg',
      '/assets/img/hero-slider/pic4.jpg'
    ];


    /**
     * Call slider
     */
    new Slider($('[data-component="slider"]'), {
      imgSrc: heroImgArr,
      controls: true,
      pager: true,
      auto: true,
      autoTime: 3000
    });
  }



}(jQuery));
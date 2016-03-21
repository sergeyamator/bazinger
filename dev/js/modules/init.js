;(function($) {
  'use strict';

  /**
   * Toggle active class on header menu
   */
  if ($('.header_list').length) {
    headerMenu.init();
  }

  /**
   * url for background images for Slider
   */

  if ($('[data-component="slider"]').length) {

    var heroImgArr = [
      '/assets/img/hero-slider/1.png',
      '/assets/img/hero-slider/pic2.jpg',
      '/assets/img/hero-slider/pic3.jpg',
      '/assets/img/hero-slider/pic4.jpg'
    ];


    /**
     * Call hero slider
     */
    new Slider($('[data-component="slider"]'), {
      imgSrc: heroImgArr,
      controls: true,
      pager: true,
      auto: true,
      autoTime: 3000
    });
  }


  /**
   *
   */

  if ($('.package_list').length) {
    priceZoom.init();
  }


  /**
   * Call testimonials slider
   */

  if ($('[data-component="testimonials-slider"]').length) {
    new Slider($('[data-component="testimonials-slider"]'), {
      pager: true
    });
  }


  /**
   * Form send
   */

  if ($('.js-map_form').length) {
    formAjax.init($('.js-map_form'));
  }



}(jQuery));
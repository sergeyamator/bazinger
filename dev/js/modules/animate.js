;(function($) {
  'use strict';

  $(window).scroll(function() {
    $('.bcIn').each(function() {
      console.log($(this));
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 500) {
        $(this).addClass('bounceIn');
      }
    });


    $('.zI').each(function() {
      console.log($(this));
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 900) {
        $(this).addClass('zoomIn');
      }
    });

    $('.rub').each(function() {
      console.log($(this));
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 900) {
        $(this).addClass('rubberBand');
      }
    });

    $('.slL').each(function() {
      console.log($(this));
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 900) {
        $(this).addClass('slideInLeft');
      }
    });
  });

}(jQuery));
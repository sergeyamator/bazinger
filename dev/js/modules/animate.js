;(function($) {
  'use strict';

  $(window).scroll(function() {
    $('.bcIn').each(function() {
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 500) {
        $(this).addClass('bounceIn');
      }
    });


    $('.zI').each(function() {
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 600) {
        $(this).addClass('zoomIn');
      }
    });

    $('.rub').each(function() {
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 600) {
        $(this).addClass('rubberBand');
      }
    });

    $('.slL').each(function() {
      var imgPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (imgPos < topOfWindow + 600) {
        $(this).addClass('slideInLeft');
      }
    });
  });

}(jQuery));
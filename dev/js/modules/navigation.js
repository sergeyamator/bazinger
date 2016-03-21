;(function() {

  'use strict';

  $('.header_list').on('click', '.header_link', function(e) {
    e.preventDefault();

    showSection($(this).attr('href'));
  });


  $(window).scroll(function() {
    checkSection();
  });

  function showSection(section, isAnimate) {
    var direction     = section.replace(/#/, ''),
        reqSection    = $('section').filter('[data-section="' + direction + '"]'),
        reqSectionPos = reqSection.offset().top - 100;

      $('body, html').animate({
        scrollTop: reqSectionPos
      }, 500)

  }

  function checkSection() {
    $('section').each(function() {
      var $this      = $(this),
          topEdge    = $this.offset().top - 200,
          bottomEdge = topEdge + $this.height(),
          wScroll    = $(window).scrollTop();

      if (topEdge < wScroll && bottomEdge > wScroll) {
        var currentId = $this.data('section'),
            reqLink   = $('.header_link').filter('[href="#' + currentId + '"]');

        reqLink
          .closest('.header_item')
          .addClass('header_item--active')
          .siblings()
          .removeClass('header_item--active');
      }

    });
  }


}());
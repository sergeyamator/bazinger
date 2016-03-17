var Slider = (function($) {
  'use strict';

  function Slider(opt) {
    this.el     = opt.element;
    this.items  = this.el.find('.slider_item');
    this.imgSrc = opt.imgSrc;

    this.renderList();

    if (opt.controls) this.renderControls();
    if (opt.pager) this.renderPager();
  }

  /**
   * render list, item and img
   */
  Slider.prototype.renderList = function() {
    var src = this.imgSrc;
    this.el.addClass('slider');

    this.items.each(function(item) {

      $(this).css({
        'background-image': 'url(' + src[item] + ')'
      });

    });

  };

  /**
   * If opt.controls true render left and right controls
   */
  Slider.prototype.renderControls = function() {
    this.leftCtl   = $('<a href="#" data-direction="left" class="slider_control slider_control--left"> < </a>');
    this.rigthtCtl = $('<a href="#" data-direction="right" class="slider_control slider_control--right"> > </a>');

    this.el.append(this.leftCtl);
    this.el.append(this.rigthtCtl);

    /* -------- attach click  ------- */
    $('.slider_control').on('click', this.changeSlide.bind(null, $('.slider_control')));
  };


  /**
   * If opt.pager true render pager dots control
   */
  Slider.prototype.renderPager = function() {
    var pagerList = $('<ul class="slider_pager-list">');

    this.items.each(function() {
      var pageElement = $('<li class="slider_pager-item">' +
        '<a href="#" class="slider_pager-link"></a></li>');

      pagerList.append(pageElement);
    });

    this.el.append(pagerList);

  };


  /**
   * change slide picture after click for arrow buttons
   */

  Slider.prototype.changeSlide = function(item, e) {
    e.preventDefault();
    if (item.hasClass('slider_control')) {

      $(e.target).hasClass('slider_control--right') ?
        showNextSlide() :
        showPrevSlide();
    }

  };

  Slider.prototype.showNextSlide = showNextSlide;

  function showNextSlide() {
    var currentSlide = $('.slider_item.active');

    if (currentSlide.next().length) {
      currentSlide.removeClass('active').next().addClass('active');
    }


  }

  function showPrevSlide() {
    var currentSlide = $('.slider_item.active');

    if (currentSlide.prev().length) {
      currentSlide.removeClass('active').prev().addClass('active');
    }

  }

  return Slider;

}(jQuery));
var Slider = (function($) {
  'use strict';

  function Slider(opt) {
    this.el     = opt.element;
    this.items  = this.el.find('.slider_item');
    this.imgSrc = opt.imgSrc;
    this.pager  = false;

    this.renderList();

    if (opt.controls) this.renderControls();
    if (opt.pager) this.renderPager();
    if (opt.auto) this.changeAutoNext(opt.autoTime || 3000);

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
    $('.slider_control').on('click', function(e) {
      Slider.prototype.changeSlide.call(Slider, $('.slider_control'), e);
    });

  };


  /**
   * If opt.pager true render pager dots control
   */
  Slider.prototype.renderPager = function() {
    this.pager    = true;
    var pagerList = $('<ul class="slider_pager-list">');

    this.items.each(function(item) {
      var pageElement = $('<li class="slider_pager-item">' +
        '<a href="#" class="slider_pager-link"></a></li>');

      if (item === 0) {
        pageElement.addClass('active');
      }

      pagerList.append(pageElement);
    });

    this.el.append(pagerList);

    pagerList.on('click', '.slider_pager-link', $.proxy(this.changeSlideByPager, this));
  };

  /**
   * change slide picture after click for arrow buttons
   */

  Slider.prototype.changeSlide = function(item, e) {
    e.preventDefault();

    if (item.hasClass('slider_control')) {

      $(e.target).hasClass('slider_control--right') ?
        Slider.prototype.changeNextSlide() :
        Slider.prototype.changePrevSlide();
    }
  };

  /**
   *
   * @param count
   *
   * Set active slide by number
   */
  Slider.prototype.changeSliderByNumber = function(count) {
    $(this.el)
      .find('.slider_item')
      .eq(count).addClass('active')
      .siblings()
      .removeClass('active');

    if (this.pager) this.changePagerActive(count);
  };


  /**
   * Show next slide
   */

  Slider.prototype.changeNextSlide = function() {
    var currentSlide = $('.slider_item.active'),
        nextSlide    = currentSlide.next(),
        indexSlide   = nextSlide.index();

    if (!nextSlide.length) {
      nextSlide  = currentSlide.siblings().first();
      indexSlide = 0;
    }

    currentSlide.removeClass('active');
    nextSlide.addClass('active');

    this.changePagerActive(indexSlide);
  };


  /**
   * Show previous slide
   */

  Slider.prototype.changePrevSlide = function() {
    var currentSlide = $('.slider_item.active'),
        prevSlide    = currentSlide.prev(),
        indexSlide   = prevSlide.index();

    if (!prevSlide.length) {
      prevSlide  = currentSlide.siblings().last();
      indexSlide = currentSlide.siblings().last().index();
    }

    currentSlide.removeClass('active');
    prevSlide.addClass('active');

    this.changePagerActive(indexSlide);
  };


  /**
   *
   * @param numberSlide
   *
   * Change active pager dot by number
   */
  Slider.prototype.changePagerActive = function(numberSlide) {
    $('.slider_pager-item')
      .eq(numberSlide)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };

  Slider.prototype.changeSlideByPager = function(e) {
    e.preventDefault();

    var currentTarget = $(e.target),
        item          = currentTarget.closest('.slider_pager-item');

    item
      .addClass('active')
      .siblings()
      .removeClass('active');

    this.changeSliderByNumber(item.index());
  };


  /**
   * If opt auto true slider will be automatically change slide
   */

  Slider.prototype.changeAutoNext = function(time) {
    setInterval($.proxy(this.changeNextSlide, this), time);
  };

  return Slider;

}(jQuery));
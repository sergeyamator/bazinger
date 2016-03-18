var Slider = (function($) {
  'use strict';

  var d = {
    autoTime: 3000,
    pager: false
  };

  function Slider(el, opt) {

    if (!el) {
      throw new Error('');
    }

    this.el = el;
    this.items  = this.el.find('.slider_item');
    this.options = $.extend({}, opt, d);
    this.timerId = null;

    this.renderList();

    opt.controls && this.renderControls();
    opt.pager && this.renderPager();
    opt.auto && this.changeAutoNext(opt.autoTime || 3000);

    this.attachEvent();
  }


  var fn = Slider.prototype;
  fn.attachEvent = function() {
    this.leftCtl.on('click', function(e) {
      e.preventDefault();

      clearInterval(this.timerId);
      this.changeAutoNext();
      this.changePrevSlide();


    }.bind(this));

    this.rigthtCtl.on('click', function(e) {
      e.preventDefault();

      clearInterval(this.timerId);
      this.changeAutoNext();
      this.changeNextSlide();

    }.bind(this));

    this.pagerList.on('click', '.slider_pager-link', this.changeSlideByPager.bind(this));
  };


  /**
   * render list, item and img
   */
  fn.renderList = function() {
    var src = this.options.imgSrc;
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
  fn.renderControls = function() {
    this.leftCtl   = $('<a href="#"  class="slider_control slider_control--left">&lt;</a>');
    this.rigthtCtl = $('<a href="#"  class="slider_control slider_control--right">&gt;</a>');

    this.el.append(this.leftCtl);
    this.el.append(this.rigthtCtl);
  };


  /**
   * If opt.pager true render pager dots control
   */
  fn.renderPager = function() {
    this.pager    = true;
    this.pagerList = $('<ul class="slider_pager-list">');

    var self = this.pagerList;

    this.items.each(function(item) {
      var pageElement = $('<li class="slider_pager-item">' +
        '<a href="#" class="slider_pager-link"></a></li>');

      if (item === 0) {
        pageElement.addClass('active');
      }

      self.append(pageElement);
    });

    this.el.append(this.pagerList);


  };


  /**
   *
   * @param count
   *
   * Set active slide by number
   */
  fn.changeSliderByNumber = function(count) {
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

  fn.changeNextSlide = function() {
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

  fn.changePrevSlide = function() {
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
  fn.changePagerActive = function(numberSlide) {
    $('.slider_pager-item')
      .eq(numberSlide)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };

  fn.changeSlideByPager = function(e) {
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

  fn.changeAutoNext = function() {
    this.timerId = setInterval(this.changeNextSlide.bind(this), this.options.autoTime);
  };

  return Slider;

}(jQuery));
var Slider = (function($) {
  'use strict';

  function Slider(opt) {
    this.el     = opt.element;
    this.imgSrc = opt.imgSrc;

    this.renderList();

    if (opt.controls) this.renderControls();
  }

  /**
   * render list, item and img
   */
  Slider.prototype.renderList = function() {
    var list = $('<ul class="slider_list clearfix"></ul>');
    this.el.addClass('slider');

    $(this.imgSrc).each(function(item, val) {
      var li = $('<li class="slider_item"></li>'),
          img = $('<img>', {
            src: val,
            alt: item,
            class: 'slider_img'
          });

      li.append(img);
      list.append(li);
    });

    this.el.append(list);
  };

  Slider.prototype.renderControls = function() {
    this.leftCtl = $('<a href="#" class="slider_control slider_control--left"></a>');
    this.rigthtCtl = $('<a href="#" class="slider_control slider_control--right"></a>');
  };

  return Slider;

}(jQuery));

var heroImgArr = [
  '/assets/img/hero-slider/1.png',
  '/assets/img/hero-slider/2.png'
];
var sl         = new Slider({
  element: $('[data-component="slider"]'),
  imgSrc: heroImgArr,
  controls: true
});


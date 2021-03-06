;(function($) {
  'use strict';

  var me = {};

  me.init = function() {
    attachEvent();
  };

  function attachEvent() {
    $('.package_list').on('click', '.package_link', priceZoom);
  }

  function priceZoom(e) {
    e.preventDefault();

    var $this = $(this),
        currentItem = $this.closest('.package_item');

    if (currentItem.hasClass('active')) {
      currentItem.removeClass('active')
    } else {
      currentItem
        .addClass('active')
        .siblings()
        .removeClass('active');
    }
  }


  window.priceZoom = me;
}(jQuery));
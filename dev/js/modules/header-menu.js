;(function() {
  'use strict';

  var me = {};

  me.init = function() {
    attachEvent();
  };

  function attachEvent() {
    $('.header_list').on('click', '.header_item', setActive);
    $('.hamburger').on('click', toggleMenu);
  }

  function setActive(e) {
    e.preventDefault();

    $(this)
      .addClass('header_item--active')
      .siblings()
      .removeClass('header_item--active')
  }


  function toggleMenu() {
    var target = $('.header_nav');

   target.toggleClass('active');

  }
  window.headerMenu = me;
}());
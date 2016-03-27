;(function($) {
  'use strict';

  var me = {};

  me.init = function() {
    attachEvent();
  };

  function attachEvent() {
    $('.hamburger').on('click', toggleMenu);
  }

  function toggleMenu() {
    var target = $('.header_nav');

   target.toggleClass('active');

  }
  window.headerMenu = me;
}(jQuery));
var Gallery = function () {
  "use strict";

  var gallery = $('.gallery'),
    btnFull = $('.btn'),
    item = $('.gallery-item'),
    CONTAINER_WIDTH,
    MAX_LEFT,
    MAX_RIGHT,
    SETPS = 15,
    value,
    modal = $('.modal'),
    modalOverlay = $('.modal-overlay');

  document.documentElement.requestFullscreen = (function () {
    return document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen ||
           document.documentElement.mozRequestFullscreen || document.documentElement.mozRequestFullScreen ||
           document.documentElement.msRequestFullscreen || document.documentElement.oRequestFullscreen;
  })();

  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement ||
           document.mozFullScreenElement || document.msFullscreenElement || document.oFullscreenElement;
  }

  function updateMarginPosition(value) {
    $(gallery).css('margin-left', value + 'px');
  }

  function setWidth() {
    CONTAINER_WIDTH = $(gallery).width();
    MAX_LEFT = parseInt(CONTAINER_WIDTH * 0.05, 10);
    MAX_RIGHT = parseInt(CONTAINER_WIDTH / 2, 10);
  }

  function hideModal() {
    $(modal).hide();
    $(modalOverlay).hide();
  }

  function toggleFullscreenButton() {
    $(gallery).removeAttr('style');
    if (typeof getFullscreenElement() === 'undefined') {
      $('body').css('overflow', 'visible');
      hideModal();
    } else {
      setWidth();
      $('body').css('overflow', 'hidden');
    }
  }

  function changeMarginKey(key) {
    if (key === 39) {
      if (value > -MAX_RIGHT) {
        value -= SETPS;
      }
    } else if (key === 37) {
      if (value < 0) {
        value += SETPS;
      }
    }

    updateMarginPosition(value);
  }

  function changeMarginMouse(mouseX) {
    if (mouseX >= -MAX_RIGHT || mouseX <= MAX_LEFT) {
      if (mouseX >= MAX_RIGHT - 100) {
        if (value > -MAX_RIGHT) {
          value -= SETPS;
        }
        $(gallery).addClass('anim-right');
      } else if (mouseX <= MAX_LEFT) {
        if (value < 0) {
          value += SETPS;
        }
        $(gallery).addClass('anim-left');
      } else {
        $(gallery).removeClass('anim-left');
        $(gallery).removeClass('anim-right');
      }
      updateMarginPosition(value);
    }
  }

  function setEventListener(eventName) {
    document.addEventListener(eventName, function (event) {
      toggleFullscreenButton();
    });
  }

  if (document.documentElement.requestFullscreen != null) {
    if (document.documentElement.webkitRequestFullscreen != null) {
      setEventListener('webkitfullscreenchange');
    } else if (document.documentElement.mozRequestFullScreen != null) {
      setEventListener('mozfullscreenchange');
    } else if (document.documentElement.msRequestFullscreen != null) {
      setEventListener('msfullscreenchange');
    } else if (document.documentElement.oRequestFullscreen != null) {
      setEventListener('ofullscreenchange');
    } else {
      setEventListener('fullscreenchange');
    }
  }

  function enterFullScreen() {
    if( document.documentElement.requestFullscreen != null ){
      document.documentElement.requestFullscreen();
    } else {
      alert('Your browser does not support Fullscreen yet =(');
    }
  }

  function onMouseMove(e) {
    if (typeof getFullscreenElement() !== "undefined") {
      value = parseInt($(gallery).css('margin-left'), 10);
      changeMarginMouse(e.screenX);
    }
  }

  function onKeyDown(e) {
    e.preventDefault();
    if (typeof getFullscreenElement() !== "undefined") {
      value = parseInt($(gallery).css('margin-left'), 10);
      changeMarginKey(e.keyCode);
    }
  }

  function showModal() {
    $(modal).empty().append('<img src="img/js-logo.png">').show();
    $(modalOverlay).show();
  }

  function bindingEvents() {
    $(document).on('mousemove', onMouseMove);
    $(document).on('keydown', onKeyDown);
    $(item).on('click', showModal);
    $(modalOverlay).on('click', hideModal);
    $(btnFull).on('click', enterFullScreen);
  }

  function init() {
    bindingEvents();
  }

  init();
}();
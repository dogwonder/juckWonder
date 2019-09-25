"use strict";

(function () {
  //🍪 notice
  function cookieNoticeSeen() {
    var getCookie = function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }; // Cookie vars


    var cookieNotice = document.getElementById('cookieNotice');
    var cookieButton = document.getElementById('cookieButton'); // Set a cookie

    cookieButton.addEventListener('click', function (event) {
      Cookies.set('dg_cookie_notice', 'closed', {
        expires: 365,
        path: ''
      });
      cookieNotice.classList.remove('open');
      document.body.classList.remove('has-cookie');
    }, false); //Remove notice if cookie already set

    if (Cookies.get('dg_cookie_notice') == 'closed') {
      cookieNotice.classList.remove('open');
      document.body.classList.remove('has-cookie');
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Handler when the DOM is fully loaded
    //Cookie notice
    cookieNoticeSeen(); //Load the cookie policy functionality

    var cookie = new DGCookies();
    cookie.init({
      onClick: true,
      onSubmit: false
    }); // cookie.init();
  });
})();
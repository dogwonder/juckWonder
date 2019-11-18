"use strict";

(function () {
  //remove no-js class
  document.documentElement.className = document.documentElement.className.replace("no-js", "js"); //🍪 notice

  function cookieNoticeSeen() {
    var getCookie = function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }; // Cookie vars


    var cookieNotice = document.getElementById('cookieNotice');
    var cookieButton = document.getElementById('cookieButton'); // Set a cookie

    cookieButton.addEventListener('click', function (event) {
      Cookies.set('jw_cookie_notice', 'closed', {
        expires: 365,
        path: ''
      });
      cookieNotice.classList.remove('open');
      document.body.classList.remove('has-cookie');
    }, false); //Remove notice if cookie already set

    if (Cookies.get('jw_cookie_notice') == 'closed') {
      cookieNotice.classList.remove('open');
      document.body.classList.remove('has-cookie');
    }
  }

  ; //Vanilla nav toggle button

  function toggleNav(button, elem) {
    // HTML
    // <nav class="navigation">
    // <button aria-expanded="false" aria-controls="menu">Menu</button>
    // <ul id="menu" hidden>
    //     <li><a href="/">Home</a></li>
    //     <li><a href="/benefits">Benefits</a></li>
    //     <li><a href="/pricing">Pricing</a></li>
    //     <li><a href="/blog">Blog</a></li>
    // </ul>
    // </nav>    
    // CSS
    // [hidden] { display: none; }
    // [aria\-expanded=true] {}    
    // #menu:not([hidden]) {pointer-events: all;}
    // Init 
    // toggleNav('.navigation button', '.navigation ul');
    var toggleMenu = document.querySelector(button);
    var menu = document.querySelector(elem);
    toggleMenu.addEventListener('click', function () {
      // The JSON.parse function helps us convert the attribute from a string to a real boolean.
      var open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));
      toggleMenu.setAttribute('aria-expanded', !open);
      menu.hidden = !menu.hidden;
    });
  }

  ; // Handler when the DOM is fully loaded

  document.addEventListener("DOMContentLoaded", function () {
    //Cookie notice
    cookieNoticeSeen(); //Load the cookie policy functionality

    var cookie = new JWCookies();
    cookie.init({
      onClick: true,
      onSubmit: false
    }); // cookie.init();
  });
})();
(function () {

    //remove no-js class
    document.documentElement.className = document.documentElement.className.replace("no-js","js");

    //🍪 notice
    function cookieNoticeSeen() {

        var getCookie = function (name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        };

        // Cookie vars
        var cookieNotice = document.getElementById('cookieNotice');
        var cookieButton = document.getElementById('cookieButton');

        // Set a cookie
        cookieButton.addEventListener('click', function (event) {
            Cookies.set('jw_cookie_notice', 'closed', { expires: 365, path: '' });
            cookieNotice.classList.remove('open');
            document.body.classList.remove('has-cookie');
        }, false);

        //Remove notice if cookie already set
        if (Cookies.get('jw_cookie_notice') == 'closed') {
            cookieNotice.classList.remove('open');
            document.body.classList.remove('has-cookie');
        }

    };

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

        const toggleMenu = document.querySelector(button);
        const menu = document.querySelector(elem);

        toggleMenu.addEventListener('click', function() {
            // The JSON.parse function helps us convert the attribute from a string to a real boolean.
            const open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));

            toggleMenu.setAttribute('aria-expanded', !open);
            menu.hidden = !menu.hidden;

        });


    };

    function equalizer(elem) {
        const mq = window.matchMedia( "(min-width: 1025px)" );
        var blocks = document.querySelectorAll(elem);
        if(!blocks) return;
        
        if (mq.matches) {
            var tallest = 0; 
            // Loop over matching divs
            blocks.forEach(function (item) {
                var height = item.offsetHeight;
                tallest = (height>tallest ? height : tallest); 
                // console.log(tallest);
                item.style.height = tallest + "px";
            });
        }

    };

    // Handler when the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function(){

        //Cookie notice
        cookieNoticeSeen();

        //Equal height columns
        equalizer('[data-col]');

        //Load the cookie policy functionality
        var cookie = new JWCookies();
        cookie.init({
            onClick: true,
            onSubmit: false
        });
        // cookie.init();
        
    });

    // window.addEventListener("resize", function(){
    //     equalizer('[data-col]');
    // });

})();


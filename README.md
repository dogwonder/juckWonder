## juckWonder - Nunjucks starter kit (static site generator)

A starter kit to build websites using [Nunjucks](https://mozilla.github.io/nunjucks/) a rich and powerful templating language for JavaScript. 

- 🐛 Framework free
- 🐙 CMS free
- 🐝 Minimal CSS
- 🐬 Block based templating 
- 🌈 Optimised for accessibility, speed and search engines

## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| Node.js >= 10.0  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 4.0.0  | `gulp -v`    | `npm install -g gulp` |

---------------

## Installation
Install Node dependencies (Gulp 4.0.2, Nunjucks and a few others)

`npm install gulp --save-dev`
`npm install nunjucks`
`npm install`

Edit `gulpfile.js` for varibales such as folder names

---------------

### Build Process
`gulp` for devopment
`gulp build` for production (builds to /docs)

---------------

### Testing
Uses [cypress.io](https://www.cypress.io/) and test are located in `cypress/integration/tests` 

`./node_modules/.bin/cypress open`

---------------

### Deployment
This has been set up for deploying tpo GitHub pages but it's static so there are many options

---------------
### Dependencies
This uses a few libraries and open-source plugins, all MIT licensed. Apart from maybe the cookie notice (local law permitting) none are essential and can be removed.  

- [JavaScript Cookie v2.2.0](https://github.com/js-cookie/js-cookie)
- [Validate.js - A lightweight form validation script.](https://github.com/cferdinandi/validate)
- [PhotoSwipe- JavaScript gallery, no dependencies](https://github.com/dimsemenov/photoswipe)

---------------

### Customisation

There are some site variables that should be edited away from the boilerplate defaults

- Change site vars - `data.json`
- Site name - `/images/fav/manifest.json`
- Update social images in `/images/og`, `/images/fav/`, `logotype.svg`
- Update form endpoint in `contact.html` - currently using [Formspree](https://formspree.io/)
- Add your own analytics in `_analytics.njk`
- There is a little service worker in `sw.njk.js` that caches the main files and serves them up if there is no network access

#### Page variables 

Meta description (this also changes the twitter and facebook share text)

```
siteDesc = "Blah blah blah"
```

Body class - `set body_class = "jw-gallery"`
Page title - `set page_title = "Gallery"`


#### Custom Macros

I've created a bunch of custom macros (reusable chunks of content - [see Nunjucks guide](https://mozilla.github.io/nunjucks/templating.html#macro))

- Hero block - `hero.njk`
- Text block - `text.njk`
- Text block (with some extra padding) - `float.njk`
- Full width image block - `image.njk`
- Call to action block - `cta.njk`
- Map block - `map.njk`
- Modal block - `modal.njk`

These macros will take a series of parameters, for example image path, title, link to mardown file, classname etc. See `src/index.html` for examples and syntax order

Hero macro - `hero('path/to/image.jpg', 'path/to/image-large.jpg', 'Block title', 'Block content', 'class')`

Text macro - `text('#backgroundcolor', 'alignment', '#blockcolor', 'path/to/image.jpg', 'path/to/image-large.jpg', 'Block title', 'markdown.md', 'class')`

Social macro (used in the footer) - `social('instagram', 'twitter', 'github', 'email', 'phone')`

#### Cookies

Users can control the cookies settings from `/cookies.html` this can then used to conditionally load scripts that include third party cookies, like Google Analytics, or in this instance [plauisble.io](https://plausible.io/). A cookie called jw_cookie_policy is created on first visit to the site. Currently the defaults are set as 

`{"essential":true,"analytics":true,"marketing":false};`

As such you can turn on or off scripts / cookies via the following conditional (currently set in the <head>)

```
//Get the 🍪 as a var
let getCookie = Cookies.getJSON('jw_cookie_policy');

//If analytics 🍪 is true 
if(getCookie.analytics === true) {
    console.log('Analytics 🍪 is set to true');   
} else {
    console.log('Analytics 🍪 is set to false');    
}

//If marketing 🍪 is true 
if(getCookie.marketing === true) {
    console.log('Marketing 🍪 is set to true');   
} else {
    console.log('Marketing 🍪 is set to false');   
}
```

---------------

## License

juckWonder is licensed under [MIT license](https://github.com/dogwonder/juckWonder/blob/master/LICENSE). 



## juckWonder - Nunjucks starter kit (static site generator)

A starter kit to build websites using [Nunjucks](https://mozilla.github.io/nunjucks/) a rich and powerful templating language for JavaScript.

- 🐛 Framework free
- 🐙 CMS free
- 🐝 Minimal CSS
- 🐬 Block based templating
- 🌈 Optimised for accessibility, speed and search engines, - [Lighthouse report](https://www.webpagetest.org/result/200122_KZ_b953489017e6ddb85c2d5d56a9d1fbda/)

## Requirements

| Prerequisite    | How to check | How to install                   |
| --------------- | ------------ | -------------------------------- |
| Node.js >= 10.0 | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 4.0.0   | `gulp -v`    | `npm install -g gulp`            |

---

## Installation

Install Node dependencies (Gulp 4.0.2, Nunjucks and a few others)

`npm install gulp --save-dev`
`npm install nunjucks`
`npm install`

Edit `gulpfile.js` for varibales such as folder names

---

### Build Process

`gulp` for development
`gulp build` for production (builds to /docs)

---

### Testing

### Testing

Uses [cypress.io](https://www.cypress.io/) and test are located in `cypress/integration/tests`

`./node_modules/.bin/cypress open`

or via the command line

`$(npm bin)/cypress run`

or via npm [via this method](https://www.26brains.com/2019/02/the-holy-grail-cypress-io-browser-sync-automatically-rerun-tests/)

GUI:

`npm run test`

Command line:

`npm run testCmd`

---

### Deployment

This has been set up for deploying tpo GitHub pages but it's static so there are many options

---

### Dependencies

This uses a few libraries and open-source plugins, all MIT licensed. Apart from maybe the cookie notice (local law permitting) none are essential and can be removed.

- [JavaScript Cookie v2.2.0](https://github.com/js-cookie/js-cookie)
- [Validate.js - A lightweight form validation script.](https://github.com/cferdinandi/validate)
- [PhotoSwipe- JavaScript gallery, no dependencies](https://github.com/dimsemenov/photoswipe)

---

### Customisation

There are some site variables that should be edited away from the boilerplate defaults

- Change site vars - `data.json`
- Site name - `/images/fav/manifest.json`
- Update social images in `/images/og`, `/images/fav/`, `logotype.svg`
- Update form endpoint in `contact.html` - currently using [Formspree](https://formspree.io/)
- Add your own analytics in `_analytics.njk`
- There is a little service worker in `sw.njk.js` that caches the main files and serves them up if there is no network access

#### Design tokens

npm run build-tokens

#### Page variables

Meta description (this also changes the twitter and facebook share text)

```
shortDesc = "Blah blah blah"
```

Body class - `set bodyClass = "jw-gallery"`
Page title - `set pageTitle = "Gallery"`

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

---

## License

juckWonder is licensed under [MIT license](https://github.com/dogwonder/juckWonder/blob/master/LICENSE).

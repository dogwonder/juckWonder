## wonderJucks 🗿 - a Nunjucks starter site

A starter kit to build websites using [Nunjucks](https://mozilla.github.io/nunjucks/) a rich and powerful templating language for JavaScript.

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

### Customisation

There are some site variables that should be edited away from the boilerplate defaults

- [ ] Change site vars - `data.json`
- [ ] Site name - `/images/fav/manifest.json`
- [ ] Update social images in `/images/og`, `/images/fav/`, `logotype.svg`
- [ ] Update form endpoint in `contact.html` - currently using [Formspree](https://formspree.io/)


#### Page variables 

Meta description (this also changes the twitter and facebook share text)

```
{{ siteDesc }}
{% set siteDesc = "Blah blah blah" %}
{{ siteDesc }}
```

Body class - `{% set body_class = "wj-gallery" %}`
Page title - `{% set page_title = "Gallery" %}`

Social (`footer.njk`) - `{{ social('dogwonder', 'dogwonder@gmail.com', '07967835097') }}`



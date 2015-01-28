(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-component-localiser
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> component-localiser plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-component-localiser` as a development dependency:

```shell
npm install --save-dev gulp-component-localiser
```

Then, add it to your `gulpfile.js`:

```javascript
var component-localiser = require("gulp-component-localiser");

gulp.src("./src/*.ext")
	.pipe(component-localiser({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### component-localiser(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-component-localiser
[npm-image]: https://badge.fury.io/js/gulp-component-localiser.png

[travis-url]: http://travis-ci.org/SteveCarratt/gulp-component-localiser
[travis-image]: https://secure.travis-ci.org/SteveCarratt/gulp-component-localiser.png?branch=master

[coveralls-url]: https://coveralls.io/r/SteveCarratt/gulp-component-localiser
[coveralls-image]: https://coveralls.io/repos/SteveCarratt/gulp-component-localiser/badge.png

[depstat-url]: https://david-dm.org/SteveCarratt/gulp-component-localiser
[depstat-image]: https://david-dm.org/SteveCarratt/gulp-component-localiser.png

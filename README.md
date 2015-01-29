# gulp-component-localiser
> component-localiser plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-component-localiser` as a development dependency by adding the following devDependency to your packages.json file:

```shell
"gulp-component-localiser" : "git://github.com/SimplifydigitalLtd/gulp-component-localiser.git",
```

Then, add it to your `gulpfile.js`:

```javascript
var componentLocaliser = require("gulp-component-localiser");
```
You can directly insert the translation structure
```javascript
var translations = {}

gulp.src("./src/*.ext")
	.pipe(componentLocaliser({translations: translations}))
	.pipe(gulp.dest("./dist"));
```

or provide a path to the file containing the translations

```javascript
gulp.src("./src/*.ext")
	.pipe(componentLocaliser({file: '/src/translatons/en.json}))
	.pipe(gulp.dest("./dist"));
```
## API

### component-localiser(options)

#### options.file
Type: `String`  
Default: ``

The path to the file containing the translations to use.

#### options.translations
Type: `Object`  
Default: `{}`

The full translation structure to use.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

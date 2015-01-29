var through = require("through2"),
	gutil = require("gulp-util"),
	ComponentHtmlLocator = require('./src/component-html-locator'),
	localiseScript = require('./src/script-localiser'),
	htmlLocaliser = require('./src/html-replacer');

module.exports = function (localisationInfo) {
	"use strict";

	// if necessary check for required param(s), e.g. options hash, etc.
	if (!localisationInfo) {
		throw new gutil.PluginError("gulp-component-localiser", "No param supplied");
	}

	// see "Writing a plugin"
	// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
	function componentLocaliser(file, enc, callback) {
		/*jshint validthis:true*/

		// Do nothing if no contents
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {

			// http://nodejs.org/api/stream.html
			// http://nodejs.org/api/child_process.html
			// https://github.com/dominictarr/event-stream

			// accepting streams is optional
			this.emit("error",
				new gutil.PluginError("gulp-component-localiser", "Stream content is not supported"));
			return callback();
		}

		// check if file.contents is a `Buffer`
		if (file.isBuffer()) {

			// manipulate buffer in some way
			// http://nodejs.org/api/buffer.html
			var script = String(file.contents);
			var htmlLocator = new ComponentHtmlLocator(script);

			var localisedScript = localiseScript(script, htmlLocator, htmlLocaliser(localisationInfo));

			file.contents = new Buffer(localisedScript);

			this.push(file);

		}
		return callback();
	}

	return through.obj(componentLocaliser);
};

/**
 * Created by scarratt on 29/01/2015.
 */

var gutil = require ('gulp-util'),
	_ = require('lodash');

module.exports = function(localisations) {
	var self = this;

	self.getLocalisedString = function(name) {
		var objectIdentifiers = name.split('.'),
			currentObject = localisations;

		for(var i =0; i < objectIdentifiers.length; i++){
			if (currentObject === undefined) {
				break;
			}

			currentObject = currentObject[objectIdentifiers[i]];
		}

		if (currentObject === undefined || currentObject === null || currentObject === ""){
			//new gutil.PluginError('gulp-component-localiser', 'requested string: ' + name + ' was not found.');
			return undefined;
		}

		if (!_.isString(currentObject)) {
			//new gutil.PluginError('gulp-component-localiser', 'requested string: ' + name + ' was not a string. Found value: ' + JSON.stringify(currentObject));
			return undefined;
		}

        return currentObject;
	}
};

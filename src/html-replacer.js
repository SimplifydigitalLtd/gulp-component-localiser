/**
 * Created by scarratt on 28/01/2015. Modified  by athajudeen on 29/01/2015.
 */
var cheerio = require('cheerio');
module.exports = function (localisationStore) {

	var self = this,
		attributeToFind = "[data-i18n]";

	self.localiseHtml = function(html) {

		var $ = cheerio.load(html, {
			normalizeWhitespace: false,
			xmlMode: false
		});

		var elementsToReplace =   $(attributeToFind).addBack(attributeToFind);
		for (var i = 0; i < elementsToReplace.length; i++) {
			var $element = $(elementsToReplace[i]);

            var attributeValue = $element.data('i18n');

			if (attributeValue === undefined){
				continue;
			}

			var localisedValue = localisationStore.getLocalisedString(attributeValue);

			if (localisedValue === undefined) {
				continue;
			}

			$element.text(localisedValue);
		}


		return $.html();
	};
};

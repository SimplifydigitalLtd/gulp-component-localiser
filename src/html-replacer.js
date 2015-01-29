/**
 * Created by scarratt on 28/01/2015. Modified  by athajudeen on 29/01/2015.
 */
$ = require('cheerio');
module.exports = function (localisationStore) {

	var self = this,
		attributeToFind = "[data-i18n]",
		attributeValue;

	self.localiseHtml = function(html) {

		var htmlRepresentation = $(html);

		var elementsToReplace =   htmlRepresentation.find(attributeToFind).addBack(attributeToFind);
		console.log(elementsToReplace.length);
		for (var i = 0; i < elementsToReplace.length; i++) {
			var $element = $(elementsToReplace[i]);

            var attributeValue = $element.data('i18n');

			if (attributeValue === undefined){
				console.log('attribute value was undefined');
				continue;
			}

			var localisedValue = localisationStore.getLocalisedString(attributeValue);

			if (localisedValue === undefined) {
				continue;
			}

			$element.text(localisedValue);
		}


		return htmlRepresentation.toString();
	};
};

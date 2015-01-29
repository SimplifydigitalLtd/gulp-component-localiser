/**
 * Created by scarratt on 28/01/2015. Modified  by athajudeen on 29/01/2015.
 */

module.exports = function (jsonTranslation, html, $) {

	var self = this,
		attributeToFind = "data-i18n",
		attributeValue;
	self.findHtmlAttribute = function() {

		attributeValue = $(html).attr(attributeToFind);
		if(!attributeValue){
			console.log("Warning - \""+attributeToFind+"\" not found: "+html);
		}
		console.log("\""+attributeToFind+"\" value: "+attributeValue);
		return attributeValue;
	};
};

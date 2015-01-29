/**
 * Created by scarratt on 29/01/2015.
 */

module.exports = function (script, htmlLocator, htmlReplacer) {
	var modifiedScript = script;

	while (htmlLocator.next()) {
		var html = modifiedScript.slice(htmlLocator.currentStartIndex, htmlLocator.currentEndIndex);

		var localisedHtml = htmlReplacer.localiseHtml(html);

		modifiedScript = modifiedScript.replace(html,localisedHtml);
	}

	return modifiedScript;
};

/**
 * Created by scarratt on 28/01/2015.
 */

module.exports = function (scriptText) {
	var self = this,
		regex = /(define\('text\!.*\.html',\[],function \(\) { return ')/g,
		match = scriptText.match(regex),
		currentIndex = match.length - 1,
		lastMatch;

	self.next = function(){
		if (currentIndex < 0) {
			self.currentStartIndex = self.currentEndIndex = undefined;
			return false;
		}

		var indexToSearchFrom = lastMatch ? self.currentStartIndex - (lastMatch.length +1) : self.currentStartIndex ;

        var startIndex = scriptText.lastIndexOf(match[currentIndex], indexToSearchFrom) + match[currentIndex].length;

        self.currentStartIndex = startIndex;

		var endIndex = scriptText.indexOf('\';});', startIndex);

		self.currentEndIndex = endIndex;

		lastMatch = match[currentIndex];

		currentIndex--;

		return true;
	};

};

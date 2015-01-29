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

		// move index to before start of last match so we don't match it again
		var indexToSearchFrom = lastMatch ? self.currentStartIndex - (lastMatch.length +1) : self.currentStartIndex ;

		// last index looks backwards through the script so we can replace strings and not worry about interfering with the indexes.
        var startIndex = scriptText.lastIndexOf(match[currentIndex], indexToSearchFrom) + match[currentIndex].length;

        self.currentStartIndex = startIndex;

		self.currentEndIndex = scriptText.indexOf('\';});', startIndex);

		lastMatch = match[currentIndex];

		currentIndex--;

		return true;
	};

};

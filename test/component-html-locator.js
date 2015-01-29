/**
 * Created by scarratt on 28/01/2015.
 */
"use strict";


delete require.cache[require.resolve("../src/component-html-locator")];

var ComponentHtmlLocator = require('../src/component-html-locator'),
	fs = require('fs'),
	should = require('should');

require("mocha");

describe('component html locator', function() {
	var fixture,
		sut;

	describe('for a simple case', function() {
		beforeEach(function() {
			fixture = fs.readFileSync("test/fixtures/component-html-locator/simple.txt");
			sut = new ComponentHtmlLocator(fixture.toString());
		});

		it('current start index is undefined', function() {
			(sut.currentStartIndex === undefined).should.be.true;
		});

		it('current end index is undefined', function() {
			(sut.currentEndIndex === undefined).should.be.true;
		});

		describe('when next called', function() {
			var nextResult;

			beforeEach(function() {
				nextResult = sut.next()
			});

			it('returns true', function() {
				nextResult.should.be.true;
			});

			it('current start index points to index of html start', function() {
				sut.currentStartIndex.should.eql(92);
			});

			it('current end index points to end of html', function() {
				sut.currentEndIndex.should.eql(155);
			});

			describe('then when next called again', function() {
				beforeEach(function() {
					nextResult = sut.next()
				});

				it('returns false', function() {
					nextResult.should.be.false;
				});

				it('current start index is undefined', function() {
					(sut.currentStartIndex === undefined).should.be.true;
				});

				it('current end index is undefined', function() {
					(sut.currentEndIndex === undefined).should.be.true;
				});
			})
		});
	});

	describe('for a two defines', function() {
		beforeEach(function() {
			fixture = fs.readFileSync("test/fixtures/component-html-locator/two-defines.txt");
			sut = new ComponentHtmlLocator(fixture.toString());
		});

		it('current start index is undefined', function() {
			(sut.currentStartIndex === undefined).should.be.true;
		});

		it('current end index is undefined', function() {
			(sut.currentEndIndex === undefined).should.be.true;
		});

		describe('when next called', function() {
			var nextResult;

			beforeEach(function() {
				nextResult = sut.next()
			});

			it('returns true', function() {
				nextResult.should.be.true;
			});

			it('current start index is undefined', function() {
				sut.currentStartIndex.should.eql(254);
			});

			it('current end index is undefined', function() {
				sut.currentEndIndex.should.eql(317);
			});

			describe('then when next called again', function() {
				beforeEach(function() {
					nextResult = sut.next()
				});

				it('returns true', function() {
					nextResult.should.be.true;
				});

				it('current start index points to index of html start', function() {
					sut.currentStartIndex.should.eql(92);
				});

				it('current end index points to end of html', function() {
					sut.currentEndIndex.should.eql(155);
				});

			})
		});
	})

	describe('for a two defines where they have the same module name', function() {
		beforeEach(function() {
			fixture = fs.readFileSync("test/fixtures/component-html-locator/two-defines-with-same-name.txt");
			sut = new ComponentHtmlLocator(fixture.toString());
		});

		it('current start index is undefined', function() {
			(sut.currentStartIndex === undefined).should.be.true;
		});

		it('current end index is undefined', function() {
			(sut.currentEndIndex === undefined).should.be.true;
		});

		describe('when next called', function() {
			var nextResult;

			beforeEach(function() {
				nextResult = sut.next()
			});

			it('returns true', function() {
				nextResult.should.be.true;
			});

			it('current start index is undefined', function() {
				sut.currentStartIndex.should.eql(253);
			});

			it('current end index is undefined', function() {
				sut.currentEndIndex.should.eql(316);
			});

			describe('then when next called again', function() {
				beforeEach(function() {
					nextResult = sut.next()
				});

				it('returns true', function() {
					nextResult.should.be.true;
				});
				it('current start index points to index of html start', function() {
					sut.currentStartIndex.should.eql(92);
				});

				it('current end index points to end of html', function() {
					sut.currentEndIndex.should.eql(155);
				});

			})
		});
	});

	describe('for a two defines and some javascript in between', function() {
		beforeEach(function() {
			fixture = fs.readFileSync("test/fixtures/component-html-locator/two-defines-with-javascript.txt");
			sut = new ComponentHtmlLocator(fixture.toString());
		});

		it('current start index is undefined', function() {
			(sut.currentStartIndex === undefined).should.be.true;
		});

		it('current end index is undefined', function() {
			(sut.currentEndIndex === undefined).should.be.true;
		});

		describe('when next called', function() {
			var nextResult;

			beforeEach(function() {
				nextResult = sut.next()
			});

			it('returns true', function() {
				nextResult.should.be.true;
			});

			it('current start index is undefined', function() {
				sut.currentStartIndex.should.eql(4708);
			});

			it('current end index is undefined', function() {
				sut.currentEndIndex.should.eql(4960);
			});

			describe('then when next called again', function() {
				beforeEach(function() {
					nextResult = sut.next()
				});

				it('returns true', function() {
					nextResult.should.be.true;
				});

				it('current start index points to index of html start', function() {
					sut.currentStartIndex.should.eql(96);
				});

				it('current end index points to end of html', function() {
					sut.currentEndIndex.should.eql(3987);
				});
			})
		});
	})
});

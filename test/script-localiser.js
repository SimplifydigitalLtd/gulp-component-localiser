/**
 * Created by scarratt on 29/01/2015.
 */


var localiseScript = require('../src/script-localiser'),
	fs = require('fs'),
	should = require('should'),
	sinon = require('sinon');


describe('Script Localiser', function () {
	var fixture,
		localisedScript,
		htmlLocatorMock,
		htmlReplacer;


	beforeEach(function () {
		fixture = fs.readFileSync("test/fixtures/script-localiser/simple.txt").toString();
		htmlLocatorMock = {next: sinon.stub()};
		htmlReplacer = sinon.stub();
	});

	describe('when only one match', function() {

		beforeEach(function() {
			htmlLocatorMock.next.onCall(0).returns(true);
			htmlLocatorMock.next.onCall(1).returns(false);
			htmlLocatorMock.currentStartIndex = 1;
			htmlLocatorMock.currentEndIndex = fixture.length - 2;

			htmlReplacer.returns('in');

			localisedScript = localiseScript(fixture, htmlLocatorMock, htmlReplacer)
		});

		it('calls html replacer', function () {
			htmlReplacer.calledOnce.should.be.true;
		});

		it('calls html replacer with correct substring', function() {
			htmlReplacer.firstCall.args[0].should.eql('ome simple text just for mockin');
		});

		it('returns script with matched part replaced with result of html localiser', function() {
			localisedScript.should.eql('Sing\n');
		});
	});

	describe('two matches', function() {
		beforeEach(function() {
			htmlLocatorMock.next.onCall(0).returns(true);
			htmlLocatorMock.next.onCall(1).returns(true);
			htmlLocatorMock.next.onCall(2).returns(false);
			localisedScript = localiseScript(fixture, htmlLocatorMock, htmlReplacer)
		});

		it('calls html replacer twice', function () {
			htmlReplacer.calledTwice.should.be.true;
		});
	})

});

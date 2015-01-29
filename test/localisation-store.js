/**
 * Created by scarratt on 29/01/2015.
 */


var LocalisationStore = require('../src/localisation-store'),
	should = require('should'),
	sinon = require('sinon'),
	gutil = require('gulp-util');

describe('localisation store', function () {

	describe('given a config one level deep', function () {
		var sut;

		beforeEach(function () {
			gutil.PluginError = sinon.spy();
			sut = new LocalisationStore({title: 'titleText'})
		});

		describe('when an existing value one level deep is requested', function () {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('title')
			});

			it('returns value for property requested', function () {
				actualValue.should.equal('titleText');
			});
		});

		describe('when a missing value one level deep is requested', function () {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('missing');

			});

			it('emits an error', function () {
				gutil.PluginError.called.should.be.true;
			});

			it('returns undefined', function() {
				(actualValue === undefined).should.be.true;
			})
		});

		describe('when a missing value two levels deep is requested', function () {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('missing.title');

			});

			it('emits an error', function () {
				gutil.PluginError.called.should.be.true;
			});

			it('returns undefined', function() {
				(actualValue === undefined).should.be.true;
			})
		});


	});

	describe('given a key two levels deep', function () {
		var sut;

		beforeEach(function () {
			gutil.PluginError = sinon.spy();
			sut = new LocalisationStore({levelTwo: {title: 'levelTwoTitleText'}, text: 'levelOneText'})
		});

		describe('when an exiting value one level deep is requested', function () {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('text')
			});

			it('returns value for property requested', function () {
				actualValue.should.equal('levelOneText');
			});
		});

		describe('when an existing value two levels deep is requested', function () {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('levelTwo.title')
			});

			it('returns value for property requested', function () {
				actualValue.should.equal('levelTwoTitleText');
			});
		});

		describe('when an missing value two levels deep is requested', function () {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('levelTwo.missing')
			});

			it('emits an error', function () {
				gutil.PluginError.called.should.be.true;
			});

			it('returns undefined', function() {
				(actualValue === undefined).should.be.true;
			})
		});

		describe('when a non-string value is requested', function() {
			var actualValue;

			beforeEach(function () {
				actualValue = sut.getLocalisedString('levelTwo')
			});

			it('emits an error', function () {
				gutil.PluginError.called.should.be.true;
			});

			it('returns undefined', function() {
				(actualValue === undefined).should.be.true;
			})
		})
	});
});

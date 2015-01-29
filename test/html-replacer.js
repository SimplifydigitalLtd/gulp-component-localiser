/**
 * Created by scarratt on 28/01/2015.
 */
'use strict';

var HtmlReplace = require('../src/html-replacer'),
	fs = require('fs'),
	should = require('should'),
	sinon = require('sinon');

require("mocha");


describe('html replacer', function() {

	var fixtureJson,
		fixtureHtml,
		sut,
		localisationStore;

	beforeEach(function() {
		localisationStore = {getLocalisedString : sinon.stub()};
		fixtureJson = fs.readFileSync("test/fixtures/html-replacer/jsonData.json");
		fixtureHtml = fs.readFileSync("test/fixtures/html-replacer/htmlData.txt");
		sut = new HtmlReplace(localisationStore);
	});

	describe('localise the given basic html text', function() {

		var outputString;

		beforeEach(function() {
			localisationStore.getLocalisedString.returns('Artilces épinglés');
			outputString = sut.localiseHtml(fixtureHtml.toString());
		});

		it('should insert he localised string in the html', function() {
			outputString.trim().should.eql('<div class="md-title" data-i18n="title">Artilces &#xE9;pingl&#xE9;s</div>');
		});

		it('should call localisation store with correct data attribute value', function() {
			localisationStore.getLocalisedString.firstCall.args[0].should.eql('title');
		})

	});

	describe('When there is no attribute for the given html', function() {

		var outputString;

		beforeEach(function() {
			localisationStore.getLocalisedString.returns('Artilces épinglés');
			fixtureHtml = fs.readFileSync("test/fixtures/html-replacer/htmlDataWithNoAttribute.txt");
			outputString = sut.localiseHtml(fixtureHtml.toString());
		});

		it('should not modify the html', function() {
			outputString.should.eql(fixtureHtml.toString());
		});

	});

	describe('When there is no localised string for the given basic html text', function() {

		var outputString;

		beforeEach(function() {
			localisationStore.getLocalisedString.returns(undefined);
			outputString = sut.localiseHtml(fixtureHtml.toString());
		});

		it('should not modify the html', function() {
			outputString.should.eql(fixtureHtml.toString());
		});

	});

	describe('When there are more than one strings need to be localised for the given basic text', function() {

		var outputString;

		beforeEach(function() {
			localisationStore.getLocalisedString.onCall(0).returns('One');
			localisationStore.getLocalisedString.onCall(1).returns('Two');
			fixtureHtml = fs.readFileSync("test/fixtures/html-replacer/htmlDataComplex.txt");
			outputString = sut.localiseHtml(fixtureHtml.toString());
		});

		it('should modify the html', function() {
			outputString.trim().should.eql('<div>' +
									'<div class="md-title" data-i18n="title">One</div>'+
									'<div class="md-title" data-i18n="title">Two</div>'+
									'</div>');
		});

	});





});

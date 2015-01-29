/**
 * Created by scarratt on 28/01/2015.
 */
'use strict';

var htmlReplace = require('../src/html-replacer'),
	fs = require('fs'),
	should = require('should'),
	assert = require('assert'),
	expect = require('expect'),
	$ = require('cheerio');

require("mocha");
require("chai");


describe('html replacer', function() {

	var fixtureJson,
		fixtureHtml,
		sut;

	beforeEach(function() {
		fixtureJson = fs.readFileSync("test/fixtures/html-replacer/jsonData.json");
		fixtureHtml = fs.readFileSync("test/fixtures/html-replacer/htmlData.txt");
		sut = new htmlReplace(fixtureJson.toString(),fixtureHtml.toString(),$);
	});

	describe('find attribute', function() {

		var findMatch;

		beforeEach(function() {
			findMatch = sut.findHtmlAttribute();
		});

		it('should find the data-i18n attribute value', function() {
			assert.equal(findMatch, 'title');
		});

	});

	describe('attribute not defined', function() {

		var findMatch;

		beforeEach(function() {
			fixtureHtml = fs.readFileSync("test/fixtures/html-replacer/htmlDataWithNoAttribute.json");
			sut = new htmlReplace(fixtureJson.toString(),fixtureHtml.toString(),$);
			findMatch = sut.findHtmlAttribute();
		});

		it('should not find the data-i18n attribute', function() {
			(findMatch === undefined).should.be.true;
		});

	});




});

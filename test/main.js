/*global describe, it*/
"use strict";

var fs = require("fs"),
	es = require("event-stream"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
	componentLocaliser = require("../");

describe("gulp-component-localiser", function () {

	var expectedSimpleFile = new gutil.File({
		path: "test/expected/simple.txt",
		cwd: "test/",
		base: "test/expected",
		contents: fs.readFileSync("test/fixtures/main/simple.txt")
	});

	var expectedComplicatedFile = new gutil.File({
		path: "test/expected/simple.txt",
		cwd: "test/",
		base: "test/expected",
		contents: fs.readFileSync("test/expected/main/complicated.txt")
	});

	it("should produce localised file via buffer for a simple case", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/simple.txt",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.readFileSync("test/fixtures/main/simple.txt")
		});

		var stream = componentLocaliser({translations:  {simple: {title : 'Simple'}}});

		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(String(expectedSimpleFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it("should produce localised file via buffer for a complicated case", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/complicated.txt",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.readFileSync("test/fixtures/main/complicated.txt")
		});

		var stream = componentLocaliser({translations: {complicated: {newsFeed: {title:'french news feed'}, channels: {title: 'french channels'}}}});

		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(String(expectedComplicatedFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it("should error on stream", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/simple.txt",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/main/simple.txt")
		});

		var stream = componentLocaliser({translations: {}});

		stream.on("error", function(err) {
			should.exist(err);
			done();
		});

		stream.on("data", function (newFile) {
			newFile.contents.pipe(es.wait(function(err, data) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});

	/*
	it("should produce expected file via stream", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/simple.txt",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/simple.txt")
		});

		var stream = componentLocaliser("World");

		stream.on("error", function(err) {
			should.exist(err);
			done();
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			newFile.contents.pipe(es.wait(function(err, data) {
				should.not.exist(err);
				data.should.equal(String(expectedFile.contents));
				done();
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
	*/
});

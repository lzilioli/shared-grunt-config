'use strict';

var theConfig = {
	todo: [
		'<%= paths.js %>'
	],
	jsdoc: [
		'<%= paths.js %>',
		'README.md',
		'package.json'
	],
	clientJs: [],
	serverJs: [
		'*.js',
		'grunt/**/*.js',
		'lib/**/*.js'
	],
	js: [
		'<%= paths.serverJs %>',
		'<%= paths.clientJs %>'
	],
	clean: [
		'docs.ignore'
	]
};

module.exports = theConfig;

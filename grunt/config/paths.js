'use strict';

module.exports = {
	todo: [
		'<%= paths.js %>'
	],
	jsdoc: [
		'<%= paths.js %>',
		'README.md',
		'package.json'
	],
	js: [
		'*.js',
		'grunt/**/*.js',
		'lib/**/*.js'
	],
	clean: [
		'docs.ignore'
	]
};

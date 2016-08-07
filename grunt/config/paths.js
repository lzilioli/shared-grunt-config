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
	clientJs: [
		'<%= sharedConfigRoot %>/empty.js %>'
	],
	serverJs: [
		'<%= sharedConfigRoot %>/empty.js %>',
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

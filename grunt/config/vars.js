'use strict';

var _ = require( 'underscore' );

var theConfig = {
	paths: {
		jsdoc: [
			'<%= vars.paths.js %>',
			'!tests/**/*.js',
			'<%= vars.paths.es6 %>',
			'<%= vars.paths.es6Ignore %>',
			'<%= sharedConfig.curRepo %>/README.md',
			'<%= sharedConfig.curRepo %>/package.json'
		],
		test: [],
		todo: [
			'*.md'
		],
		js: [
			'*.js',
			'grunt/**/*.js',
			'lib/**/*.js',
			'bin/**/*.js',
			'test/**/*.js',
			'tests/**/*.js'
		],
		es6: [
			'*.es6',
			'lib/**/*.es6',
			'bin/**/*.es6',
			'test/**/*.es6',
			'tests/**/*.es6'
		],
		devScripts: [
			'<%= vars.paths.js %>',
			'<%= vars.paths.es6 %>',
			'<%= vars.paths.es6Ignore %>'
		]
	}
};

theConfig.paths.es6Compiled = [];
theConfig.paths.es6Ignore = [];

_.each( theConfig.paths.es6, function( val, idx, list ) {
	theConfig.paths.es6Compiled.push( val + '.js' );
	theConfig.paths.es6Compiled.push( val + '.js.map' );
	theConfig.paths.es6Ignore.push( '!' + val + '.js' );
	theConfig.paths.es6Ignore.push( '!' + val + '.js.map' );
} );

module.exports = theConfig;

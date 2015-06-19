'use strict';

var _ = require( 'underscore' );

var theConfig = {
	paths: {
		// These keys are populated by add* methods defined in shared-grunt-config.js
		test: [],
		todo: [],

		jsdoc: [
			'<%= vars.paths.js %>',
			'<%= vars.paths.es6 %>',
			'<%= vars.paths.es6Ignore %>',
			'<%= sharedConfig.curRepo %>/README.md',
			'<%= sharedConfig.curRepo %>/package.json'
		],
		js: [
			'*.js',
			'grunt/**/*.js',
			'lib/**/*.js',
			'bin/**/*.js',
			'!lib/**/*.es6.js'
		],
		// these are js files for tests
		tests: [
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
			'<%= vars.paths.tests %>',
			'<%= vars.paths.es6 %>',
			'<%= vars.paths.es6Ignore %>'
		],
		gen: [
			'<%= sharedConfig.curRepo %>/coverage.ignore',
			'<%= sharedConfig.curRepo %>/jsdoc.ignore'
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

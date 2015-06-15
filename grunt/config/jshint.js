'use strict';

var path = require( 'path' );
var extend = require( 'extend' );

var files = {
	src: [ '<%= vars.paths.js %>', '<%= vars.paths.es6 %>', '<%= vars.paths.es6Ignore %>' ]
};
var filesTest = {
	src: [ '<%= vars.paths.tests %>' ]
};

module.exports = function( grunt ) {

	var rcPath = grunt.file.exists( '.jshintrc' ) ? '.jshintrc' : path.join( __dirname, '../../.jshintrc' );
	var testRc = grunt.file.readJSON( path.join( __dirname, '../../.test-jshintrc' ) );

	return {
		options: extend( {
			reporter: require( 'jshint-stylish' ),
		}, grunt.file.readJSON( rcPath ) ),
		strict: {
			files: files,
			options: {
				force: false
			}
		},
		lax: {
			files: files,
			options: {
				force: true
			}
		},
		// TODO use the right file glob for tests only, exclude tests from normal lint
		'test-strict': {
			files: filesTest,
			options: testRc
		},
		'test-lax': {
			files: filesTest,
			options: extend( {
				force: true
			}, testRc )
		}
	};
};

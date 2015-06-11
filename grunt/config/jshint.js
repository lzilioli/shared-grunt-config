'use strict';

var path = require( 'path' );
var extend = require( 'extend' );

var files = {
	src: [ '<%= vars.paths.js %>', '<%= vars.paths.es6 %>', '<%= vars.paths.es6Ignore %>' ]
};

module.exports = function( grunt ) {

	var rcPath = grunt.file.exists( '.jshintrc' ) ? '.jshintrc' : path.join( __dirname, '../../.jshintrc' );

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
		}
	};
};

'use strict';

var path = require( 'path' );

module.exports = function( grunt ) {
	return {
		options: {
			reporter: require( 'jshint-stylish' )
		},
		client: {
			options: grunt.file.readJSON( path.join( __dirname, '../../.jshintrc-client' ) ),
			files: {
				src: [ '<%= paths.clientJs %>' ]
			}
		},
		server: {
			options: grunt.file.readJSON( path.join( __dirname, '../../.jshintrc-server' ) ),
			files: {
				src: [ '<%= paths.serverJs %>' ]
			}
		}
	};
};

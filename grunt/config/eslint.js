'use strict';

var path = require( 'path' );

// TODO enforce 'use-strict' with eslint

module.exports = function( grunt ) {
	return {
		options: {
			reporter: require( 'jshint-stylish' ),
			configFile: path.join( __dirname, '../../.eslintrc' )
		},
		client: {
			options: {
				fix: true,
				rules: grunt.file.readJSON( path.join( __dirname, '../../.eslintrc-client-rules' ) ),
				globals: ['$']
			},
			files: [{
				expand: true,
				cwd: path.resolve(),
				src: ['<%= paths.clientJs %>']
			}]
		},
		server: {
			options: {
				fix: true,
				rules: grunt.file.readJSON( path.join( __dirname, '../../.eslintrc-server-rules' ) )
			},
			files: [{
				expand: true,
				cwd: path.resolve(),
				src: ['<%= paths.serverJs %>']
			}]
		},
		'client-no-fix': {
			options: {
				fix: false,
				rules: grunt.file.readJSON( path.join( __dirname, '../../.eslintrc-client-rules' ) ),
				globals: ['$']
			},
			files: [{
				expand: true,
				cwd: path.resolve(),
				src: ['<%= paths.clientJs %>']
			}]
		},
		'server-no-fix': {
			options: {
				fix: false,
				rules: grunt.file.readJSON( path.join( __dirname, '../../.eslintrc-server-rules' ) )
			},
			files: [{
				expand: true,
				cwd: path.resolve(),
				src: ['<%= paths.serverJs %>']
			}]
		}
	};
};

'use strict';

var path = require( 'path' );

module.exports = function() {
	return {
		options: {
			reporter: require( 'jshint-stylish' )
		},
		lint: {
			options: {
				fix: false
			},
			files: [{
				expand: true,
				cwd: path.resolve(),
				src: ['<%= paths.js %>']
			}]
		},
		fix: {
			options: {
				fix: true
			},
			files: [{
				expand: true,
				cwd: path.resolve(),
				src: ['<%= paths.js %>']
			}]
		}
	};
};

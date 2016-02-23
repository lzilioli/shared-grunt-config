'use strict';
// https://www.npmjs.com/package/grunt-jsdoc

module.exports = function( grunt ) {
	return {
		options: {
			configure: '<%= sharedConfigRoot %>/.jsdocrc',
			template: '<%= sharedConfigRoot %>/node_modules/minami',
			ignoreWarnings: !grunt.option( 'w-jsd' )
		},
		dev: {
			src: '<%= paths.jsdoc %>',
			options: {
				destination: 'docs.ignore'
			}
		},
		dist: {
			src: '<%= paths.jsdoc %>',
			options: {
				destination: 'docs'
			}
		}
	};
};

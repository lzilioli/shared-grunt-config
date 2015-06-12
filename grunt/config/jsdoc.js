// https://www.npmjs.com/package/grunt-jsdoc

module.exports = function(grunt) {
	return {
		options: {
			configure: '<%= sharedConfig.root %>/.jsdocrc',
			template: '<%= sharedConfig.root %>/node_modules/minami',
			ignoreWarnings: !grunt.option('w-jsd')
		},
		dev: {
			jsdoc: '<%= sharedConfig.root %>/node_modules/.bin/jsdoc',
			src: '<%= vars.paths.jsdoc %>',
			options: {
				destination: '<%= sharedConfig.curRepo %>/docs.ignore'
			}
		},
		dist: {
			jsdoc: '<%= sharedConfig.root %>/node_modules/.bin/jsdoc',
			src: '<%= vars.paths.jsdoc %>',
			options: {
				destination: '<%= sharedConfig.curRepo %>/docs'
			}
		}
	}
};

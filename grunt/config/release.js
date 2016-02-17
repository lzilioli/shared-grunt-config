'use strict';

var _ = require( 'lodash' );

module.exports = function( grunt ) {
	var pkg = grunt.file.readJSON( 'package.json' );

	var noWrite = grunt.option( 'no-write' );
	var gruntDebug = grunt.option( 'debug' );

	grunt.registerTask(
		'_logPublishDisabled',
		'internal task',
		function() {
			if ( pkg.private ) {
				grunt.log.writeln( 'Package is private in package.json. Running grunt release will not publish it to npm.' );
			}
		}
	);

	var afterBumpArr = [];
	if ( !noWrite ) {
		afterBumpArr.push( 'jsdoc:dist' );
	}

	var filesToStageArr = _.filter( [
		'docs/'
	], function( f ) {
		return grunt.file.exists( f );
	} );

	return {
		options: {
			silent: false,
			bump: true,
			changelog: true,
			add: true,
			noVerify: true,

			commit: !gruntDebug,
			tag: !gruntDebug,
			push: !gruntDebug,
			pushTags: !gruntDebug,
			npm: !pkg.private && !gruntDebug,

			commitMessage: '-- v<%= version %> RELEASE --',
			tagName: 'v<%= version %>',
			changelogText: '# v<%= version %> - **<%= grunt.template.today("yyyy-mm-dd") %>**\n',

			afterBump: afterBumpArr,
			beforeRelease: ['_logPublishDisabled', 'clean'],
			filesToStage: filesToStageArr
		}
	};
};

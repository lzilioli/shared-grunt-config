'use strict';

module.exports = function( grunt ) {
	var pkg = grunt.file.readJSON( 'package.json' );
	var gruntDebug = grunt.option( 'debug' );

	grunt.registerTask(
		'_logPublishDisabled',
		'shared-grunt-config:internal task',
		function() {
			if ( pkg.private ) {
				grunt.log.writeln( 'Package is private in package.json. Running grunt release will not publish it to npm.' );
			}
		}
	);

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
			beforeRelease: ['_logPublishDisabled']
		}
	};
};

'use strict';

var path = require( 'path' );

module.exports = function( grunt ) {
	var preamble = 'node ';
	var cover = path.join( '<%= sharedConfig.root %>', 'node_modules/istanbul/lib/cli.js' ) + ' cover -x Gruntfile* --dir coverage.ignore';
	var args = ' <%= sharedConfig.root %>/node_modules/mocha/bin/_mocha <%= sharedConfig.root %>/test-runner.js <%= sharedConfig.curRepo %>';
	if ( grunt.option( 'no-cover' ) ) {
		cover = '';
	}
	return {
		options: {},
		test: {
			command: preamble + cover + args
		},
		test_no_coverage: {
			command: preamble + args
		}
	};
};

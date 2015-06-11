'use strict';

var path = require( 'path' );

module.exports = function( grunt ) {
	var cover = path.join( '<%= sharedConfig.root %>', 'node_modules/istanbul/lib/cli.js' ) + ' cover -x Gruntfile*';
	return {
		options: {},
		test: {
			command: 'node ' + cover + ' <%= sharedConfig.root %>/node_modules/mocha/bin/_mocha <%= sharedConfig.root %>/test/runner.js <%= sharedConfig.curRepo %>'
		}
	};
};

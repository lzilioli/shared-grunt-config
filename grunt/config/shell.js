// Istanbul is taking a long time to start running, so commenting
// out for now
// var path = require( 'path' );

module.exports = function( grunt ) {
	return {
		options: {},
		test: {
			command: 'node ' + /* path.join( '<%= sharedConfig.root %>', 'node_modules/istanbul/lib/cli.js' ) + ' cover -x Gruntfile* ' + */ '<%= sharedConfig.root %>/node_modules/mocha/bin/_mocha --reporter spec <%= sharedConfig.root %>/test/runner.js <%= sharedConfig.curRepo %>'
		}
	};
};

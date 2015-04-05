var path = require( 'path' );

module.exports = function( grunt ) {
	grunt.registerTask( 'dry-js', 'Invokes flay-js to detect copy/pasted JavaScript code.', function() {
		var shell = require( 'shelljs' );
		shell.config.silent = true;
		var hasFlay = shell.exec( 'gem list | grep flay' ).output.indexOf( 'flay-js' ) !== -1;
		shell.config.silent = false;
		if ( hasFlay ) {
			shell.exec( 'flay -e ' + path.join( grunt.config.get( 'sharedConfig.root' ), '.flayignore' ) + ' ' + grunt.config.get( 'sharedConfig.curRepo' ) );
		} else {
			grunt.log.warn( 'You need to have flay installed. Run `gem install flay-js` and re-run `grunt dry-js`.' );
		}
	} );
};

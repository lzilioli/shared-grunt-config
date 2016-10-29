'use strict';
module.exports = function( grunt ) {
	grunt.registerTask( 'logo', 'Log the contents of the grunt config.', console.log.bind( undefined, grunt ) );
	grunt.registerTask( 'cfg', 'Log the contents of part of the config:<path.in.config>', function( pth ) {
		console.log( grunt.config.get( pth ) );
	} );
};

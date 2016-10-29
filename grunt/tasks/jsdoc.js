'use strict';

module.exports = function( grunt ) {
	grunt.task.renameTask( 'jsdoc', '_jsdoc' );
	grunt.registerTask(
		'jsdoc',
		'Wrapper for jsdoc task that incorporates logic for shared-grunt-config.',
		function( target ) {
			if ( target ) {
				grunt.task.renameTask( '_jsdoc', 'jsdoc' );
				grunt.task.run( [`jsdoc${target ? `:${target}` : ''}`] );
			} else {
				grunt.fail.fatal( [
					'jsdoc task must be run with a target {dev,dist}. You should',
					'generally rely on the watch, o-docs, or pre-release tasks',
					'for purposes of generating jsdoc.'
				].join( ' ' ) );
			}
		}
	);
};

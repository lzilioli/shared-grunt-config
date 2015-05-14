var path = require( 'path' );
module.exports = function( grunt ) {

	var rcPath = grunt.file.exists( '.jsbeautifyrc' ) ? '.jsbeautifyrc' : path.join( __dirname, '../../.jsbeautifyrc' );

	var jsSource = [ '<%= vars.paths.js %>', '<%= vars.paths.es6Ignore %>' ];

	return {
		act: {
			src: jsSource,
			options: {
				js: grunt.file.readJSON( rcPath )
			}
		},
		strict: {
			src: jsSource,
			options: {
				mode: 'VERIFY_ONLY',
				js: grunt.file.readJSON( rcPath )
			}
		}
	};
};

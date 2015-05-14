var path = require( 'path' );
module.exports = function( grunt ) {

	var rcPath = grunt.file.exists( '.jscsrc' ) ? '.jscsrc' : path.join( __dirname, '../../.jscsrc' );

	var files = {
		src: [ '<%= vars.paths.es6 %>', '<%= vars.paths.es6Ignore %>' ]
	};

	return {
		options: {
			reporter: require( 'jscs-stylish' ).path
		},
		act: {
			files: files,
			options: {
				config: rcPath,
				esnext: true,
				force: true,
				fix: true
			}
		},
		strict: {
			files: files,
			options: {
				config: rcPath,
				esnext: true
			}
		},
		lax: {
			files: files,
			options: {
				config: rcPath,
				esnext: true,
				force: true
			}
		}
	};
};

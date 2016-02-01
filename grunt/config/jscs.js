'use strict';

var path = require( 'path' );
var extend = require( 'extend' );
module.exports = function( grunt ) {

	var jscsConfig = {
		files: {
			src: [ '<%= paths.js %>' ]
		},
		options: {
			config: path.join( __dirname, '../../.jscsrc' ),
			reporter: require( 'jscs-stylish' ).path,
			esnext: true
		}
	};

	var lintConfig = extend( true, {
		options: {
			force: false,
			fix: false
		}
	}, jscsConfig );
	var fixConfig = extend( true, {
		options: {
			force: true,
			fix: true
		}
	}, jscsConfig );

	return {
		lint: lintConfig,
		fix: fixConfig
	};
};

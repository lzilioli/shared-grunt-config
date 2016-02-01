'use strict';

/* istanbul ignore next */
module.exports = function( grunt ) {
	require( './' )( __dirname, grunt )
		.addTodo( [ 'grunt/config/aliases.yaml' ] );
};

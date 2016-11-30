'use strict';

/* istanbul ignore next */
module.exports = function( grunt ) {
	require( './' )( grunt )
		.addTodo( ['grunt/config/aliases.yaml'] );
};

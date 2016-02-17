'use strict';

/* istanbul ignore next */
module.exports = function( grunt ) {
	require( './' )( __dirname, grunt )
		// silence the task complaining about no files in this repo
		.addClientJs( ['empty.js'] )
		.addTodo( ['grunt/config/aliases.yaml'] );
};

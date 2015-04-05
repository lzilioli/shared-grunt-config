/* istanbul ignore next */
module.exports = function( grunt ) {
	var config = require( './' )( __dirname, grunt );
	config.addTodo( [ 'grunt/config/aliases.yaml' ] );
};

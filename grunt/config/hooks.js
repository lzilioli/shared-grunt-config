var path = require( 'path' );

module.exports = {
	main: {
		options: {
			onDone: 'Thanks for being a good citizen and using the hooks.',
			hookDir: path.join( __dirname, '../hooks' ),
			hooks: [ {
				name: 'post-commit',
				hookType: 'post-commit',
				description: [
					'inform the dev about the current state of the branch.',
					'This will spit out jshint errors, but not fail if present.'
				].join( '\n' )
			}, {
				name: 'pre-push',
				hookType: 'pre-push',
				description: 'ensure that there are no build or workflow-breaking issues.'
			} ]
		}
	}
};

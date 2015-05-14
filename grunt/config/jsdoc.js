var path = require( 'path' );
module.exports = {
	dev: {
		jsdoc: path.join( __dirname, '../../node_modules/.bin/jsdoc' ),
		src: '<%= vars.paths.jsdoc %>',
		options: {
			dest: '<%= sharedConfig.curRepo %>/doc',
			configure: '<%= sharedConfig.root %>/.jsdocrc',
			template: path.join( __dirname, '../../node_modules/minami' )
		}
	}
};

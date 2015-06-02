var path = require( 'path' );
module.exports = {
	options: {
		configure: '<%= sharedConfig.root %>/.jsdocrc',
		template: path.join( __dirname, '../../node_modules/minami' )
	},
	dev: {
		jsdoc: path.join( __dirname, '../../node_modules/.bin/jsdoc' ),
		src: '<%= vars.paths.jsdoc %>',
		options: {
			destination: '<%= sharedConfig.curRepo %>/docs.ignore'
		}
	},
	dist: {
		jsdoc: path.join( __dirname, '../../node_modules/.bin/jsdoc' ),
		src: '<%= vars.paths.jsdoc %>',
		options: {
			destination: '<%= sharedConfig.curRepo %>/docs'
		}
	}
};

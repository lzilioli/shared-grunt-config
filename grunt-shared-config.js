var _ = require( 'underscore' );

/* istanbul ignore next */
module.exports = function( repoRoot, grunt ) {

	init.apply( this, arguments );

	return {
		addJs: getMergeFn( 'js' ),
		addTodo: getMergeFn( 'todo' ),
		addTest: getMergeFn( 'test' )
	};

	function getMergeFn( forKey ) {
		return function( vals ) {
			mergeConfig( forKey, vals );
		};
	}

	function mergeConfig( key, value ) {
		if ( !_.isArray( value ) ) {
			throw new Error( 'Argument to addJs or addTodo must be an array.' );
		}
		var curConfig = grunt.config.get( 'vars.paths.' + key );
		curConfig.push( value );
		grunt.config.set( 'vars.paths.' + key, _.flatten( curConfig ) );
	}

};

/* istanbul ignore next */
function init( repoRoot, grunt ) {

	var path = require( 'path' );

	grunt.file.setBase( __dirname );

	grunt.loadTasks( 'grunt/tasks' );

	require( 'load-grunt-tasks' )( grunt );

	grunt.file.setBase( repoRoot );

	require( 'load-grunt-config' )( grunt, {
		// path to task.js files
		configPath: path.join( __dirname, '/grunt/config' ),
		// data passed into config. Can use with <%= {something within data} %>
		data: {
			'sharedConfig': {
				root: __dirname,
				curRepo: repoRoot
			}
		},
		// can optionally pass options to load-grunt-tasks.
		// If you set to false, it will disable auto loading tasks.
		loadGruntTasks: false,
		// can post process config object before it gets passed to grunt
		postProcess: function( /* config */) {}
	} );

}

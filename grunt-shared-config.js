var _ = require( 'underscore' );

/* istanbul ignore next */
module.exports = function( repoRoot, grunt ) {

	init.apply( this, arguments );

	// wrap the jsdoc task
	var isJsDocEnabled = false;
	grunt.task.renameTask( 'jsdoc', '_jsdoc' );
	grunt.config( '_jsdoc', grunt.config( 'jsdoc' ) );

	grunt.registerTask( 'jsdoc', function( target ) {
		if ( target && isJsDocEnabled ) {
			grunt.task.run( [ '_jsdoc' + ( target ? ':' + target : '' ) ] );
		} else if ( !target && isJsDocEnabled ) {
			grunt.fail.fatal( 'jsdoc task must be run with a target {dev,dist}. You should generally rely on the watch, o-docs, or pre-release tasks for purposes of generating jsdoc.' );
		} else {
			grunt.log.writeln( 'jsdoc task not enabled for this repo.' );
			grunt.log.writeln( 'To enable jsdoc invoke enableJsdoc() on the object returned from shared-grunt-config.' );
		}
	} );

	// Wrap the release task
	grunt.task.renameTask( 'release', '_release' );
	grunt.config( '_release', grunt.config( 'release' ) );
	grunt.registerTask( 'release', 'Release the module.', function() {
		grunt.task.run( [ '_pre-release', '_release' ] );
	} );

	// wrap the babel task
	var isES6Enabled = false;
	grunt.task.renameTask( 'babel', '_babel' );
	grunt.config( '_babel', grunt.config( 'babel' ) );

	grunt.registerTask( 'babel', function( target ) {
		if ( isES6Enabled ) {
			grunt.task.run( [ '_babel' + ( target ? ':' + target : '' ) ] );
		} else {
			grunt.log.writeln( 'babel task not enabled for this repo.' );
			grunt.log.writeln( 'To enable babel invoke enableES6() on the object returned from shared-grunt-config.' );
		}
	} );

	return {
		addJs: getMergeFn( 'js' ),
		addJsdoc: getMergeFn( 'jsdoc' ),
		addTodo: getMergeFn( 'todo' ),
		addTest: getMergeFn( 'test' ),
		enableJsdoc: function() {
			isJsDocEnabled = true;
		},
		enableES6: function() {
			isES6Enabled = true;
		}
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

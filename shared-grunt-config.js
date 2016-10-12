/* eslint prefer-template: 0 */
/* eslint no-empty-function: 0 */
/* eslint prefer-rest-params: 0 */
/* eslint no-console: 1 */
'use strict';

var _ = require( 'lodash' );

/* istanbul ignore next */
module.exports = function( repoRoot, grunt ) {

	// Because the default of false sucks.......
	grunt.option( 'stack', true );

	init.apply( this, arguments );

	// wrap the jsdoc task
	grunt.task.renameTask( 'jsdoc', '_jsdoc' );
	grunt.registerTask(
		'jsdoc',
		'Wrapper for jsdoc task that incorporates logic for shared-grunt-config.',
		function( target ) {
			if ( target ) {
				grunt.task.renameTask( '_jsdoc', 'jsdoc' );
				grunt.task.run( ['jsdoc' + ( target ? ':' + target : '' )] );
			} else {
				grunt.fail.fatal( [
					'jsdoc task must be run with a target {dev,dist}. You should',
					'generally rely on the watch, o-docs, or pre-release tasks',
					'for purposes of generating jsdoc.'
				].join( ' ' ) );
			}
		}
	);

	// Helpers for debugging
	grunt.registerTask( 'logo', console.log.bind( undefined, grunt ) );
	grunt.registerTask( 'cfg', function( pth ) {
		console.log( grunt.config.get( pth ) );
	} );

	var SHAREDCFG = {
		addClientJs: getMergeFn( 'clientJs' ),
		addServerJs: getMergeFn( 'serverJs' ),
		addJsdoc: getMergeFn( 'jsdoc' ),
		addTodo: getMergeFn( 'todo' ),
		addClean: getMergeFn( 'clean' ),
		addEslintRules: function( newRules ){
			var rawConfig = grunt.config.getRaw( 'eslint' );
			_.each( rawConfig, function( config, target ){
				var rules = _.get( config, 'options.rules', false );
				if( !rules ) {
					return;
				}
				_.each( newRules, function( setting, rule ){
					config.options.rules[ rule ] = setting;
				} );
				rawConfig[ target ] = config; // TODO is this needed?
			} );
			grunt.config.set( 'eslint', rawConfig );
			return SHAREDCFG;
		}
	};

	return SHAREDCFG;

	function getMergeFn( forKey ) {
		return function( vals ) {
			mergeConfig( forKey, vals );
			return SHAREDCFG;
		};
	}

	function mergeConfig( key, value ) {
		if ( !_.isArray( value ) ) {
			throw new Error( 'Argument to add' + key.charAt( 0 ).toUpperCase() + key.slice( 1 ) + ' must be an array.' );
		}
		var curConfig = grunt.config.get( 'paths.' + key );
		curConfig.push( value );
		grunt.config.set( 'paths.' + key, _.flatten( curConfig ) );
	}

};

function init( repoRoot, grunt ) {

	var path = require( 'path' );

	// Load grunt tasks while the grunt base directory is this shared repo
	grunt.loadTasks( path.join( __dirname,'grunt/tasks' ) );
	require( 'load-grunt-tasks' )( grunt );

	// Load the configs
	require( 'load-grunt-config' )( grunt, {

		// path to task.js files
		configPath: path.join( __dirname, '/grunt/config' ),

		// data passed into config. Can use with <%= {something within data} %>
		data: {
			'sharedConfigRoot': __dirname
		},

		// can optionally pass options to load-grunt-tasks.
		// If you set to false, it will disable auto loading tasks.
		loadGruntTasks: false, // we do this ourselves above
		// can post process config object before it gets passed to grunt
		postProcess: function( /* config */ ) {}
	} );

}

/* eslint prefer-template: 0 */
/* eslint no-empty-function: 0 */
/* eslint prefer-rest-params: 0 */
'use strict';

var _ = require( 'lodash' );
var deprecate = require( 'depd' )( 'shared-grunt-config' );
var loadGruntTasks = require( 'load-grunt-tasks' );
var loadGruntConfig = require( 'load-grunt-config' );
var path = require( 'path' );

/* istanbul ignore next */
module.exports = function( grunt, config ) {

	var defaults = {
		// path
		alsoLoadFrom: false
	};
	config = _.defaults( {}, config, defaults );

	// Because the default of false sucks.......
	grunt.option( 'stack', true );

	loadGruntTasks( grunt );
	grunt.loadTasks( path.join( __dirname, 'grunt/tasks' ) );

	if( !grunt.file.exists( '.eslintrc' ) ) {
		grunt.task.renameTask( 'eslint', '__THIS_TASK_WILL_FAIL' );
		grunt.registerTask(
			'eslint',
			'Log a message about missing .eslintrc file',
			function(){
				grunt.log.warn( 'Your repo is missing an .eslintrc file. Create one or run'.yellow );
				grunt.log.warn( '  grunt eslinit'.grey );
			}
		);
	}

	var loadPaths = [path.join( __dirname, '/grunt/config' )];
	if( config.alsoLoadFrom ) {
		loadPaths.push( config.alsoLoadFrom );
	}
	_.chain( loadPaths )
	.map( function( configDir, idx ){
		var loadConfig = {
			init: false,
			configPath: configDir,
			loadGruntTasks: false
		};
		if( idx === 0 ) {
			_.extend( loadConfig, {
				// data passed into config. Can use with
				// <%= {something within data} %>
				data: {
					'sharedConfigRoot': __dirname
				}
			} );
		}
		return loadGruntConfig( grunt, loadConfig );
	} )
	// TODO look at what is being overwritten on each iteration of the loop
	.each( grunt.config.merge )
	.value();

	var SHAREDCFG = {
		addJs: getMergeFn( 'js' ),
		addClientJs: getDeprecated( getMergeFn( 'js' ), 'addClientJs' ),
		addServerJs: getDeprecated( getMergeFn( 'js' ), 'addServerJs' ),
		addTodo: getMergeFn( 'todo' ),
		addClean: getMergeFn( 'clean' ),
		addEslintRules: function(){
			deprecate( 'addEslintRules is now a noop. Run `grunt eslinit` to initialize eslint, and then add the rules to the appropriate .eslintrc files' );
			return SHAREDCFG;
		}
	};

	return SHAREDCFG;

	function getDeprecated( mergefn, deprecatedName ){
		return function( vals ){
			deprecate( deprecatedName + ' is deprecated. Use addJs instead.' );
			return mergefn( vals );
		};
	}

	function getMergeFn( forKey ) {
		return function ( vals ) {
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

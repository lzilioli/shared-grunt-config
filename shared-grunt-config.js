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
module.exports = function( repoRoot, grunt, config ) {

	var defaults = {
		// path
		alsoLoadFrom: false
	};
	config = _.defaults( {}, config, defaults );

	// Because the default of false sucks.......
	grunt.option( 'stack', true );

	loadGruntTasks( grunt );
	grunt.loadTasks( path.join( __dirname, 'grunt/tasks' ) );

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

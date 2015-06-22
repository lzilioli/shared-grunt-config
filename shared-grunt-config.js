'use strict';

var _ = require( 'underscore' );
var fs = require( 'fs' );
var path = require( 'path' );
var shell = require( 'shelljs' );

/* istanbul ignore next */
module.exports = function( repoRoot, grunt ) {

	// Because the default of false sucks.......
	grunt.option( 'stack', true );

	init.apply( this, arguments );

	// wrap the jsdoc task
	var isJsDocEnabled = false;
	grunt.task.renameTask( 'jsdoc', '_jsdoc' );
	grunt.config( '_jsdoc', grunt.config( 'jsdoc' ) );
	grunt.registerTask(
		'jsdoc',
		'Wrapper for jsdoc task that incorporates logic for shared-grunt-config.',
		function( target ) {
			if ( target && isJsDocEnabled ) {
				grunt.task.run( [ '_jsdoc' + ( target ? ':' + target : '' ) ] );
			} else if ( !target && isJsDocEnabled ) {
				grunt.fail.fatal( 'jsdoc task must be run with a target {dev,dist}. You should generally rely on the watch, o-docs, or pre-release tasks for purposes of generating jsdoc.' );
			} else {
				grunt.log.writeln( 'jsdoc task not enabled for this repo.' );
				grunt.log.writeln( 'To enable jsdoc invoke enableJsdoc() on the object returned from shared-grunt-config.' );
			}
		}
	);

	grunt.registerTask(
		'_logPublishDisableMessage',
		'internal task',
		function() {
			if ( !isNpmPublishEnabled ) {
				grunt.log.writeln( 'Skipping publish to npm.' );
				grunt.log.writeln( 'Call `enableNpmPublish()` to enable.' );
			}
		}
	);

	function getCharSwitch( tv, fv ) {
		return ( function( tv, fv ) {
			return {
				get: function( dir ) {
					return dir ? tv : fv;
				}
			};
		}( tv, fv ) );
	}

	function setUnderscore( task, dir ) {
		if ( 'false' === dir ) {
			dir = false;
		}
		var cs = getCharSwitch( '_', '' );
		var newName = cs.get( dir ) + task;
		var oldName = cs.get( !dir ) + task;
		grunt.task.renameTask( oldName, newName );
	}

	var initialReleaseOptions;
	var repo = grunt.config( 'sharedConfig.curRepo' );
	var clPath = path.join( repo, 'changes.md' );

	// Wrap the release task
	var isNpmPublishEnabled = false;
	setUnderscore( 'release', true );

	grunt.registerTask( '_clearChanges', function() {
		if ( isNpmPublishEnabled && !grunt.option( 'no-write' ) ) {
			grunt.file.write( clPath, '\n' );
			shell.exec( 'git add changes.md' );
		}
	} );

	grunt.registerTask( '_stageDocs', function() {
		if ( isNpmPublishEnabled && !grunt.option( 'no-write' ) ) {
			shell.exec( 'git add docs' );
		}
	} );

	grunt.registerTask( '_setReleaseOptions', function() {
		grunt.config( 'release.options', initialReleaseOptions );
		var changesText = '';
		if ( grunt.file.exists( clPath ) ) {
			changesText = grunt.file.read( clPath );
		}

		var changelogMeta = '# v<%= version %>\n**<%= grunt.template.today("yyyy-mm-dd") %>**';
		var changelogText = changelogMeta + '\n\n' + changesText + '\n';
		grunt.config( 'release.options.changelogText', changelogText );
		grunt.config( 'release.options.npm', isNpmPublishEnabled );
	} );


	grunt.registerTask(
		'rel',
		'Release your module.',
		function( target ) {
			if ( !target ) {
				grunt.fail.fatal( 'You must explicitely pass a target to release. grunt rel:{major,minor,patch}' );
			}

			initialReleaseOptions = grunt.config( 'release.options' );

			grunt.config( 'release.options', {
				bump: true,
				changelog: false,
				add: false,
				commit: false,
				tag: false,
				push: false,
				pushTags: false,
				npm: false
			} );

			setUnderscore( 'release', false );
			grunt.task.run( [
				'_logPublishDisableMessage',
				'release' + ':' + target,
				'clean',
				'babel',
				'jsdoc:dist',
				'_stageDocs',
				'_clearChanges',
				'release' + ':' + target
			] );
		}
	);

	// wrap the babel task
	var isES6Enabled = false;
	grunt.task.renameTask( 'babel', '_babel' );
	grunt.config( '_babel', grunt.config( 'babel' ) );
	grunt.registerTask( 'babel',
		'Wrapper for babel task that incorporates logic for shared-grunt-config.',
		function( target ) {
			if ( isES6Enabled ) {
				grunt.task.run( [ '_babel' + ( target ? ':' + target : '' ) ] );
			} else {
				grunt.log.writeln( 'ES6 modules are not being transpiled.' );
				grunt.log.writeln( 'To enable this feature, iinvoke `enableES6()`' );
				grunt.log.writeln( 'on the object returned by shared-grunt-config.' );
				grunt.log.writeln( 'If you do not want this feature, you may safely' );
				grunt.log.writeln( 'ignore this message.' );
			}
		}
	);

	// Helpers for debugging
	grunt.registerTask( 'logo', console.log.bind( undefined, grunt ) );
	grunt.registerTask( 'cfg', console.log.bind( undefined, grunt.config() ) );

	var SHAREDCFG = {
		addJs: getMergeFn( 'js' ),
		addJsdoc: getMergeFn( 'jsdoc' ),
		addTodo: getMergeFn( 'todo' ),
		addTest: getMergeFn( 'test' ),
		enableJsdoc: function() {
			isJsDocEnabled = true;
			return SHAREDCFG;
		},
		enableES6: function() {
			isES6Enabled = true;
			return SHAREDCFG;
		},
		enableNpmPublish: function() {
			isNpmPublishEnabled = true;
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
			throw new Error( 'Argument to add' + capFirstLetter( key ) + ' must be an array.' );
		}
		var curConfig = grunt.config.get( 'vars.paths.' + key );
		curConfig.push( value );
		grunt.config.set( 'vars.paths.' + key, _.flatten( curConfig ) );
	}

	function capFirstLetter( forStr ) {
		return forStr.charAt( 0 ).toUpperCase() + forStr.slice( 1 );
	}

};

/* istanbul ignore next */
function init( repoRoot, grunt ) {

	var path = require( 'path' );

	grunt.file.setBase( __dirname );

	if ( fs.existsSync( 'grunt/tasks' ) && fs.statSync( 'grunt/tasks' ).isDirectory() ) {
		grunt.loadTasks( 'grunt/tasks' );
	}

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
		loadGruntTasks: false, // we do this ourselves above
		// can post process config object before it gets passed to grunt
		postProcess: function( /* config */) {}
	} );

}

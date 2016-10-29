'use strict';

var inquirer = require( 'inquirer' );
var path = require( 'path' );
var handlebars = require( 'handlebars' );

module.exports = function( grunt ) {
	var description = 'Initialize your repo with .eslintrc files for the `grunt eslint` task.';

	grunt.registerTask( 'eslinit', description, function(){
		var done = this.async();
		var eslintrcFiles = [{
			name: 'serverInstall',
			message: 'Where do you want to install the default .eslintrc file?',
			type: 'text',
			default: '.',
			when: function(){
				return !grunt.file.exists( '.eslintrc' );
			},
			validate: validateExists
		},{
			name: 'serverInstallConfirm',
			message: getMessage( 'serverInstall' ),
			type: 'confirm',
			default: true,
			when: function( answers ){
				return !!answers.serverInstall;
			}
		},{
			name: 'clientInstallConfirm',
			message: function( answers ){
				return `Do you want to${
					answers.serverInstallConfirm ? ' also' : ''
					} install a browser-specific .eslintrc file?`;
			},
			type: 'confirm',
			default: function(){
				return grunt.file.exists( 'client/' );
			}
		},{
			name: 'clientInstall',
			message: 'Where do you want to install the browser-specific .eslintrc file?',
			type: 'text',
			default: './client',
			when: function( answers ){
				return !!answers.clientInstallConfirm;
			},
			validate: validateExists
		},{
			name: 'clientInstallConfirm',
			message: getMessage( 'clientInstall' ),
			type: 'confirm',
			default: true,
			when: function( answers ){
				return !!answers.clientInstall;
			}
		}];

		inquirer.prompt( eslintrcFiles )
		.then( function( answers ){
			if( answers.serverInstallConfirm ) {
				install( '.eslintrc-server', answers.serverInstall );
			}
			if( answers.clientInstallConfirm ){
				install( '.eslintrc-client', answers.clientInstall );
			}
			done();
		} )
		.catch( function( e ){
			console.log( e );
			console.log( e.stack.split( '\n' ).filter( function( l ){
				return l.indexOf( 'eslinit.js' ) !== -1;
			} ).join( '\n' ) );
			throw e;
		} );
	} );

	function install( baseFile, installDirectory ){
		var rcTemplatePath = path.resolve( __dirname, `../../${baseFile}` );
		var rcTemplateContents = grunt.file.read( rcTemplatePath );
		var rcTemplate = handlebars.compile( rcTemplateContents );

		var extendArr = installDirectory
		.split( '/' )
		.filter( function( i ){
			return i && ( i !== '.' );
		} )
		.map( function(){
			return '..';
		} );
		if( !extendArr.length ) {
			extendArr.unshift( '.' );
		}
		var extendPath = `${extendArr.join( '/' )}/node_modules/shared-grunt-config/.eslintrc`;

		var rendered = rcTemplate( {
			extendPath: extendPath
		} );
		grunt.file.write(
			path.join( installDirectory, '.eslintrc' ),
			rendered
		);
	}

	function getMessage( keyInQuestion ){
		return function( answers ){
			var pth = answers[ keyInQuestion ];
			var exists = pth && grunt.file.exists( path.join( pth,'.eslintrc' ) );
			var message = `Create .eslintrc file at \`${path.join( pth,'.eslintrc' )}\`?`;
			message = ( exists ? '(overwrite) ' : '' ) + message;
			message = ( exists ? message.red : message.yellow );
			return message;
		};
	}

	function validateExists( answer ){
		return grunt.file.exists( answer );
	}
};

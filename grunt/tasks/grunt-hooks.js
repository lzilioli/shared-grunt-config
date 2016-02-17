/* eslint prefer-template: 0 */
/* eslint no-sync: 0 */
/* eslint no-shadow: 0 */
/* eslint valid-jsdoc: 0 */
/* eslint consistent-this: 0 */
'use strict';

module.exports = function( grunt ) {

	var description = 'Walks the user through interactive prompts to install hooks.';

	var fs = require( 'fs' );
	var exec = require( 'child_process' ).exec;
	var prompt = require( 'prompt' );
	var path = require( 'path' );

	var done; // async
	var task; // task context
	var options; // task options
	var hooks; // hook configs
	var noPrompt; // option passed to task via flag

	function nextQuestion() {
		if ( !hooks.length ) {
			if ( options.onDone ) {
				grunt.log.writeln( '' );
				grunt.log.writeln( options.onDone.blue );
			}
			done();
		} else {
			var hookConfig = hooks.shift();
			promptHook( hookConfig );
		}
	}

	function promptHook( hookConfig ) {
		grunt.log.writeln( hookConfig.name.yellow );
		grunt.log.writeln( getHeaderFor( hookConfig.name ).yellow );
		grunt.log.writeln( ['This hook will', hookConfig.description].join( ' ' ).yellow );
		getYesNoResponse(
			'\nDo you want to install this hook?'.yellow,
			function() {

				// The user said yes! Install the hook
				// TODO: extend to allow the user to specify the type of hook if they say no
				installHook( hookConfig.hookType, hookConfig.hookType, hookConfig.name, nextQuestion );
			},
			nextQuestion
		);
		return;
	}

	/* Installs hook in grunt/hooks/source as .git/hooks/dest */
	function installHook( source, dest, sourceCanonicalName, cb ) {
		var hookToCopy = path.join( ( options.hookDir || 'grunt/hooks/' ), source );
		var whereToPutIt = '.git/hooks/' + dest;
		if ( !fs.existsSync( hookToCopy ) ) {
			grunt.fail.fatal( 'No file found at ' + hookToCopy );
		}

		// If there is already that type of hook installed
		if ( fs.existsSync( './' + whereToPutIt ) ) {

			// Ask if the user wants to overwrite the existing hook
			getYesNoResponse( [
				'A hook already exists at',
				whereToPutIt + '.',
				'Do you wish to overwrite it?'
			].join( ' ' ).red,
				function() {

					// The user said yes. Overwrite the existing hook.
					actuallyInstallHook( hookToCopy, whereToPutIt, sourceCanonicalName );
					cb();
				},
				function() {

					// The user said no, tell they we're skipping the hook and continue
					grunt.log.writeln( [
						'Skipping install of ', sourceCanonicalName, ' hook in ', whereToPutIt
					].join( '' ).red );
					cb();
				}
			);

		} else {

			// The file didn't exist, perform the copy and continue
			grunt.log.writeln( hookToCopy, whereToPutIt, sourceCanonicalName );
			actuallyInstallHook( hookToCopy, whereToPutIt, sourceCanonicalName );
			cb();
		}

		// Installs the hook without checking if it already exists
		function actuallyInstallHook( hookToCopy, whereToPutIt, sourceCanonicalName ) {
			exec( 'cp ' + hookToCopy + ' ' + whereToPutIt );
			grunt.log.writeln( [
				'Installed ', sourceCanonicalName, ' hook in ', whereToPutIt
			].join( '' ).green );
		}
	}

	/**
	 * Prompts the user with prompStr.
	 * If user answers with anything !exists([yes, y, no, or n])
	 *
	 * @usage  grunt.log.writeln( {{yes/no question}} ), and call this
	 *         function omitting promptStr
	 *
	 * @param  {function}  callback for if the user answers yes
	 * @param  {function}  callback for if the user answers no
	 * @param  {string}    what to ask the user. (defaults to 'Y/N?')
	 * @return {undefined} n/a
	 */
	function getYesNoResponse( promptStr, yesCb, noCb ) {
		if ( noPrompt ) {
			yesCb();
			return;
		}
		grunt.log.writeln( promptStr );
		prompt.get( ['Y/N?'], function( err, result ) {
			if ( err ) {
				grunt.fail.fatal( 'An error occured: ', err );
			} else {
				var yesOpts = ['yes', 'y'];
				var noOpts = ['no', 'n'];
				var response = result[ 'Y/N?' ].toLowerCase().trim();
				if ( yesOpts.indexOf( response ) !== -1 ) {
					yesCb();
				} else if ( noOpts.indexOf( response ) !== -1 ) {
					noCb();
				} else {
					getYesNoResponse( ( 'Unrecognized response: ' + response ), yesCb, noCb );
				}
			}
		} );
	}

	function getHeaderFor( name ) {
		var ret = '';
		for ( var i = 0; i < name.length; i++ ) {
			ret += '=';
		}
		return ret;
	}

	grunt.registerMultiTask( 'hooks', description, function() {
		task = this;
		options = task.data.options;
		hooks = task.data.options.hooks;
		noPrompt = grunt.option( 'no-prompt' );
		done = this.async();

		// Start the prompt.
		prompt.start();

		// Start the question chain.
		nextQuestion();
	} );
};

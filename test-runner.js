'use strict';

// this file is invoked from /grunt/config/shell.js
var _ = require( 'underscore' );
var path = require( 'path' );
var util = require( 'lz-node-utils' );
var theRepoRoot = process.argv[ process.argv.length - 1 ]; // Assume last argument is is theRepoRoot
var tests = util.file.expand( path.join( theRepoRoot, 'tests/*-tests.js' ) );

var cwd = process.cwd();
_.each( tests, function( test, idx, list ) {
	process.chdir( path.join( path.dirname( test ), '..' ) );
	var testModule = path.join( path.dirname( test ), path.basename( test, '.js' ) );
	require( testModule )();
} );
process.chdir( cwd );

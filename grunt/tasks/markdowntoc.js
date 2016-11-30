var toc = require( 'markdown-toc' );

module.exports = function( grunt ){
	grunt.registerMultiTask( 'markdowntoc', function(){

		// var options = this.options( {} );

		this.files.forEach( function( file ){
			file.src.forEach( function( filePath ){
				var contents = grunt.file.read( filePath );
				var withToc = toc.insert( contents, {
					bullets: '-'
				} );
				grunt.log.writeln( ( `Writing file ${filePath}` ).green );
				grunt.file.write( filePath, withToc );
			} );
		} );

	} );
};

module.exports = {
	js: {
		files: [ '<%= vars.paths.js %>' ],
		tasks: [ 'js_on_watch' ]
	},
	test: {
		files: [ '<%= vars.paths.test %>' ],
		tasks: [ 'test' ]
	}
};

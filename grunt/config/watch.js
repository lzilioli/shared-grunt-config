module.exports = {
	options: {
		debounceDelay: 5000
	},
	default: {
		files: [ '<%= vars.paths.devScripts %>' ],
		tasks: [ '_js_on_watch' ]
	},
	_lint_optimized: {
		files: [ '<%= vars.paths.devScripts %>' ],
		tasks: [ '_js_o_lint_on_watch' ]
	},
	_test_optimized: {
		files: [
			'<%= vars.paths.devScripts %>',
			'<%= vars.paths.test %>'
		],
		tasks: [ '_js_o_test_on_watch' ]
	},
	_docs_optimized: {
		files: [ '<%= vars.paths.jsdoc %>' ],
		tasks: [ '_js_o_docs_on_watch' ]
	}
};

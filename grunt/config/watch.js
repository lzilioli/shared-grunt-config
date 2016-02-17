/* eslint camelcase: 0 */
module.exports = {
	options: {
		debounceDelay: 5000
	},
	default: {
		files: ['<%= paths.js %>'],
		tasks: ['_js_on_watch']
	},
	_lint_optimized: {
		files: ['<%= paths.js %>'],
		tasks: ['_js_o_lint_on_watch']
	},
	_docs_optimized: {
		files: ['<%= paths.jsdoc %>'],
		tasks: ['_js_o_docs_on_watch']
	}
};

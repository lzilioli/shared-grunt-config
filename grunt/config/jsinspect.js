module.exports = {
	js: {
		options: {
			threshold: 30,
			diff: true,
			identifiers: false,
			failOnMatch: false,
			suppress: 100,
			reporter: 'default'
		},
		src: [
			// NOTE jsinspect chokes on some es6 syntax, so we currently don't run this task against the es6 code
			'<%= vars.paths.js %>'
		]
	}
};

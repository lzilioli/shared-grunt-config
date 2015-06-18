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
			// TODO jsinspect chokes on some es6 syntax, so we currently don't run against it
			'<%= vars.paths.js %>'
		]
	}
};

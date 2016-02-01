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
			'<%= paths.js %>'
		]
	}
};

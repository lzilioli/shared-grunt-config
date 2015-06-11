module.exports = {
	options: {
		sourceMap: true,
		auxiliaryComment: 'istanbul ignore next',
		retainLines: true
	},
	dist: {
		files: [ {
			expand: true,
			cwd: '<%= sharedConfig.curRepo %>',
			src: '<%= vars.paths.es6 %>',
			ext: '.es6.js',
			extDot: 'first'
		} ]
	}
};

module.exports = {
	options: {
		bump: false, //this is set to true by the rel task on the first run
		changelog: true, //default: false
		// Gets set by grunt-shared-config
		changelogText: '', //default: '### <%= version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'
		// file: 'component.json', //default: package.json
		// add: false, //default: true
		// commit: false, //default: true
		// tag: false, //default: true
		// push: false, //default: true
		// pushTags: false, //default: true
		// npm: false, //default: true
		// npmtag: true, //default: no tag
		// indentation: '\t', //default: '  ' (two spaces)
		// folder: 'folder/to/publish/to/npm', //default project root
		tagName: 'v<%= version %>', //default: '<%= version %>'
		commitMessage: '-- v<%= version %> RELEASE --', //default: 'release <%= version %>'
		// tagMessage: 'tagging version <%= version %>', //default: 'Version <%= version %>',
		// beforeBump: [], // optional grunt tasks to run before file versions are bumped
		// afterBump: [], // optional grunt tasks to run after file versions are bumped
		// beforeRelease: [], // optional grunt tasks to run after release version is bumped up but before release is packaged
		// afterRelease: [], // optional grunt tasks to run after release is packaged
		// github: {
		// 	repo: 'geddski/grunt-release', //put your user/repo here
		// 	usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username
		// 	passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
		// }
	}
};

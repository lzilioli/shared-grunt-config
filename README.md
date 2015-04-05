`shared-grunt-config`
==========================
## Usage

```bash
npm install --save-dev shared-grunt-config
```

### Gruntfile.js

```javascript
module.exports = function( grunt ) {
    var config = require( 'shared-grunt-config' )( __dirname, grunt );
};
```

The first argument to the required function should be the fully qualified path to the root of your repo.

By default, the following locations will be checked for JavaScript when configuring tasks:

```javascript
[ '*.js',
'grunt/**/*.js',
'lib/**/*.js',
'bin/**/*.js',
'test/**/*.js',
'tests/**/*.js' ]
```

If you have additional JS that you want considered for the JS-based tasks, or additional files to be considered for the todo, js, or test task, you can add them as follows:

```javascript
module.exports = function( grunt ) {
    var config = require( 'shared-grunt-config' )( __dirname, grunt );
    config.addJs([ 'assets/scripts/**/*.js' ]); // will also be used for the todo task
    config.addTodo([ 'bin/*.sh' ]); // look for todos in all files in bin/*.sh
    config.addTest([ 'tests/**' ]); // watch all files in tests/ for changes
};
```

## Tasks

### Aliases

#### audit

The audit task will review your code and tell you where you can do better. Two tasks run as part of the audit:

- todo
- dry-js

#### default

The default task is run when typing grunt. Under the hood, it runs the following tasks:

- audit
- jshint:lax
- test
- watch

#### lint

This task will ensure that your JavaScript is up to our coding standards. Under the hood it runs two tasks:

- jsbeautifier:lint
- jshint:strict

### Git Hooks

#### hooks

Running this task will install three git hooks in your repo's `./.git/hooks/` directory: `pre-push`, `post-commit`, and `prepare-commit-message`.

`prepare-commit-message` will prepend a branch tag (i.e. `[UI-13]`) to your commit message if the branch name begins with `UI-`.

There are two grunt tasks defined as helpers for the pre-push and post-commit tasks. They simply get called from the git hooks.

*post-commit*

- audit

*pre-push*

- test
- lint

### Other Tasks

#### release

Perform a release of the module using [grunt-release](https://github.com/geddski/grunt-release).

#### todo

The todo task will search your files for tags such as `// TODO`, and print a summary of them to the command line.

#### dry-js

The dry-js task will analyze your JavaScript for duplicated code. It uses [flay-js](https://github.com/UncleGene/flay-js).

#### jsbeautifier

This task is responsible for reformatting your JS. It can run in two modes, lint and act.

*jsbeautifier:lint*

Lint will check if your code is beautified, and fail if it is not.

*jsbeautifier:act*

Act will beautify any code that is not already beautiful.

#### jshint

The jshint task will ensure that the JavaScript lints cleanly. It can run in two modes, lax and strict.

*jshint:lax*

If your code fails linting, jshint:lax will throw an error, but still pass.

*jshint:strict*

If your code fails linting, jshint:strict will throw an error, and cause the grunt task to fail.

#### watch

Watch will watch your JavaScript files and when they change run the `js_on_watch` alias.

*js_on_watch*

- jsbeautifier:act
- shell:test
- jshint:strict

#### test

This will run the JavaScript test suite for your repo. In order start testing your code, simply create a `tests/` directory. Any JavaScript file within that directory that matches the naming pattern `*-tests.js` will be invoked by the test runner when this task runs.

*shell:test*

Task used internally to invoke the test runner.

`shared-grunt-config`
=====================

# Table Of Contents

<!-- MarkdownTOC autolink=true autoanchor=true bracket=round depth=3 -->

- [Description](#description)
- [Usage](#usage)
    - [Gruntfile.js](#gruntfilejs)
    - [API](#api)
- [Tasks](#tasks)
    - [Watch Tasks](#watch-tasks)
        - [default](#default)
        - [o-* tasks](#o--tasks)
    - [hooks](#hooks)
    - [release:version|major|minor|patch](#releaseversion|major|minor|patch)
- [Other Tasks](#other-tasks)
    - [audit](#audit)
    - [lint](#lint)
    - [beautify](#beautify)
    - [babel](#babel)
    - [clean](#clean)
    - [jsdoc](#jsdoc)
    - [test](#test)
- [Branching Strategy](#branching-strategy)

<!-- /MarkdownTOC -->

<a name="description"></a>
# Description

This repository exposes grunt configuration that can be shared between multiple modules.

<a name="usage"></a>
# Usage

```bash
npm install --save-dev shared-grunt-config
```

<a name="gruntfilejs"></a>
## Gruntfile.js

```javascript
module.exports = function( grunt ) {
    require( 'shared-grunt-config' )( __dirname, grunt );
};
```

The first argument to the required function should be the fully qualified path to the root of your repo.

<a name="api"></a>
## API

The object returned by invoking the method exported by `shared-grunt-config` exposes an API for modifying certain parts of the configuration for the consuming repo.

Each method is chain-able, and is explained below:

```javascript
module.exports = function( grunt ) {
    require( 'shared-grunt-config' )( __dirname, grunt )

        // add more files in which to search for TODOs
        // during the grunt TODO task
        .addTodo([ 'bin/*.sh' ])

        // add files for js stuff like linting, beautifying, etc.
        // will also be used for the todo and jsdoc task
        .addClientJs([ 'client/**/*.js' ])
        .addServerJs([ 'helpers/*.js' ])

        // add more jsdoc files that get read when generating jsdoc
        .addJsdoc([ 'server/*.js' ])

        // Add files to be cleaned by grunt clean
        .addClean([ 'client-dist/' ]);
};
```

<a name="tasks"></a>
# Tasks

<a name="watch-tasks"></a>
## Watch Tasks

<a name="default"></a>
### default

The default task is run when typing `grunt`. When a file being watched changes, the following will happen:

- es6 code will be transpiled to es5 by the `babel` task
- the source will be modified via the `beautify` task
- the source will be linted by the `lint` task
- unit tests will run, without generating a coverage report
- jsdocs will be generated to `docs.ignore` within your repository

<a name="o--tasks"></a>
### o-* tasks

There are three "optimum" tasks defined:

- o-lint
- o-docs
- o-test

These are very similar to the default task, however they are optimized to focus on one of the three things. e.g. the `o-docs` task will watch only files relevant to generating jsdoc, and will quickly generate jsdoc when files change so you can quickly refresh your browser to see how the docs have changed.

<a name="hooks"></a>
## hooks

Running this task will install two git hooks in your repo's `./.git/hooks/` directory: `pre-push`, and `post-commit`.

<a name="releaseversion|major|minor|patch"></a>
## release:version|major|minor|patch

Perform a release of the module using [grunt-release](https://github.com/geddski/grunt-release).

Before doing so, this task runs babel to compile es6 if enabled for your repo, and generates, stages, and commits jsdoc to `docs/` rather than `docs.ignore/` so that your versioned documentation get pushed to git and published to npm.

Your CHANGELOG.md will be updated to include a header at the top of the file with the release version and date. This lets you keep a running list of feature changes as you work, and not have to worry about remembering to associate the changes with a release in the CHANGELOG.

<a name="other-tasks"></a>
# Other Tasks

<a name="audit"></a>
### audit

The audit task will review your code and tell you how it went. It will check for TODOs, and try to detect duplicate JS to aid in DRYing out your code. At the time, es6 code will not be checked for duplicates because the task is not compatible with some of the new JavaScript syntax.

<a name="lint"></a>
### lint

This task will ensure that your JavaScript is up to our coding standards. It will fail as soon as the first task in the alias encounters an error.

#### lint-l

Lax version of lint. This task will succeed no matter if errors are encountered. Unfortunately, `jsbeautifier` provides no means for making the task pass in the event of lint errors, so it is not currently run as part of this task.

<a name="beautify"></a>
### beautify

This task will modify your JS files to the best of its ability to adhere to the defined coding style. Note that two tasks are run as part of this task. `jsbeautifier` is responsible for beautifying es5 code, while `jscs` is responsible for beautifying es6 code.

<a name="babel"></a>
### babel

This task is responsible for the transpilation of JS files named with the `.es6` postfix into node compatible JS. To turn this feature on, you should invoke `enableES6` on the config object.

If your repo contains any `.es6` files, you should add the following to your `.gitignore`:

```
# Compiled es6 modules
*.es6.js
*.es6.js.map
```

**NOTE:** Currently, the following locations are checked for `.es6` modules.

- `*.es6`
- `lib/**/*.es6`
- `bin/**/*.es6`
- `test/**/*.es6`
- `tests/**/*.es6`

<a name="clean"></a>
### clean

This task will clean files that get automatically generated by the grunt setup exposed by this repo.

<a name="jsdoc"></a>
### jsdoc

Generate documentation for the current repo. This task will have no effect if `enableJsdoc` is not invoked.

This task has two targets `:dev` and `:dist`. `dev` will generate documentation in a directory named `docs.ignore`, and `dist` will generate the documentation in a directory named `docs`.

If your repo utilizes jsdoc, you should add the following to your `.gitignore`. This will cause your repo to properly ignore the `docs.ignore` directory generated by `jsdoc:dev`.

```
# Anything with postfix .ignore
*.ignore
```

To view non-fatal warnings encountered by jsdoc during doc generation, run your grunt task with the flag  `--w-jsd`.

<a name="test"></a>
### test

This will run the JavaScript test suite for your repo. In order start testing your code, simply create a `tests/` directory. Any JavaScript file within that directory that matches the naming pattern `*-tests.js` will be invoked by the test runner when this task runs.

The `test` task will also generate coverage information using istanbul to a directory named `coverage.ignore`.

To skip generating the coverage, run `grunt test --no-cover`

<a name="branching-strategy"></a>
# Branching Strategy

This repository contains two branches: `common` and `release`. The common branch is where any changes to this repo should be committed. This enables other people to create custom versions of the configuration exposed by this repo, while still inheriting the functionality on the common branch. Once you are ready to release a new version, check out the release branch, rebase it off of common, and force push it to origin.

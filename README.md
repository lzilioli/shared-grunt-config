`shared-grunt-config`
=====================

# Table Of Contents

- [Description](#description)
- [Usage](#usage)
    - [Gruntfile.js](#gruntfile.js)
- [API](#api)
- [Tasks](#tasks)
    - [Watch Tasks](#watchtasks)
    - [rel](#rel)
    - [hooks](#hooks)
    - [Other Tasks](#othertasks)
- [Branching Strategy](#branchingstrategy)

# Description

This repository exposes grunt configuration that can be shared between multiple modules. The tasks and their configuration are optimized for development of a nodejs npm package.

# Usage

```bash
npm install --save-dev shared-grunt-config
```

## Gruntfile.js

```javascript
module.exports = function( grunt ) {
    require( 'shared-grunt-config' )( __dirname, grunt );
};
```

The first argument to the required function should be the fully qualified path to the root of your repo.

## API

The object returned by invoking the method exported by `shared-grunt-config` exposes an API for modifying certain parts of the configuration for the consuming repo.

Each method is chain-able, and is explained below:

```javascript
module.exports = function( grunt ) {
    require( 'shared-grunt-config' )( __dirname, grunt )

        // Turn on jsdoc
        .enableJsdoc()

         // Turn on es6 => es5 transpile
        .enableES6()

        // Turn on npm publishing when the rel task is run
        .enableNpmPublish()

        // add more files in which to search for TODOs
        // during the grunt TODO task
        .addTodo([ 'bin/*.sh' ])

        // add files for js stuff like linting, beautifying, etc.
        // will also be used for the todo task
        .addJs([ 'assets/scripts/**/*.js' ])

        // add test files to watch for the o-test task
        .addTest([ 'tests/**' ])

        // add more jsdoc files that get read when generating jsdoc
        .addJsdoc([ 'dist/*.js' ]);
};
```

# Tasks

## Watch Tasks

### default

The default task is run when typing `grunt`. When a file being watched changes, the following will happen:

- es6 code will be transpiled to es5 by the `babel` task
- the source will be modified via the `beautify` task
- the source will be linted by the `lint` task
- unit tests will run, without generating a coverage report
- jsdocs will be generated to `docs.ignore` within your repository

### o-* tasks

There are three "optimum" tasks defined:

- o-lint
- o-docs
- o-test

These are very similar to the default task, however they are optimized to focus on one of the three things. e.g. the `o-docs` task will watch only files relevant to generating jsdoc, and will quickly generate jsdoc when files change so you can quickly refresh your browser to see how the docs have changed.

## hooks

Running this task will install three git hooks in your repo's `./.git/hooks/` directory: `pre-push`, `post-commit`, and `prepare-commit-message`.

`prepare-commit-message` will prepend a branch tag (i.e. `[UI-13]`) to your commit message if the branch name begins with `UI-`.

## rel:version|major|minor|patch

Perform a release of the module using [grunt-release](https://github.com/geddski/grunt-release).

Before doing so, this task runs babel to compile es6 if enabled for your repo, and generates jsdoc to docs/ rather than docs.ignore so that your jsdocs get pushed to git and published to npm.

If your repo contains a file called changes.md, as part of this task it will be read in and its contents included in the update to the changelog. This is a great way to track your changes as you work, and automate the step of updating your changelog when you do a release.

# Other Tasks

### audit

The audit task will review your code and tell you how it went. It will check for TODOs, and try to detect duplicate JS to aid in DRYing out your code. At the time, es6 code will not be checked for duplicates because the task is not compatible with some of the new JavaScript syntax.

### lint

This task will ensure that your JavaScript is up to our coding standards. It will fail as soon as the first task in the alias encounters an error.

#### lint-l

Lax version of lint. This task will succeed no matter if errors are encountered. Unfortunately, `jsbeautifier` provides no means for making the task pass in the event of lint errors, so it is not currently run as part of this task.

### beautify

This task will modify your JS files to the best of its ability to adhere to the defined coding style. Note that two tasks are run as part of this task. `jsbeautifier` is responsible for beautifying es5 code, while `jscs` is responsible for beautifying es6 code.

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

### clean

This task will clean files that get automatically generated by the grunt setup exposed by this repo.

### jsdoc

Generate documentation for the current repo. This task will have no effect if `enableJsdoc` is not invoked.

This task has two targets `:dev` and `:dist`. `dev` will generate documentation in a directory named `docs.ignore`, and `dist` will generate the documentation in a directory named `docs`.

If your repo utilizes jsdoc, you should add the following to your `.gitignore`. This will cause your repo to properly ignore the `docs.ignore` directory generated by `jsdoc:dev`.

```
# Anything with postfix .ignore
*.ignore
```

To view non-fatal warnings encountered by jsdoc during doc generation, run your grunt task with the flag  `--w-jsd` (short for `--watch-jsdoc`).

### test

This will run the JavaScript test suite for your repo. In order start testing your code, simply create a `tests/` directory. Any JavaScript file within that directory that matches the naming pattern `*-tests.js` will be invoked by the test runner when this task runs.

The `test` task will also generate coverage information using istanbul to a directory named `coverage.ignore`.

To skip generating the coverage, run `grunt test --no-cover`

# Branching Strategy

This repository contains two branches: `common` and `release`. The common branch is where any changes to this repo should be committed. This enables other people to create custom versions of the configuration exposed by this repo, while still inheriting the functionality on the common branch. Once you are ready to release a new version, check out the release branch, rebase it off of common, and force push it to origin.

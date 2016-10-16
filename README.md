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
        - [jsb](#jsb)
        - [clean](#clean)
        - [jsdoc](#jsdoc)

<!-- /MarkdownTOC -->

<a name="description"></a>
# Description

This repository exposes grunt configuration that can be shared between multiple
modules.

<a name="usage"></a>
# Usage

```
bash npm install --save-dev shared-grunt-config
```

<a name="gruntfilejs"></a>
## Gruntfile.js

```javascript
module.exports = function( grunt ) {
    require( 'shared-grunt-config' )( __dirname, grunt );
};
```

The first argument to the required function should be the fully qualified path
to the root of your repo.

<a name="api"></a>
## API

The object returned by invoking the method exported by `shared-grunt-config`
exposes an API for modifying certain parts of the configuration for the
consuming repo.

Each method is chain-able, and is explained below:

```javascript
module.exports = function( grunt ) {
    require( 'shared-grunt-config' )( __dirname, grunt )

    // add more files in which to search for TODOs
    // during the grunt TODO task
    .addTodo([ 'bin/*.sh' ])

    // add files for js stuff like linting, beautifying, etc.
    // will also be used for the todo and jsdoc task
    .addClientJs([ 'client/**/*.js' ]) .addServerJs([ 'helpers/*.js' ])

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

The default task is run when typing `grunt`. When a file being watched changes,
the following will happen:

- the source will be modified via the `jsb` task
- the source will be linted by the `lint` task
- jsdocs will be generated to `docs.ignore` within your repository

<a name="o--tasks"></a>
### o-* tasks

There are three "optimum" tasks defined:

- o-lint
- o-docs
- o-test

These are very similar to the default task, however they are optimized to focus
on one of the three things. e.g. the `o-docs` task will watch only files
relevant to generating jsdoc, and will quickly generate jsdoc when files change
so you can quickly refresh your browser to see how the docs have changed.

<a name="hooks"></a>
## hooks

Running this task will install two git hooks in your repo's `./.git/hooks/`
directory: `pre-push`, and `post-commit`.

<a name="releaseversion|major|minor|patch"></a>
## release:version|major|minor|patch

Perform a release of the module using
[grunt-release](https://github.com/geddski/grunt-release).

Before doing so, this task runs babel to compile es6 if enabled for your repo,
and generates, stages, and commits jsdoc to `docs/` rather than `docs.ignore/`
so that your versioned documentation get pushed to git and published to npm.

Your CHANGELOG.md will be updated to include a header at the top of the file
with the release version and date. This lets you keep a running list of feature
changes as you work, and not have to worry about remembering to associate the
changes with a release in the CHANGELOG.

<a name="other-tasks"></a>
# Other Tasks

<a name="audit"></a>
### audit

The audit task will review your code and tell you how it went. It will check for
TODOs, and try to detect duplicate JS to aid in DRYing out your code. At the
time, es6 code will not be checked for duplicates because the task is not
compatible with some of the new JavaScript syntax.

<a name="lint"></a>
### lint

This task will ensure that your JavaScript is up to our coding standards. It
will fail as soon as the first task in the alias encounters an error.

<a name="jsb"></a>
### jsb

Alias for `eslint` with `fix: true`. This will change the code to match the
coding standards.

<a name="clean"></a>
### clean

This task will clean files that get automatically generated by the grunt setup
exposed by this repo.

<a name="jsdoc"></a>
### jsdoc

Generate documentation for the current repo. This task will have no effect if
`enableJsdoc` is not invoked.

This task has two targets `:dev` and `:dist`. `dev` will generate documentation
in a directory named `docs.ignore`, and `dist` will generate the documentation
in a directory named `docs`.

If your repo utilizes jsdoc, you should add the following to your `.gitignore`.
This will cause your repo to properly ignore the `docs.ignore` directory
generated by `jsdoc:dev`.

```
# Anything with postfix .ignore *.ignore
```

To view non-fatal warnings encountered by jsdoc during doc generation, run your
grunt task with the flag  `--w-jsd`.


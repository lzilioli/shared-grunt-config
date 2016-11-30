- **BREAKING** remove first argument from `shared-grunt-config` exported method

# v4.0.1 - **2016-11-26**
# v4.0.0 - **2016-10-28**
- new `eslinit` task to initialize eslint
- add descriptions to `logo` and `cfg` tasks
- new `addJs` method to replace `addServerJs`, and `addClientJs`
- add a LICENSE
- **BREAKING** The way jsdocs are published is changed. They will no longer be
  committed to the repo. Please see the readme section about the `release` task
  for more details.
- **BREAKING** The `shared-grunt-config` still contains configs for eslint,
  however it does not provide a default ruleset. Your repo must contain its own
  eslintrc. You can run `grunt eslinit` to interactively initialize your repo.
- **ENHANCEMENT** Load a directory containing grunt configurations by passing a
  third argument to `shared-grunt-config`. See the readme for the `alsoLoadFrom`
  parameter.
- **DEPRECATED** Deprecate `addEslintRules`. Rules are now defined by your
  repositories `.eslintrc`. You can install one 
- **DEPRECATED** Deprecate `addServerJs`, and `addClientJs`. Use the new `addJs`
  method

# v3.0.1 - **2016-10-19**
- switch from npm-upgrade grunt-contrib-clean breanch

# v3.0.0 - **2016-10-19**
- add dependency on `@retailmenot/grunt-hooks`, remove own hooks task

# v2.0.1 - **2016-10-16**
# v2.0.0 - **2016-10-16**
# v1.0.0 - **2016-02-01**
- Remove babel. Consuming repos should utilize webpack or their own babel
  configuration.
- Remove testing functionality. Consuming repos should utilize their own testing
  configuration.
- JSDoc always enabled.
- Remove jsbeautifier in favor of jscs
- Remove unnecessary editorconfig
- Upgrade outdated packages in package.json
- Clean up package.json
- Create client/server distinction for the jshint task

# v0.2.0 - **2015-10-31**
- Upgrade grunt release to lzilioli's fork which allows for staging files, and
  enables removal of lots of complexity from this repo.
- Remove the rel task in favor of the new and improved release task.
- Remove `enableNpmPublish()` method and instead rely on presence or absence of
  `private: true` in the module's package.json.
- Added `jsb` alias for easier beautification
- Remove functionality of picking up changes in changes.md. It is much simpler
  to keep a running list at the top of the changelog, and have the `grunt
  release` task prepend a header above the running list with information about
  the release.

# v0.1.3 - **2015-06-15**

# v0.1.2 - **2015-06-15**
- changes.md appended to changelog and cleared as part of rel task

# v0.1.2 - **2015-06-15**
- Initial release

- add dependency on `@retailmenot/grunt-hooks`, remove own hooks task

# v2.0.1 - **2016-10-16**
# v2.0.0 - **2016-10-16**
# v1.0.0 - **2016-02-01**
- Remove babel. Consuming repos should utilize webpack or their own babel configuration.
- Remove testing functionality. Consuming repos should utilize their own testing configuration.
- JSDoc always enabled.
- Remove jsbeautifier in favor of jscs
- Remove unnecessary editorconfig
- Upgrade outdated packages in package.json
- Clean up package.json
- Create client/server distinction for the jshint task

# v0.2.0 - **2015-10-31**
- Upgrade grunt release to lzilioli's fork which allows for staging files, and enables removal of lots of complexity from this repo.
- Remove the rel task in favor of the new and improved release task.
- Remove `enableNpmPublish()` method and instead rely on presence or absence of `private: true` in the module's package.json.
- Added `jsb` alias for easier beautification
- Remove functionality of picking up changes in changes.md. It is much simpler to keep a running list at the top of the changelog, and have the `grunt release` task prepend a header above the running list with information about the release.

# v0.1.3 - **2015-06-15**

# v0.1.2 - **2015-06-15**
- changes.md appended to changelog and cleared as part of rel task

# v0.1.2 - **2015-06-15**
- Initial release

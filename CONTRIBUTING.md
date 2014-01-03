# Contributing

## Bug Tracker

Found a bug? Report it [here](https://github.com/openfaux/openfaux-website/issues/)!

## Feature Request

Have an idea? Add it [here](https://github.com/openfaux/openfaux-website/issues/)!

## Pull Request

1. [Fork it](https://help.github.com/articles/fork-a-repo)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Lint JavaScript files (`npm install -g grunt && npm install && grunt test`)
4. Commit your changes (`git commit -am 'Added some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new [Pull Request](https://help.github.com/articles/using-pull-requests)

## Standards

### HTML

* 2 spaces (no tabs)
* Every child should have one more indent than parent
* Double quotes (no single quotes)
* No trailing slash at self-closing elements (e.g. `<hr>`, not `<hr />`)
* Use CDNs and HTTPS for third-party JS when possible

### JavaScript

* 2 spaces (no tabs)
* Write semicolons
* Single quotes (no double quotes)
* Don't write markup with JavaScript when possible

More info in `.jshintrc` and `.jscs.json`.
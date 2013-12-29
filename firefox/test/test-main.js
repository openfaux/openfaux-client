var main = require("main");

exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

require("test").run(exports);

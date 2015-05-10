var mkdirs = require(__dirname + "/index.js");

mkdirs.sync("test-sync/txt");
mkdirs("test/txt/dir", function (err) {});

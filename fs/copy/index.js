var _classes = {
	fs	: require("fs"),
	fsu	: require("../../index.js"),
	path	: require("path")
};

var copyFile	= function (source, target, cb) {
	var cbCalled = false;

	var rd = fs.createReadStream(source);
	rd.on("error", function(err) {
		done(err);
	});
	var wr = fs.createWriteStream(target);
	wr.on("error", function(err) {
		done(err);
	});
	wr.on("close", function(ex) {
		done();
	});
	rd.pipe(wr);

	function done(err) {
		if (!cbCalled) {
			cb(err);
			cbCalled = true;
		}
	}
};
var copyFileSync	= function (srcFile, destFile) {
	var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
	BUF_LENGTH = 64 * 1024;
	buff = new Buffer(BUF_LENGTH);
	fdr = fs.openSync(srcFile, 'r');
	fdw = fs.openSync(destFile, 'w');
	bytesRead = 1;
	pos = 0;
	while (bytesRead > 0) {
		bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
		fs.writeSync(fdw, buff, 0, bytesRead);
		pos += bytesRead;
	}
	fs.closeSync(fdr);
	return fs.closeSync(fdw);
};

var copy = function(path, dest, callback, opts) {
	path = _classes.path.normalize(path);
	dest = _classes.path.normalize(dest);
	var separator = _classes.path.sep;

	if (typeof(opts) !== "object") {
		opts	= {};
	}
	if (typeof(opts.overwrite) === "undefined") {
		opts.overwrite	= false;
	}
	_classes.fsu.walk();
	// TODO
};

var copySync = function(path, dest, callback, opts) {
	path = _classes.path.normalize(path);
	dest = _classes.path.normalize(dest);
	var separator = _classes.path.sep;

	if (typeof(opts) !== "object") {
		opts	= {};
	}
	if (typeof(opts.overwrite) === "undefined") {
		opts.overwrite	= false;
	}
	if (typeof(opts.overwrite) === "undefined") {
		opts.overwrite	= false;
	}
	// TODO
};


copy.copy	= copy;
copy.sync	= copySync;

module.exports = copy;
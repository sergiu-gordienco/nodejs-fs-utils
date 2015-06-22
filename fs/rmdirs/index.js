var _classes = {
	fs	: require("fs"),
	path	: require("path")
};

var rmdirAsync = function(path, callback, opts) {
	path = _classes.path.normalize(path);
	var fs;
	if (typeof(opts) === "function") {
		callback	= opts;
		opts	= {};
	}
	
	if (typeof(opts) !== "object") {
		opts	= {};
	}

	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	if (!fs)
		fs	= opts.fs || _classes.fs;
	fs[opts.symbolicLinks ? 'lstat' : 'stat'](path, function (err, stats) {
		if (err) {
			callback(err);
		} else {
			if (!stats.isDirectory()) {
				fs.unlink(path, callback);
			} else {
				fs.readdir(path, function(err, files) {
					if(err) {
						// Pass the error on to callback
						callback(err, []);
						return;
					}
					// Remove one or more trailing slash to keep from doubling up
					path = path.replace(/\/+$/,"");
					var next	= function () {
						if (files.length) {
							var file	= files.shift();
							var curPath = _classes.path.normalize(path + _classes.path.sep + file);
							fs[opts.symbolicLinks ? 'lstat' : 'stat'](curPath, function(err, stats) {
								if( err || ( stats && stats.isSymbolicLink() )) {
									callback(err || Error("Exception: Symbolic link"), []);
									return;
								} else {
									if( stats.isDirectory() && !stats.isSymbolicLink() ) {
										rmdirAsync(curPath, function (err) {
											if (err) {
												callback(err);
											} else {
												next();
											}
										}, opts);
									} else {
										fs.unlink(curPath, function (err) {
											if (err) {
												callback(err);
											} else {
												next();
											}
										});
									}
								}
							});
						} else {
							fs.rmdir(path,callback);
						}
					};
					next();
				});
			}
		}
	});

};

rmdirAsync.sync = function (path, opts) {
	var fs;
	path = _classes.path.normalize(path);
	if (typeof(opts) !== "object") {
		opts	= {};
	}

	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	if (!fs)
		fs	= opts.fs || _classes.fs;
	
	var stats = fs[opts.symbolicLinks ? 'lstatSync' : 'statSync'](path);

	if (!stats.isDirectory()) {
		fs.unlink(path);
		return;
	}

	var files	= fs.readdirSync(path);
	var wait = files.length;
	
	// Remove one or more trailing slash to keep from doubling up
	path = path.replace(/\/+$/,"");
	files.forEach(function(file) {
		var curPath = _classes.path.normalize(path + _classes.path.sep + file);
		var stats = fs[opts.symbolicLinks ? 'lstatSync' : 'statSync'](curPath);

		if( stats.isDirectory() && !stats.isSymbolicLink() ) {
			rmdirAsync.sync(curPath, opts);
		} else {
			fs.unlinkSync(curPath);
		}
	});
	fs.rmdirSync(path);
};

module.exports	= rmdirAsync;
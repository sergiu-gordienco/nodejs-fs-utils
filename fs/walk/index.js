var _classes = {
	fs	: require("fs"),
	path	: require("path")
};

var walk = function(path, opts, callback, onend_callback) {
	path = _classes.path.normalize(path);
	var fs;
	var separator = _classes.path.sep;


	if (typeof(opts) === "function") {
		callback	= opts;
		opts	= {};
		if (typeof(callback) === "function") {
			onend_callback	= callback;
		}
	}

	if (typeof(onend_callback) !== "function") {
		onend_callback	= function () {};
	}
	
	if (typeof(opts) !== "object") {
		opts	= {};
	}

	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	if (typeof(opts.skipErrors) === "undefined") {
		opts.skipErrors	= false;
	}

	if (typeof(opts.logErrors) === "undefined") {
		opts.logErrors	= false;
	}

	if (!fs)
		fs	= opts.fs || _classes.fs;
	
	var cache	= {
		count	: 0,
		wait	: 0,
		files	: 0,
		dirs	: 0,
		fsnodes	: 0,
		errors	: []
	};
	var finalCallback	= false;
	var fnc	= 0;
	var errorsSend	= false;
	var _tick	= function (err, path, stats, next) {
		if (cache.errors.length && !opts.skipErrors) {
			if (!errorsSend) {
				errorsSend	= true;
				onend_callback((opts.logErrors ? cache.errors : cache.errors[0]), cache);
			}
			return;
		} else if (!next) {
			if (cache.wait == cache.count/* && !finalCallback*/) {
				finalCallback	= true;
				// console.log("\033[31;7m wait = count ; [", fnc++, "] ", cache, "\033[0m");
				onend_callback((opts.logErrors ? cache.errors : cache.errors[0]), cache);
			}
		} else {
			callback(err, path, stats, next, cache);
		}
	};
	var _next_empty	= function () {
		cache.count++;
		_tick();
	};
	var _next	= function (path) {
		if (path) {
			cache.fsnodes++;
			cache.wait++;
			fs[opts.symbolicLinks ? 'lstat' : 'stat'](path, function(err, stats) {
				if (err) {
					if (opts.logErrors || !cache.errors.length) {
						cache.errors.push(err);
					}
					_tick(err, path, stats, _next_empty);
				} else if (!stats.isDirectory() || stats.isSymbolicLink()) {
					cache.files++;
					_tick(err, path, stats, _next_empty);
				} else {
					cache.dirs++;
					cache.wait++;
					_tick(err, path, stats, function () {
						cache.count++;
						fs.readdir(path, function(err, files) {
							if(err) {
								if (opts.logErrors || !cache.errors.length) {
									cache.errors.push(err);
								}
							} else {
								files.forEach(function (file) {
									_next(path + ( path[path.length -1] === separator ? "" : separator ) + file);
								});
							}
							_next_empty();
						});
					});
					
				}
			});
		}
	};
	_next(path);
};

var walkSync = function(path, opts, callback, onend_callback) {
	path = _classes.path.normalize(path);
	var fs;
	var separator = _classes.path.sep;


	if (typeof(opts) === "function") {
		callback	= opts;
		opts	= {};
		if (typeof(callback) === "function") {
			onend_callback	= callback;
		}
	}

	if (typeof(onend_callback) !== "function") {
		onend_callback	= function () {};
	}
	
	if (typeof(opts) !== "object") {
		opts	= {};
	}

	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	if (typeof(opts.skipErrors) === "undefined") {
		opts.skipErrors	= false;
	}

	if (typeof(opts.logErrors) === "undefined") {
		opts.logErrors	= false;
	}

	if (!fs)
		fs	= opts.fs || _classes.fs;
	
	var cache	= {
		files	: 0,
		dirs	: 0,
		fsnodes	: 0,
		errors	: []
	};

	var errorsSend	= false;
	var _tick	= function (err, path, stats, next) {
		if (cache.errors.length && !opts.skipErrors) {
			throw(cache.errors[0]);
		} else if (next) {
			callback(err, path, stats, next, cache);
		}
	};
	var _next_empty	= function () {};
	var _next	= function (path) {
		if (path) {
			var er, err;
			var stats;
			try {
				stats = fs[opts.symbolicLinks ? 'lstatSync' : 'statSync'](path);
			} catch (er) {
				err = er;
			};

			if (err) {
				if (opts.logErrors || !cache.errors.length) {
					cache.errors.push(err);
				}
				_tick(err, path, stats, _next_empty);
			} else if (!stats.isDirectory() || stats.isSymbolicLink()) {
				_tick(err, path, stats, _next_empty);
				cache.files++;
			} else {
				err	= undefined;
				er	= undefined;
				cache.dirs++;
				_tick(err, path, stats, function () {
					var files;
					try {
						files = fs.readdirSync(path);
					} catch (er) {
						err	= er;
					};
					if(err) {
						if (opts.logErrors || !cache.errors.length) {
							cache.errors.push(err);
							_next();
						}
					} else {
						if (Array.isArray(files)) {
							files.forEach(function (file) {
								_next(path + ( path[path.length -1] === separator ? "" : separator ) + file);
							});
						}
					}
				});
			}
		}
	};
	_next(path);
	onend_callback((opts.logErrors ? cache.errors : cache.errors[0]), cache);
};


walk.walk	= walk;
walk.sync	= walkSync;

module.exports = walk;
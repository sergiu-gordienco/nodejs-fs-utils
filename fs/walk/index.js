var _classes = {
	fs	: require("fs"),
	path	: require("path")
};
/**
 * @typedef {Object} walkCache
 * @property {String[]} stack current size of stack paths that should be processed
 * @property {Number} wait current number of elements that are processed right now
 * @property {Number} count current count of detected elements ( files, directories or symlinks ) except error cases
 * @property {Number} files current count of detected files
 * @property {Number} dirs current count of detected directories
 * @property {Number} fsnodes current count of detected directories include items with errors
 * @property {Error[]} errors all errors that were detected during processing
 */

/**
 * @callback walkCallback
 * @param {Error} err error if occurred
 * @param {String} path current processed path
 * @param {import('fs').Stats} stats current FileSystem Stats
 * @param {Function} next require call of next processing
 * @param {walkCache} cache cache statistics
 */

/**
 * @typedef {Object} walkOptions
 * @property {Boolean} [symbolicLinks=true] support symbolic links, default value is `true`
 * @property {Boolean} [skipErrors=false] if is set to `true`, then processing will not be interrupted by errors, default value is `false`
 * @property {Boolean} [logErrors=false] if is set to `true`, then all errors will be shown in console, default value is `false`
 * @property {Boolean} [stackPushEnd=false] indicate where to push new detected folders in the end or on the beginning of stack, default value is `false`
 * @property {import('fs')} [fs] user specific file system
 */

/**
 * walk through file system tree
 * @param {String} path root path
 * @param {walkOptions} opts additional options applied
 * @param {walkCallback} callback callback that receives current processed file
 * @param {function(Error|Error[], walkCache):void} onend_callback
 */
var walk = function(path, opts, callback, onend_callback) {
	path = _classes.path.normalize(path);
	var fs;
	var separator = _classes.path.sep;


	if (typeof(opts) === "function") {
		if (typeof(callback) === "function") {
			onend_callback	= callback;
		}
		callback	= opts;
		opts	= {};
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

	if (typeof(opts.stackPushEnd) === "undefined") {
		opts.stackPushEnd	= false;
	}

	if (!fs) {
		fs	= opts.fs || _classes.fs;
	}

	var cache	= {
		stack   : [],
		count	: 0,
		get wait() {
			return cache.stack.length;
		},
		files	: 0,
		dirs	: 0,
		fsnodes	: 0,
		errors	: []
	};
	var finalCallback	= false;
	var fnc	= 0;
	var errorsSend	= false;


	var _tick	= function () {
		if (cache.errors.length && !opts.skipErrors) {
			if (!errorsSend) {
				errorsSend	= true;
				if (!finalCallback) {
					finalCallback = true;
					onend_callback((opts.logErrors ? cache.errors : cache.errors[0]), cache);
				}
			}
			return;
		} else if (cache.stack.length === 0) {
			if (!finalCallback) {
				finalCallback = true;
				onend_callback((opts.logErrors ? cache.errors : cache.errors[0]), cache);
			}
		} else {
			var path = cache.stack.shift();
			cache.fsnodes++;
			fs[opts.symbolicLinks ? 'lstat' : 'stat'](path, function(err, stats) {
				if (err) {
					if (opts.logErrors || !cache.errors.length) {
						cache.errors.push(err);
					}
					callback(err, path, stats, _tick, cache);
				} else if (!stats.isDirectory() || stats.isSymbolicLink()) {
					cache.count++;
					cache.files++;
					callback(err, path, stats, _tick, cache);
				} else {
					cache.count++;
					cache.dirs++;
					fs.readdir(path, function(err, files) {
						if(err) {
							if (opts.logErrors || !cache.errors.length) {
								cache.errors.push(err);
							}
						} else {
							if (opts.stackPushEnd) {
								files.forEach(function (file) {
									cache.stack.push(path + ( path[path.length -1] === separator ? "" : separator ) + file);
								});
							} else {
								files.forEach(function (file) {
									cache.stack.unshift(path + ( path[path.length -1] === separator ? "" : separator ) + file);
								});
							}
						}
						callback(err, path, stats, _tick, cache);
					});
				}
			});
		}
	};

	cache.stack.push(path);
	_tick();
};

/**
 * walk through file system tree synchronously
 * @param {String} path root path
 * @param {walkOptions} opts additional options applied
 * @param {walkCallback} callback callback that receives current processed file
 * @param {function(Error|Error[], walkCache):void} onend_callback
 */
var walkSync = function(path, opts, callback, onend_callback) {
	path = _classes.path.normalize(path);
	var fs;
	var separator = _classes.path.sep;


	if (typeof(opts) === "function") {
		if (typeof(callback) === "function") {
			onend_callback	= callback;
		}
		callback	= opts;
		opts	= {};
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


walk.sync	= walkSync;

module.exports = walk;
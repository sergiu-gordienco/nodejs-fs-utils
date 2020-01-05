let _classes = {
	fs	: require("fs"),
	fsu	: {
		walk       : require('../walk'),
		walkSync   : require('../walk').sync,
		mkdirs     : require('../mkdirs'),
		mkdirsSync : require('../mkdirs').sync
	},
	path	: require("path")
};

/**
 * copy a file from one path to another
 * @param {String} source source address
 * @param {String} target destination address
 * @param {function(Error):void} cb
 */
var copyFile	= function (source, target, cb, fs) {
	var cbCalled = false;
	fs = fs || _classes.fs;
	var rd = fs.createReadStream(source);
	rd.on("error", function(err) {
		done(err, "read-error");
	});
	var wr = fs.createWriteStream(target);
	wr.on("error", function(err) {
		done(err, "write-error");
	});
	wr.on("close", function(ex) {
		done(undefined, "close");
	});
	rd.pipe(wr);

	function done(err, eventType) {
		if (!cbCalled) {
			cbCalled = true;
			cb(err);
		}
	}
};


/**
 * copy a file from one path to another
 * @param {String} source source address
 * @param {String} target destination address
 * @returns {void}
 */
var copyFileSync	= function (srcFile, destFile, fs) {
	var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
	fs = fs || _classes.fs;
	BUF_LENGTH = 64 * 1024;
	buff = Buffer.alloc(BUF_LENGTH);
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

var path_dest	= function (source, dest, path, mode) {
	// mode "auto", "none", "relative", "absolute"
	// TODO mode: relative absolute auto none
	// console.log("\033[7m",source, '../', dest, path, "\033[0m");
	// console.log("\033[7;32m",_classes.path.resolve(_classes.path.resolve(source, '../', dest), _classes.path.relative(source, path)), "\033[0m");
	var destPathAbsolute	= _classes.path.resolve(_classes.path.resolve(source, '../', dest), _classes.path.relative(source, path));
	if (mode === "absolute") {
		return destPathAbsolute;
	} else if (mode === "relative") {
		return _classes.path.relative(source, destPathAbsolute);
	} else if (mode === "none") {
		return destPathAbsolute;
	}
	return destPathAbsolute;
};

/**
 * @typedef {Object} copyOptions
 * @property {("file"|"directory"|"all")} [keepSymlinks="all"] keep symlinks, default value is `"all"`
 * @property {("auto"|"none"|"relative"|"absolute")} [symlinksNormalize="auto"] transform and normalize symlinks, default value is `auto`
 * @property {("auto"|"none"|"relative"|"absolute")} [linkFiles="none"] link files instead of copy them, default value is `none`
 *
 * @property {Boolean} [symbolicLinks=true] support symbolic links, default value is `true`
 * @property {Boolean} [skipErrors=false] if is set to `true`, then processing will not be interrupted by errors, default value is `false`
 * @property {Boolean} [logErrors=false] if is set to `true`, then all errors will be shown in console, default value is `false`
 * @property {Boolean} [stackPushEnd=false] indicate where to push new detected folders in the end or on the beginning of stack, default value is `false`
 * @property {import('fs')} [fs] user specific file system
 */
/**
 * @typedef {Object} copyCache
 * @property {String[]} stack current size of stack paths that should be processed
 * @property {Number} wait current number of elements that are processed right now
 * @property {Number} count current count of detected elements ( files, directories or symlinks ) except error cases
 * @property {Number} files current count of detected files
 * @property {Number} dirs current count of detected directories
 * @property {Number} fsnodes current count of detected directories include items with errors
 * @property {Error[]} errors all errors that were detected during processing
 */
/**
 * Copy files from one path to another, easily manage copy process for links using additional options
 * @param {String} path_source source address that should be copied
 * @param {String} dest destination address where source will be copied
 * @param {function (Array<Error>, copyCache):void} callback callback that will handle when copy process was finished
 * @param {copyOptions} opts set of options to configure copy process
 */
function copy(path_source, dest, callback, opts) {
	path_source = _classes.path.normalize(path_source);
	dest = _classes.path.normalize(dest);
	var separator = _classes.path.sep;

	if (typeof(opts) !== "object") {
		opts	= {};
	}
	var fs;
	if (!fs) fs	= opts.fs || _classes.fs;
	if (typeof(opts.symlinksKeep) === "undefined") {
		// file / directory / all
		opts.keepSymlinks	= "all";
	} else if (["file", "directory", "all"].indexOf(opts.keepSymlinks) === -1) {
		opts.keepSymlinks	= "all";
	}
	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}
	if (typeof(opts.symlinksNormalize) === "undefined") {
		// auto / none / relative / absolute
		opts.symlinksNormalize	= "auto";
	} else if (["auto", "none", "relative", "absolute"].indexOf(opts.symlinksNormalize) === -1) {
		opts.symlinksNormalize	= "auto";
	}
	if (typeof(opts.linkFiles) === "undefined") {
		// auto / none / relative / absolute
		opts.linkFiles	= "none";
	} else if (["auto", "none", "relative", "absolute"].indexOf(opts.linkFiles) === -1) {
		opts.linkFiles	= "none";
	}
	_classes.fsu.walk(path_source, opts, function (err, path, stats, next, cache) {
		if (!stats) {
			if (err) {
				cache.errors.push(new Error("Falied to copy Error", { stats: stats, path: path, err: err }));
			}
			next();
		} else if (stats.isDirectory()) {
			_classes.fsu.mkdirs(path_dest(path_source, dest, path), function (err) {
				if (err) {
					cache.errors.push(new Error("Falied to copy [Directory]", { stats: stats, path: path, dest: dest, err: err }));
				}
				next();
			}, opts);
		} else if (stats.isSymbolicLink()) {
			var symPath	= undefined;
			fs[opts.symbolicLinks ? 'lstat' : 'stat'](path, function (err, stats) {
				if (err) {
					if (err) {
						cache.errors.push(new Error("Falied to copy [Directory]", { stats: stats, path: path, dest: dest, err: err }));
					}
					next();
				} else {
					if (stats.isDirectory()) {
						if (opts.keepSymlinks === "directory" || opts.keepSymlinks === "all") {
							if (opts.symlinksNormalize === "none" || opts.symlinksNormalize === "relative") {
								fs.readlink(path, 'utf-8', function (err, symlinkPath) {
									if (err) {
										cache.errors.push(new Error("Falied to link [Directory] " + path, { stats: stats, dest: dest, path: path, err: err }));
										symlinkPath = path;
									}
									let destPath = path_dest(path_source, dest, path);
									let symlinkPathAbsolute = _classes.path.resolve(_classes.path.dirname(path), symlinkPath)
									if (opts.symlinksNormalize === "absolute") {
										symlinkPath = symlinkPathAbsolute;
									} else if (opts.symlinksNormalize === "relative") {
										symlinkPath = _classes.path.relative(
											_classes.path.dirname(path),
											symlinkPathAbsolute
										);
									}
									fs.symlink(symlinkPath, destPath, 'dir', function (err) {
										if (err) {
											cache.errors.push(new Error("Falied to link [Directory] " + path, { stats: stats, dest: dest, path: path, err: err }));
										}
										next();
									});
								});
							} else {
								fs.readlink(path, 'utf-8', function (err, symlinkPath) {
									if (err) {
										cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
										symlinkPath = path;
									}
									fs.symlink(symlinkPath, path_dest(path_source, dest, path), 'dir', function (err) {
										if (err) {
											cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
										}
										next();
									});
								});
							}
						} else {
							_classes.fsu.mkdirs(path_dest(path_source, dest, path), function (err) {
								if (err) {
									cache.errors.push(new Error("Falied to copy [Directory]", { stats: stats, path: path, dest: dest, err: err }));
								}
								next();
							}, opts);
						}
					} else {
						// for file and other types
						if (opts.keepSymlinks === "file" || opts.keepSymlinks === "all") {
							if (opts.symlinksNormalize === "none" || opts.symlinksNormalize === "relative" || opts.symlinksNormalize === "absolute") {
								fs.readlink(path, 'utf-8', function (err, symlinkPath) {
									if (err) {
										cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
										symlinkPath = path;
									}
									let destPath = path_dest(path_source, dest, path);
									let symlinkPathAbsolute = _classes.path.resolve(_classes.path.dirname(path), symlinkPath)
									if (opts.symlinksNormalize === "absolute") {
										symlinkPath = symlinkPathAbsolute;
									} else if (opts.symlinksNormalize === "relative") {
										symlinkPath = _classes.path.relative(
											_classes.path.dirname(path),
											symlinkPathAbsolute
										);
									}
									fs.symlink(symlinkPath, destPath, 'file', function (err) {
										if (err) {
											cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
										}
										next();
									});
								});
							} else {
								fs.readlink(path, 'utf-8', function (err, symlinkPath) {
									if (err) {
										cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
										symlinkPath = path;
									}
									fs.symlink(symlinkPath, path_dest(path_source, dest, path), 'file', function (err) {
										if (err) {
											cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
										}
										next();
									});
								});
							}
						} else {
							copyFile(path, path_dest(path_source, dest, path), function (err) {
								if (err) {
									cache.errors.push(new Error("Falied to copy [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
								}
								next();
							}, fs);
						}
					}
				}
			});
			// cache.errors.push(new Error("Falied to copy [SymbolicLink]", { stats: stats, path: path }));
		} else if (stats.isFile()) {
			if (opts.linkFiles !== "none") {
				fs.symlink(path, path_dest(path_source, dest, path, opts.linkFiles), 'file', function (err) {
					if (err) {
						cache.errors.push(new Error("Falied to link [File] " + path, { stats: stats, dest: dest, path: path, err: err }));
					}
					next();
				});
			} else {
				copyFile(path, path_dest(path_source, dest, path), function (err) {
					if (err) {
						cache.errors.push(new Error("Falied to copy [File]", { stats: stats, dest: dest, path: path, err: err }));
					}
					next();
				}, fs);
			}
		} else if (stats.isBlockDevice()) {
			cache.errors.push(new Error("Falied to copy [BlockDevice]", { stats: stats, path: path }));
			next();
		} else if (stats.isCharacterDevice()) {
			cache.errors.push(new Error("Falied to copy [CharacterDevice]", { stats: stats, path: path }));
			next();
		} else if (stats.isFIFO()) {
			cache.errors.push(new Error("Falied to copy [FIFO]", { stats: stats, path: path }));
			next();
		} else if (stats.isSocket()) {
			cache.errors.push(new Error("Falied to copy [Socket]", { stats: stats, path: path }));
			next();
		} else {
			cache.errors.push(new Error("Falied to copy [Unknown]", { stats: stats, path: path }));
			next();
		}
	}, function (errors, cache) {
		callback(errors, cache);
	});
};

/**
 * Copy files from one path to another synchronously, easily manage copy process for links using additional options
 * @param {String} path_source source address that should be copied
 * @param {String} dest destination address where source will be copied
 * @param {function (Array<Error>, copyCache):void} callback callback that will handle when copy process was finished
 * @param {copyOptions} opts set of options to configure copy process
 */
var copySync = function(path_source, dest, callback, opts) {
	path_source = _classes.path.normalize(path_source);
	dest = _classes.path.normalize(dest);
	var separator = _classes.path.sep;

	var fs;
	if (!fs) fs	= opts.fs || _classes.fs;

	if (typeof(opts) !== "object") {
		opts	= {};
	}
	if (typeof(opts.symlinksKeep) === "undefined") {
		// file / directory / all
		opts.keepSymlinks	= "all";
	} else if (["file", "directory", "all"].indexOf(opts.keepSymlinks) === -1) {
		opts.keepSymlinks	= "all";
	}
	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}
	if (typeof(opts.symlinksNormalize) === "undefined") {
		// auto / none / relative / absolute
		opts.symlinksNormalize	= "auto";
	} else if (["auto", "none", "relative", "absolute"].indexOf(opts.symlinksNormalize) === -1) {
		opts.symlinksNormalize	= "auto";
	}
	if (typeof(opts.linkFiles) === "undefined") {
		// auto / none / relative / absolute
		opts.linkFiles	= "none";
	} else if (["auto", "none", "relative", "absolute"].indexOf(opts.linkFiles) === -1) {
		opts.linkFiles	= "none";
	}
	_classes.fsu.walkSync(path_source, opts, function (err, path, stats, next, cache) {
		if (!stats) {
			if (err) {
				cache.errors.push(new Error("Falied to copy Error", { stats: stats, path: path, err: err }));
			}
			next();
		} else if (stats.isDirectory()) {
			try {
				_classes.fsu.mkdirsSync(path_dest(path_source, dest, path), opts);
			} catch (err) {
				cache.errors.push(new Error("Falied to copy [Directory]", { stats: stats, path: path, dest: dest, err: err }));
			}
			next();
		} else if (stats.isSymbolicLink()) {
			var symPath	= undefined;
			try {
				stats = _classes.fs[opts.symbolicLinks ? 'lstatSync' : 'statSync'](path);

				if (stats.isDirectory()) {
					if (opts.keepSymlinks === "directory" || opts.keepSymlinks === "all") {
						try {
							if (opts.symlinksNormalize === "none" || opts.symlinksNormalize === "relative" || opts.symlinksNormalize === "absolute") {
								let destPath = path_dest(path_source, dest, path);
								let symlinkPath = fs.readlinkSync(path, 'utf-8');
								let symlinkPathAbsolute = _classes.path.resolve(_classes.path.dirname(path), symlinkPath)
								if (opts.symlinksNormalize === "absolute") {
									symlinkPath = symlinkPathAbsolute;
								} else if (opts.symlinksNormalize === "relative") {
									symlinkPath = _classes.path.relative(
										_classes.path.dirname(path),
										symlinkPathAbsolute
									);
								}
								// let createTemporar = false;
								// let symlinkDestPathAbsolute = _classes.path.resolve(_classes.path.dirname(destPath), symlinkPath);
								// if (!fs.existsSync(symlinkDestPathAbsolute)) {
								// 	fs.writeFileSync(symlinkDestPathAbsolute, '', 'w');
								// 	createTemporar = true;
								// }
								
								fs.symlinkSync(
									symlinkPath,
									destPath,
									'dir'
								);
								// if (createTemporar) {
								// 	fs.unlinkSync(symlinkDestPathAbsolute);
								// }
							} else {
								fs.symlinkSync(fs.readlinkSync(path), path_dest(path_source, dest, path), 'dir');
							}
						} catch (err) {
							cache.errors.push(new Error("Falied to link [Directory]", { stats: stats, path: path, dest: dest, err: err }));
						}
						next();
					} else {
						try {
							_classes.fsu.mkdirsSync(path_dest(path_source, dest, path), opts);
						} catch (err) {
							cache.errors.push(new Error("Falied to copy [Directory]", { stats: stats, path: path, dest: dest, err: err }));
						}
						next();
					}
				} else {
					// for file and other types
					if (opts.keepSymlinks === "file" || opts.keepSymlinks === "all") {
						try {
							if (opts.symlinksNormalize === "none" || opts.symlinksNormalize === "relative" || opts.symlinksNormalize === "absolute") {
								let destPath = path_dest(path_source, dest, path);
								let symlinkPath = fs.readlinkSync(path, 'utf-8');
								let symlinkPathAbsolute = _classes.path.resolve(_classes.path.dirname(path), symlinkPath)
								if (opts.symlinksNormalize === "absolute") {
									symlinkPath = symlinkPathAbsolute;
								} else if (opts.symlinksNormalize === "relative") {
									symlinkPath = _classes.path.relative(
										_classes.path.dirname(path),
										symlinkPathAbsolute
									);
								}
								// let createTemporar = false;
								// let symlinkDestPathAbsolute = _classes.path.resolve(_classes.path.dirname(destPath), symlinkPath);
								// if (!fs.existsSync(symlinkDestPathAbsolute)) {
								// 	fs.writeFileSync(symlinkDestPathAbsolute, '', 'w');
								// 	createTemporar = true;
								// }
								
								fs.symlinkSync(
									symlinkPath,
									destPath,
									'file'
								);
								// if (createTemporar) {
								// 	fs.unlinkSync(symlinkDestPathAbsolute);
								// }
							} else {
								fs.symlinkSync(fs.readlinkSync(path), path_dest(path_source, dest, path), 'file');
							}
						} catch (err) {
							cache.errors.push(new Error("Falied to link [File] \""+ path +"\" » \""+ dest +"\" ", { stats: stats, dest: dest, path: path, err: err }));
						}
						next();
					} else {
						try {
							copyFileSync(path, path_dest(path_source, dest, path), fs);
						} catch (err) {
							cache.errors.push(new Error("Falied to copy [File]", { stats: stats, dest: dest, path: path, err: err }));
						}
						next();
					}
				}
			} catch (err) {
				cache.errors.push(new Error("Falied to copy Error", { stats: stats, path: path, err: err }));
				next();
			}
			return;
			// cache.errors.push(new Error("Falied to copy [SymbolicLink]", { stats: stats, path: path }));
		} else if (stats.isFile()) {
			if (opts.linkFiles !== "none") {
				try {
					fs.symlinkSync(path, path_dest(path_source, dest, path, opts.linkFiles), 'file');
				} catch (err) {
					cache.errors.push(new Error("Falied to link [File]", { stats: stats, dest: dest, path: path, err: err }));
				}
				next();
			} else {
				try {
					copyFileSync(path, path_dest(path_source, dest, path), fs);
				} catch (err) {
					cache.errors.push(new Error("Falied to copy [File]", { stats: stats, dest: dest, path: path, err: err }));
				}
				next();
			}
		} else if (stats.isBlockDevice()) {
			cache.errors.push(new Error("Falied to copy [BlockDevice]", { stats: stats, path: path }));
			next();
		} else if (stats.isCharacterDevice()) {
			cache.errors.push(new Error("Falied to copy [CharacterDevice]", { stats: stats, path: path }));
			next();
		} else if (stats.isFIFO()) {
			cache.errors.push(new Error("Falied to copy [FIFO]", { stats: stats, path: path }));
			next();
		} else if (stats.isSocket()) {
			cache.errors.push(new Error("Falied to copy [Socket]", { stats: stats, path: path }));
			next();
		} else {
			cache.errors.push(new Error("Falied to copy [Unknown]", { stats: stats, path: path }));
			next();
		}
	}, function (errors, cache) {
		callback(errors, cache);
	});
};


copy.copy	= copy;
copy.sync	= copySync;
copy.copyFileSync = copyFileSync;
copy.copyFile     = copyFile;

module.exports = copy;
var _classes = {
	fs	: require("fs"),
	fsu	: {
		mkdirs     : require('../mkdirs'),
		mkdirsSync : require('../mkdirs').sync
	},
	path	: require("path")
};

/**
 * @typedef {Object} createFileOptions
 *
 * @property {Number} mode file permissions for new created folders. default value is `0777 & ~process.umask()`
 * @property {Number} fileMode file permissions for new created folders. default value is `0666`
 * @property {Boolean} [symbolicLinks=true] support symbolic links or throw error if one detected
 * @property {import('fs')} [fs] user specific file system
 */

/**
 * create a file and parent folders if needed
 * @param {String} path filePath
 * @param {createFileOptions} opts additional options
 * @param {function(Error):void} callback
 */
var createFile	= function (path, opts, callback) {
	var file	= _classes.path.normalize(path);
	var dir		= _classes.path.dirname(file);
	if (typeof(opts) === "function") {
		callback	= opts;
		opts		= undefined;
	}

	opts = opts || {};
	var fs; if (!fs) fs	= opts.fs || _classes.fs;

	var mode = opts.fileMode;
	if (mode === undefined) {
		mode = 0666;
	}

	fs.stat(file, function (err, stats) {
		if (err) {
			_classes.fsu.mkdirs(dir, function (err) {
				if (err) {
					callback(err);
				} else {
					fs.open(file, 'a', mode, function (err, fd) {
						if (err) {
							callback(err);
						} else {
							fs.close(fd, callback);
						}
					});
				}
			}, opts);
		} else {
			if (stats.isFile()) {
				// already exists
				callback();
			} else {
				callback(Error("NONFILE_ALREADY_EXISTS"));
			}
		}
	});
};

createFile.sync	= function (path, opts) {
	var file	= _classes.path.normalize(path);
	var dir		= _classes.path.dirname(file);
	if (typeof(opts) === "function") {
		callback	= opts;
		opts		= undefined;
	}
	opts = opts || {};
	var fs; if (!fs) fs	= opts.fs || _classes.fs;

	var mode = opts.fileMode;
	if (mode === undefined) {
		mode = 0666;
	}

	var err;
	try {
		var stats	= fs.statSync(file);
		if (stats.isFile()) {
			// already exists
		} else {
			throw Error("NONFILE_ALREADY_EXISTS");
		}
	} catch (err) {
		_classes.fsu.mkdirsSync(dir, opts);
		fs.closeSync(fs.openSync(file, 'a', mode));
	}
};

module.exports	= {
	createFile	: createFile
};
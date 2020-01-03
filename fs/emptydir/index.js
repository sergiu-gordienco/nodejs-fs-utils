var _classes = {
	fs	: require("fs"),
	fsu	: {
		rmdirs : require('../rmdirs'),
		rmdirsSync : require('../rmdirs').sync
	},
	path	: require("path")
};

/**
 * @description verify if a folder is empty
 * @param {String} path file system address of a directory
 * @param {function(Error, Boolean):void} callback
 * @returns {void}
 */
var isEmpty	= function (path, callback) {
	_classes.fs.readdir(path, function (err, files) {
		if (err === null) {
			callback(null, !files.length)
		} else {
			callback(err);
		}
	});
};
/**
 * verify if a folder is empty
 * @property {String} path file system address of a directory
 * @returns {Boolean}
 */
isEmpty.sync = function (path) {
	var files = _classes.fs.readdirSync(path);
	return !files.length;
};

/**
 * @typedef {Object} emptyDirOptions
 *
 * @property {Boolean} [skipErrors=false] if is `true` function will not be interrupted by errors, and will remove rest of files, default value is `false`
 * @property {Boolean} [symbolicLinks=true] support symbolic links
 * @property {import('fs')} [fs] user specific file system
 */

/**
 * remove contents of a directory
 * @param {String} path the path of the folder that requires to be empty
 * @param {function(Error | Error[]):void} callback callback that will be handled when processing fill be finished
 * @param {emptyDirOptions} opts additional options
 */
function emptyDir(path, callback, opts) {
	opts = opts || {};
	var fs = opts.fs || _classes.fs;
	fs.readdir(path, function (err, files) {
		if (!err) {
			var next	= function () {
				// console.log(files)
				if (Array.isArray(files) && files.length) {
					var file	= files.shift();
					_classes.fsu.rmdirs(_classes.path.join(path, file), function (err) {
						// console.log("\033[33m", _classes.path.join(path, file), err, "\033[0m");
						if (err) {
							callback(err);
						} else {
							next();
						}
					}, opts);
				} else {
					callback();
				}
			};
			next();
		} else {
			callback(err);
		}
	});
};


/**
 * remove contents of a directory
 * @param {String} path the path of the folder that requires to be empty
 * @param {emptyDirOptions} opts additional options
 */
emptyDir.sync	= function (path, opts) {
	opts = opts || {};
	var fs = opts.fs || _classes.fs;
	var files = fs.readdirSync(path);
	var i;
	for (i=0;i<files.length;i++) {
		_classes.fsu.rmdirsSync(_classes.path.join(path, files[i]), opts);
	}
	return !!files.length;
};

emptyDir.isEmpty	= isEmpty;

module.exports = emptyDir;
var _classes = {
	fs	: require("fs"),
	fsu	: {
		copy       : require('../copy'),
		copySync   : require('../copy').sync,
		rmdirs     : require('../rmdirs'),
		rmdirsSync : require('../rmdirs').sync
	},
	path	: require("path")
};
/**
 * @typedef {Object} moveOptions
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
 * move a file or folder from one path to another path, it will try to move file if it is not possible it will copy it and remove source
 * @param {String} oldPath source path
 * @param {String} newPath destination path
 * @param {function (Error|Error[]):void} callback handle when moving is finished
 * @param {moveOptions} opts additional options that will be used if moving will not be possible using system action
 */
var move	= function (oldPath, newPath, callback, opts) {
	opts = opts || {};
	var fs = opts.fs || _classes.fs;
	fs.rename(oldPath, newPath, function (err) {
		if (err) {
			if (err.code === 'EXDEV') {
				// copy and unlink
				_classes.fsu.copy(oldPath, newPath, function (err, cache) {
					if (err && !Array.isArray(err)) {
						callback(err);
					} else {
						_classes.fsu.rmdirs(
							oldPath,
							callback,
							opts
						);
					}
				}, opts);
			} else {
				callback(err);
			}
		} else {
			callback();
		}
	});
};

/**
 * move a file or folder from one path to another path, it will try to move file if it is not possible it will copy it and remove source
 * @param {String} oldPath source path
 * @param {String} newPath destination path
 * @param {moveOptions} opts additional options that will be used if moving will not be possible using system action
 */
move.sync	= function (oldPath, newPath, opts) {
	var err;
	try {
		_classes.fs.renameSync(oldPath, newPath);
	} catch(err) {
		if (err) {
			if (err.code === 'EXDEV') {
				// copy and unlink
				_classes.fsu.copySync(oldPath, newPath, function (err, cache) {
					if (err && !Array.isArray(err)) {
						throw err;
					} else {
						_classes.fsu.rmdirsSync(oldPath);
					}
				}, opts);
			} else {
				throw err;
			}
		}
	};
};

module.exports	= move;
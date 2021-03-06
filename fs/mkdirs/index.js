var path = require('path');
var fs = require('fs');

module.exports = mkdirs.mkdirs = mkdirs;

/**
 * @typedef {Object} mkdirsOptions
 *
 * @property {Number} mode file permissions for new created folders. default value is `0777 & ~process.umask()`
 * @property {Boolean} [symbolicLinks=true] support symbolic links or throw error if one detected
 * @property {import('fs')} [fs] user specific file system
 */

/**
 * created a folder and its parents if needed
 * @param {String} p path of the folder
 * @param {mkdirsOptions} opts additional options
 * @param {function(Error, String):void} f
 * @param {Boolean} last_path return last created path
 */
function mkdirs (p, opts, f, last_path) {
	if (typeof opts === 'function') {
		f = opts;
		opts = {};
	}
	else if (!opts || typeof opts !== 'object') {
		opts = { mode: opts };
	}

	/**
	 * adding safe version without that will throw exception on links
	 * excluding writing in other place
	 */
	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	var mode = opts.mode;
	var xfs = opts.fs || fs;

	if (mode === undefined) {
		mode = 0777 & (~process.umask());
	}
	if (!last_path) last_path = null;

	var cb = f || function () {};
	p = path.resolve(p);

	xfs.mkdir(p, mode, function (er) {
		if (!er) {
			last_path = last_path || p;
			return cb(null, last_path);
		}
		switch (er.code) {
			case 'ENOENT':
				mkdirs(path.dirname(p), opts, function (er, last_path) {
					if (er) cb(er, last_path);
					else mkdirs(p, opts, cb, last_path);
				});
				break;
			default:
				xfs[opts.symbolicLinks ? 'lstat' : 'stat'](p, function (er2, stat) {
					if (er2 || !stat.isDirectory()) cb((er || (er2 || Error("NOTDIR"))), last_path);
					else cb(null, last_path);
				});
				break;
		}
	});
}


/**
 * created a folder and its parents if needed
 * @param {String} p path of the folder
 * @param {mkdirsOptions} opts additional options
 * @param {Boolean} last_path return last created path
 * @returns {String}
 */
mkdirs.sync = function sync (p, opts, last_path) {
	if (!opts || typeof opts !== 'object') {
		opts = { mode: opts };
	}

	/**
	 * adding safe version without that will throw exception on links
	 * excluding writing in other place
	 */
	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	var mode = opts.mode;
	var xfs = opts.fs || fs;

	if (mode === undefined) {
		mode = 0777 & (~process.umask());
	}
	if (!last_path) last_path = null;

	p = path.resolve(p);

	try {
		xfs.mkdirSync(p, mode);
		last_path = last_path || p;
	}
	catch (err0) {
		switch (err0.code) {
			case 'ENOENT' :
				last_path = sync(path.dirname(p), opts, last_path);
				sync(p, opts, last_path);
				break;

			default:
				var stat;
				try {
					stat = xfs[opts.symbolicLinks ? 'lstatSync' : 'statSync'](p);
				}
				catch (err1) {
					throw err0;
				}
				if (!stat.isDirectory()) throw err0;
				break;
		}
	}

	return last_path;
};

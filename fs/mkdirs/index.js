var path = require('path');
var fs = require('fs');

module.exports = mkdirs.mkdirs = mkdirs;

function mkdirs (p, opts, f, callback) {
	if (typeof opts === 'function') {
		f = opts;
		opts = {};
	}
	else if (!opts || typeof opts !== 'object') {
		opts = { mode: opts };
	}
	
	/**
	 * adding safe version without that will throw exception on links
	 * excuding writing in other place
	 */
	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}

	var mode = opts.mode;
	var xfs = opts.fs || fs;
	
	if (mode === undefined) {
		mode = 0777 & (~process.umask());
	}
	if (!callback) callback = null;
	
	var cb = f || function () {};
	p = path.resolve(p);
	
	xfs.mkdir(p, mode, function (er) {
		if (!er) {
			callback = callback || p;
			return cb(null, callback);
		}
		switch (er.code) {
			case 'ENOENT':
				mkdirs(path.dirname(p), opts, function (er, callback) {
					if (er) cb(er, callback);
					else mkdirs(p, opts, cb, callback);
				});
				break;
			default:
				xfs[opts.symbolicLinks ? 'lstat' : 'stat'](p, function (er2, stat) {
					if (er2 || !stat.isDirectory()) cb(er, callback)
					else cb(null, callback);
				});
				break;
		}
	});
}

mkdirs.sync = function sync (p, opts, callback) {
	if (!opts || typeof opts !== 'object') {
		opts = { mode: opts };
	}
	
	/**
	 * adding safe version without that will throw exception on links
	 * excuding writing in other place
	 */
	if (typeof(opts.symbolicLinks) === "undefined") {
		opts.symbolicLinks	= true;
	}
	
	var mode = opts.mode;
	var xfs = opts.fs || fs;
	
	if (mode === undefined) {
		mode = 0777 & (~process.umask());
	}
	if (!callback) callback = null;

	p = path.resolve(p);

	try {
		xfs.mkdirSync(p, mode);
		callback = callback || p;
	}
	catch (err0) {
		switch (err0.code) {
			case 'ENOENT' :
				callback = sync(path.dirname(p), opts, callback);
				sync(p, opts, callback);
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

	return callback;
};

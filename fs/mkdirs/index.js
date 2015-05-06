var path = require('path');
var fs = require('fs');

module.exports = mkdirs.mkdirs = mkdirs;

function mkdirs (p, opts, f, made) {
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
	if (!made) made = null;
	
	var cb = f || function () {};
	p = path.resolve(p);
	
	xfs.mkdir(p, mode, function (er) {
		if (!er) {
			made = made || p;
			return cb(null, made);
		}
		switch (er.code) {
			case 'ENOENT':
				mkdirs(path.dirname(p), opts, function (er, made) {
					if (er) cb(er, made);
					else mkdirs(p, opts, cb, made);
				});
				break;
			default:
				xfs[opts.symbolicLinks ? 'lstat' : 'stat'](p, function (er2, stat) {
					if (er2 || !stat.isDirectory()) cb(er, made)
					else cb(null, made);
				});
				break;
		}
	});
}

mkdirs.sync = function sync (p, opts, made) {
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
	if (!made) made = null;

	p = path.resolve(p);

	try {
		xfs.mkdirSync(p, mode);
		made = made || p;
	}
	catch (err0) {
		switch (err0.code) {
			case 'ENOENT' :
				made = sync(path.dirname(p), opts, made);
				sync(p, opts, made);
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

	return made;
};

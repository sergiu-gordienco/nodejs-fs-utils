var nodejsFsUtils	= {
	ensureFile	: false,
	ensureFileSync	: false,
	outputFile		: false,
	outputFileSync	: false,
	outputJson		: false,
	outputJsonSync	: false,
	readJson		: false,
	readJsonSync	: false,
	writeJson		: false,
	writeJsonSync	: false,
};
var getLibrary	= function (list) {
	var lib	= {};
	if (list.indexOf('copy') !== -1) {
		lib.copy	= require("./fs/copy");
		lib.copySync	= require("./fs/copy").sync;
	}
	if (list.indexOf('rmdirs') !== -1) {
		lib.rmdirs	= require("./fs/rmdirs");
		lib.rmdirsSync	= require("./fs/rmdirs").sync;
		lib.remove	= require("./fs/rmdirs");
		lib.removeSync	= require("./fs/rmdirs").sync;
	}
	if (list.indexOf('fsize') !== -1) {
		lib.fsize	= require("./fs/fsize");
		lib.fsizeSync	= require("./fs/fsize").sync;
	}
	if (list.indexOf('walk') !== -1) {
		lib.walk	= require("./fs/walk");
		lib.walkSync	= require("./fs/walk").sync;
	}
	if (list.indexOf('mkdirs') !== -1) {
		lib.mkdirs	= require("./fs/mkdirs");
		lib.mkdirsSync	= require("./fs/mkdirs").sync;
		lib.ensureDir	= require("./fs/mkdirs");
		lib.ensureDirSync	= require("./fs/mkdirs").sync;
	}
	if (list.indexOf('move') !== -1) {
		lib.move	= require("./fs/move");
		lib.moveSync	= require("./fs/move").sync;
	}
	if (list.indexOf('emptydir') !== -1) {
		lib.emptyDir	= require("./fs/emptydir");
		lib.emptyDirSync	= require("./fs/emptydir").sync;
		lib.isEmpty	= require("./fs/emptydir").isEmpty;
		lib.isEmptySync	= require("./fs/emptydir").isEmpty.sync;
	}
	if (list.indexOf('output') !== -1) {
		lib.createFile	= require("./fs/output").createFile;
		lib.createFileSync	= require("./fs/output").createFile.sync;
		lib.ensureFile	= require("./fs/output").createFile;
		lib.ensureFileSync	= require("./fs/output").createFile.sync;
	}
	return lib;
};

getLibrary.allList	= ['copy', 'move', 'rmdirs', 'fsize', 'walk', 'mkdirs', 'emptydir', 'output'];
module.exports	= getLibrary;
var mrequire	= require("module-require");

mrequire("rmdirs", __dirname + "/fs/rmdirs/index.js");
mrequire("mkdirs", __dirname + "/fs/mkdirs/index.js");
mrequire("fsize", __dirname + "/fs/fsize/index.js");
mrequire("walk", __dirname + "/fs/walk/index.js");

var nodejsFsUtils	= {
	rmdirs	: mrequire("rmdirs"),
	rmdirsSync	: mrequire("rmdirs").sync,
	mkdirs	: mrequire("mkdirs"),
	mkdirsSync	: mrequire("mkdirs").sync,
	ensureDir	: mrequire("mkdirs"),
	ensureDirSync	: mrequire("mkdirs").sync,
	ensureFile	: false,
	ensureFileSync	: false,
	copy	: false,
	copySync	: false,
	emptyDir	: false,
	emptyDirSync	: false,
	move			: false,
	moveSync		: false,
	outputFile		: false,
	outputFileSync	: false,
	outputJson		: false,
	outputJsonSync	: false,
	readJson		: false,
	readJsonSync	: false,
	writeJson		: false,
	writeJsonSync	: false,
	remove			: false,
	removeSync		: false,
	fsize	: mrequire("fsize"),
	fsizeSync	: mrequire("fsize").sync,
	walk	: mrequire("walk"),
	walkSync	: mrequire("walk").sync
};
module.exports	= nodejsFsUtils;

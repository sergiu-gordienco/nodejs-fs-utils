var nodeJsFsUtils	= {
	copy	: require("./fs/copy"),
	copySync	: require("./fs/copy").sync,

	rmdirs	: require("./fs/rmdirs"),
	rmdirsSync	: require("./fs/rmdirs").sync,
	remove	: require("./fs/rmdirs"),
	removeSync	: require("./fs/rmdirs").sync,

	fsize	: require("./fs/fsize"),
	fsizeSync	: require("./fs/fsize").sync,

	walk	: require("./fs/walk/index"),
	walkSync	: require("./fs/walk").sync,

	mkdirs	: require("./fs/mkdirs"),
	mkdirsSync	: require("./fs/mkdirs").sync,
	ensureDir	: require("./fs/mkdirs"),
	ensureDirSync	: require("./fs/mkdirs").sync,

	move	: require("./fs/move"),
	moveSync	: require("./fs/move").sync,

	emptyDir	: require("./fs/emptydir"),
	emptyDirSync	: require("./fs/emptydir").sync,
	isEmpty	: require("./fs/emptydir").isEmpty,
	isEmptySync	: require("./fs/emptydir").isEmpty.sync,

	createFile	: require("./fs/output").createFile,
	createFileSync	: require("./fs/output").createFile.sync,
	ensureFile	: require("./fs/output").createFile,
	ensureFileSync	: require("./fs/output").createFile.sync
};
module.exports = nodeJsFsUtils;
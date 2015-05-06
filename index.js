var mrequire	= require("module-require");

mrequire("rmdirs", __dirname + "/fs/rmdirs/index.js");
mrequire("mkdirs", __dirname + "/fs/mkdirs/index.js");

var nodejsFsUtils	= {
	rmdirs	: mrequire("rmdirs"),
	rmdirsSync	: mrequire("rmdirs").sync,
	mkdirs	: mrequire("mkdirs"),
	mkdirsSync	: mrequire("mkdirs").sync
};
module.exports	= nodejsFsUtils;

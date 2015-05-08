# nodejs-fs-utils

> NodeJs FileSystem (FS) extra utilities

> documentation from **8 may 2015**...

# Instalation


# rmdirs

> optional can be send *fs* module in `"fs"` option

```javascript
    var fsUtils = require("nodejs-fs-utils");

    //removing a folder
    fsUtils.rmdirs("test/folder", function (err) {
        // callback code
    });

    // removing a folder and remove recursive in symbolic links
    // treat the as folders if necessary
    fsUtils.rmdirs("test/folder", function (err) {
        // callback code
    }, {
        symbolicLinks : false
    });
```

# rmdirsSync

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // removing a folder
    // symbolic links will be unlinked instead of removing files from them
    fsUtils.rmdirs("test/folder");

    // removing a folder and remove recursive in symbolic links
    // treat the symbolic links as folders if these links to directories
    fsUtils.rmdirs("test/folder", {
        symbolicLinks : false
    });
```


# mkdirs - build a directory tree

> optional can be send *fs* module in `"fs"` option

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // removing a folder
    // the function will stop an exception on symlink detection
    fsUtils.mkdirs("newfolder/folder/subfolder", function (err) {
        // callback code
    });

    // treat the symbolic links as folders if these links to directories
    fsUtils.rmdirs("newfolder/folder/symbolic-link/subfolder", {
        symbolicLinks : false
    }, function (err) {
        // callback code
    });
```

# mkdirsSync

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // removing a folder
    // the function will throw an exception on symlink detection
    fsUtils.mkdirs("newfolder/folder/subfolder");

    // treat the symbolic links as folders if these links to directories
    fsUtils.rmdirs("newfolder/folder/symbolic-link/subfolder", {
        symbolicLinks : false
    });
```



# fsize - advance file size scan for links folders or files

> optional can be send *fs* module in `"fs"` option

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // return file size
    fsUtils.fsize("videos/video.mp4", function (err, size) {
        // callback code
    });


    // the function will stop on a symlink detection
    fsUtils.fsize("newfolder/folder/subfolder", function (err, size) {
        // callback code
    });


    // treat the symbolic links as folders if these links to directories
    fsUtils.fsize("newfolder/folder/symbolic-link/subfolder", {
        symbolicLinks : false
    }, function (err, size) {
        // callback code
    });


    // don't stop scanning on errors
    fsUtils.fsize("newfolder/folder/symbolic-link/subfolder", {
        skipErrors : true
    }, function (err, size) {
        // callback code
    });


    // don't stop scanning on errors
    // return an array of all errors
    fsUtils.fsize("newfolder/folder/symbolic-link/subfolder", {
        skipErrors  : true,
        logErrors   : true
    }, function (err, size) {
        // callback code
    });


    // don't count folders size
    fsUtils.fsize("newfolder/folder/symbolic-link/subfolder", {
        countFolders    : false
    }, function (err, size) {
        // callback code
    });


    // don't scan links and don't count links size
    fsUtils.fsize("newfolder/folder/symbolic-link/subfolder", {
        countSymbolicLinks  : false
    }, function (err, size) {
        // callback code
    });
```

# fsizeSync - file or folder size sync

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // return file size
    var size = fsUtils.fsizeSync("videos/video.mp4");


    // the function will stop on a symlink detection
    var size = fsUtils.fsizeSync("newfolder/folder/subfolder", function (err, size) {
        // callback code
    });


    // treat the symbolic links as folders if these links to directories
    var size = fsUtils.fsizeSync("newfolder/folder/symbolic-link/subfolder", {
        symbolicLinks : false
    });


    // don't stop scanning on errors
    var config  = { skipErrors : true };
    var size = fsUtils.fsizeSync("newfolder/folder/symbolic-link/subfolder", config);
    if (config.errors.length) {
        console.log("Error detected: ", config.errors[0])
    }


    // don't stop scanning on errors
    // return an array of all errors
    var config  = { skipErrors : true };
    var size = fsUtils.fsizeSync("newfolder/folder/symbolic-link/subfolder", config);
    if (config.errors.length) {
        console.log("Error detected: ", config.errors[0])
    }


    // don't count folders size
    var size = fsUtils.fsizeSync("newfolder/folder/symbolic-link/subfolder", {
        countFolders    : false
    });


    // don't scan links and don't count links size
    var size = fsUtils.fsizeSync("newfolder/folder/symbolic-link/subfolder", {
        countSymbolicLinks  : false
    });
```

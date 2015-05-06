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
    fsUtils.rmdirs("test/folder", {
        symbolicLinks : false
    }, function (err) {
        // callback code
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
    // the function will throw an exception on symlink detection
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

# nodejs-fs-utils

![build-passing](data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIwIiB3aWR0aD0iOTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgyPSIwIiB5Mj0iMTAwJSI+CgkJPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYmJiIiBzdG9wLW9wYWNpdHk9Ii4xIi8+CgkJPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9Ii4xIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPG1hc2sgaWQ9ImEiPgoJCTxyZWN0IGZpbGw9IiNmZmYiIGhlaWdodD0iMjAiIHJ4PSIzIiB3aWR0aD0iOTAiLz4KCTwvbWFzaz4KCTxnIG1hc2s9InVybCgjYSkiPgoJPHBhdGggZD0iTTAgMGg0MHYyMEgweiIgZmlsbD0iIzU1NSIvPgo8cGF0aCBkPSJNNDAgMGg5MHYyMEg0MHoiIGZpbGw9IiM0YzEiLz4KCQk8cGF0aCBkPSJNMCAwaDkwdjIwSDB6IiBmaWxsPSJ1cmwoI2IpIi8+Cgk8L2c+CgkJPGcgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkRlamFWdSBTYW5zLFZlcmRhbmEsR2VuZXZhLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgoJCTx0ZXh0IGZpbGw9IiMwMTAxMDEiIGZpbGwtb3BhY2l0eT0iLjMiIHg9IjIwIiB5PSIxNSI+YnVpbGQ8L3RleHQ+CgkJPHRleHQgeD0iMjAiIHk9IjE0Ij5idWlsZDwvdGV4dD4KCTwvZz4KCTxnIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJEZWphVnUgU2FucyxWZXJkYW5hLEdlbmV2YSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KCQk8dGV4dCBmaWxsPSIjMDEwMTAxIiBmaWxsLW9wYWNpdHk9Ii4zIiB4PSI2NSIgeT0iMTUiPnBhc3Npbmc8L3RleHQ+CgkJPHRleHQgeD0iNjUiIHk9IjE0Ij5wYXNzaW5nPC90ZXh0PgoJPC9nPgo8L3N2Zz4=) ![dependencies: up-to-date](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTgiIGhlaWdodD0iMjAiPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDI9IjAiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYmIiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iLjEiLz48L2xpbmVhckdyYWRpZW50PjxtYXNrIGlkPSJhIj48cmVjdCB3aWR0aD0iMTU4IiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2EpIj48cGF0aCBmaWxsPSIjNTU1IiBkPSJNMCAwaDg4djIwSDB6Ii8+PHBhdGggZmlsbD0iIzRjMSIgZD0iTTg4IDBoNzB2MjBIODh6Ii8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTAgMGgxNTh2MjBIMHoiLz48L2c+PGcgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkRlamFWdSBTYW5zLFZlcmRhbmEsR2VuZXZhLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiPjx0ZXh0IHg9IjQ0IiB5PSIxNSIgZmlsbD0iIzAxMDEwMSIgZmlsbC1vcGFjaXR5PSIuMyI+ZGVwZW5kZW5jaWVzPC90ZXh0Pjx0ZXh0IHg9IjQ0IiB5PSIxNCI+ZGVwZW5kZW5jaWVzPC90ZXh0Pjx0ZXh0IHg9IjEyMiIgeT0iMTUiIGZpbGw9IiMwMTAxMDEiIGZpbGwtb3BhY2l0eT0iLjMiPnVwLXRvLWRhdGU8L3RleHQ+PHRleHQgeD0iMTIyIiB5PSIxNCI+dXAtdG8tZGF0ZTwvdGV4dD48L2c+PC9zdmc+) ![status: stable](data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2288%22%20height%3D%2220%22%3E%3ClinearGradient%20id%3D%22b%22%20x2%3D%220%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23bbb%22%20stop-opacity%3D%22.1%22/%3E%3Cstop%20offset%3D%221%22%20stop-opacity%3D%22.1%22/%3E%3C/linearGradient%3E%3Cmask%20id%3D%22a%22%3E%3Crect%20width%3D%2288%22%20height%3D%2220%22%20rx%3D%223%22%20fill%3D%22%23fff%22/%3E%3C/mask%3E%3Cg%20mask%3D%22url%28%23a%29%22%3E%3Cpath%20fill%3D%22%23555%22%20d%3D%22M0%200h44v20H0z%22/%3E%3Cpath%20fill%3D%22%234c1%22%20d%3D%22M44%200h44v20H44z%22/%3E%3Cpath%20fill%3D%22url%28%23b%29%22%20d%3D%22M0%200h88v20H0z%22/%3E%3C/g%3E%3Cg%20fill%3D%22%23fff%22%20text-anchor%3D%22middle%22%20font-family%3D%22DejaVu%20Sans%2CVerdana%2CGeneva%2Csans-serif%22%20font-size%3D%2211%22%3E%3Ctext%20x%3D%2222%22%20y%3D%2215%22%20fill%3D%22%23010101%22%20fill-opacity%3D%22.3%22%3Estatus%3C/text%3E%3Ctext%20x%3D%2222%22%20y%3D%2214%22%3Estatus%3C/text%3E%3Ctext%20x%3D%2265%22%20y%3D%2215%22%20fill%3D%22%23010101%22%20fill-opacity%3D%22.3%22%3Estable%3C/text%3E%3Ctext%20x%3D%2265%22%20y%3D%2214%22%3Estable%3C/text%3E%3C/g%3E%3C/svg%3E) ![downloads: 3k / month](data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22135%22%20height%3D%2220%22%3E%3ClinearGradient%20id%3D%22b%22%20x2%3D%220%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23bbb%22%20stop-opacity%3D%22.1%22/%3E%3Cstop%20offset%3D%221%22%20stop-opacity%3D%22.1%22/%3E%3C/linearGradient%3E%3Cmask%20id%3D%22a%22%3E%3Crect%20width%3D%22135%22%20height%3D%2220%22%20rx%3D%223%22%20fill%3D%22%23fff%22/%3E%3C/mask%3E%3Cg%20mask%3D%22url%28%23a%29%22%3E%3Cpath%20fill%3D%22%23555%22%20d%3D%22M0%200h70v20H0z%22/%3E%3Cpath%20fill%3D%22%234c1%22%20d%3D%22M70%200h65v20H70z%22/%3E%3Cpath%20fill%3D%22url%28%23b%29%22%20d%3D%22M0%200h135v20H0z%22/%3E%3C/g%3E%3Cg%20fill%3D%22%23fff%22%20text-anchor%3D%22middle%22%20font-family%3D%22DejaVu%20Sans%2CVerdana%2CGeneva%2Csans-serif%22%20font-size%3D%2211%22%3E%3Ctext%20x%3D%2235%22%20y%3D%2215%22%20fill%3D%22%23010101%22%20fill-opacity%3D%22.3%22%3Edownloads%3C/text%3E%3Ctext%20x%3D%2235%22%20y%3D%2214%22%3Edownloads%3C/text%3E%3Ctext%20x%3D%22101.5%22%20y%3D%2215%22%20fill%3D%22%23010101%22%20fill-opacity%3D%22.3%22%3E3k/month%3C/text%3E%3Ctext%20x%3D%22101.5%22%20y%3D%2214%22%3E3k/month%3C/text%3E%3C/g%3E%3C/svg%3E)
> NodeJs FileSystem (FS) extra utilities

## Methods

 * [rmdirs](#rmdirs) - remove a file or folder even it isn't empty ( accept specifying logic for symlinks )
 * [rmdirsSync](#rmdirssync) - _synchronous version of_ **rmdirs**
 * [mkdirs](#mkdirs-build-a-directory-tree) - creates a folder and it parent if it is needed ( accept specifying logic for symlinks )
 * [mkdirsSync](#mkdirssync) - _synchronous version of_ **mkdirs**
 * [emptyDir](#emptydir)         - remove contents of a dir
 * [emptyDirSync](#emptydirsync) - _synchronous version of_ **emptyDir**
 * [isEmpty](#isempty)           - return if file is empty or not
 * [isEmptySync](#isemptysync)   - _synchronous version of_ **isEmpty**
 * [remove](#remove)             - remove file, directory or link
 * [removeSync](#removesync)     - _synchronous version of_ **remove**
     `symbolicLinks` - treat symbolic links as files ( default `true` )
     `skipErrors` - skip errors just log them ( default `false` )
 * [fsize](#fsize-advanced-file-size-scan-for-links-folders-or-files) - count file or folder size, has additional options
     `symbolicLinks` - treat symbolic links as files ( default `true` )
     `countFolders` - counts and folder inode size ( default `true` )
     `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
     `logErrors` - log all error in an array ( default `false` )
     `skipErrors` - skip errors just log them ( default `false` )
 * [fsizeSync](#fsizesync-file-or-folder-size-synchronous) - _synchronous version of_ **fsize**
 * [move](#move)                 - move files or folders
 * [moveSync](#movesync)         - _synchronous version of_ **move**
     `symlinksKeep`      - specify how to treat symlinks
         accepted values: *"file", "directory", "all"*
     `symlinksNormalize` - specify if is needed link normalizing
         accepted values: *"auto", "none", "relative", "absolute"*
     `linkFiles`         - for files linking instead of coping
         accepted values: *"auto", "none", "relative", "absolute"*
     `symbolicLinks` - treat symbolic links as files ( default `true` )
     `countFolders` - counts and folder inode size ( default `true` )
     `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
     `logErrors` - log all error in an array ( default `false` )
     `skipErrors` - skip errors just log them ( default `false` )
 * [copy](#copy)                 - copy files or folders
 * [copySync](#copysync)         - _synchronous version of_ **copy**
     `symlinksKeep`      - specify how to treat symlinks
         accepted values: *"file", "directory", "all"*
     `symlinksNormalize` - specify if is needed link normalizing
         accepted values: *"auto", "none", "relative", "absolute"*
     `linkFiles`         - for files linking instead of coping
         accepted values: *"auto", "none", "relative", "absolute"*
     `symbolicLinks` - treat symbolic links as files ( default `true` )
     `countFolders` - counts and folder inode size ( default `true` )
     `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
     `logErrors` - log all error in an array ( default `false` )
     `skipErrors` - skip errors just log them ( default `false` )
 * [walk](#walk-walk-throuth-files-folder-and-links-advanced-configurations) - walk throuth files, folder and links ( advanced configurations )
 * [walkSync](#walksync-walk-sync-throuth-files-folder-and-links-advanced-configurations) - synchronous version of walk
     * [walk method - examples](#walk-examples)

## rmdirs

> optional can be send *fs* module in `"fs"` option, P.S. it removes link files or directories.

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

    // try to remove, skip errors
    fsUtils.rmdirs("test/folder", function (err) {
        // callback code
    }, {
        skipErrors      : true
    });
```

## rmdirsSync

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // removing a folder
    // symbolic links will be unlinked instead of removing files from them
    fsUtils.rmdirsSync("test/folder");

    // removing a folder and remove recursive in symbolic links
    // treat the symbolic links as folders if these links to directories
    fsUtils.rmdirsSync("test/folder", {
        symbolicLinks : false
    });

    // try to remove, skip errors
    fsUtils.rmdirsSync("test/folder", {
        skipErrors      : true
    });
```


## emptyDir

> remove contents of a directory

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // removing folder's contents
    fsUtils.emptyDir("test/folder", function (err) {
        // callback code
    });
```

## emptyDirSync

> remove contents of a directory, synchronous

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // removing folder's contents
    fsUtils.emptyDirSync("test/folder");
```

## isEmpty

> checks if folder is empty

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // return state = true if folder is empty
    fsUtils.isEmpty("test/folder", function (err, state) {
        // callback code
    });
```

## isEmptySync

> checks if folder is empty, synchronous

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // return state = true if folder is empty
    fsUtils.isEmptySync("test/folder");
```




## mkdirs - build a directory tree

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

## mkdirsSync

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


## remove

> removing file or directories

> similar / alias as [rmdirs](#rmdirs), click [here](#rmdirs) to view.

## removeSync

> removing file or directories

> similar / alias as [rmdirs](#rmdirssync), click [here](#rmdirssync) to view.


## fsize - advanced file size scan for links folders or files

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

## fsizeSync - file or folder size synchronous

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

## move
> move file of folders or links

### options for move function:

- `symlinksNormalize` - specify how to treat symlinks
    specify if is needed link normalizing
    accepted values: `"auto"`, `"none"`, `"relative"`, `"absolute"`
    `"auto"`, `"none"` or `"absolute"`  - uses absolute path
    `"relative"`                        - uses relative paths for links
    **P.S** `"auto"` will be dynamic in future, will try to use relative if it is posible
 -  `symlinksKeep` - specify if is needed to keep simplinks or to move files or folders
    accepted values: *"file", "directory", "all"*
 -  `linkFiles`         - for files linking instead of moving
    accepted values: *"auto", "none", "relative", "absolute"*
 -  `symbolicLinks` - treat symbolic links as files ( default `true` )
 -  `countFolders` - counts and folder inode size ( default `true` )
 -  `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
 -  `logErrors` - log all error in an array ( default `false` )
 -  `skipErrors` - skip errors just log them ( default `false` )
    **P.S.** if is `true` the errors will be an array

### move examples:

### moveSync examples:

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // move file or folders
    fsUtils.move(__dirname + "/source", "./destination-path", function (err, cache) {
        if (!err) {
            console.log("Moved !");
        } else {
            console.error("Error", err)
        }
    });

    // move files and skip errors
    fsUtils.move(__dirname + "/source", "./destination-path", function (errors, cache) {
        if (!errors.length) {
            console.log("Moved !");
        } else {
            errors.forEach(function (err) {
                console.error("Error", err)
            });
        }
    }, {
        skipErrors  : true
    });

```

## moveSync

> synchronous version for move function

### moveSync examples:

```javascript
    var fsUtils = require("nodejs-fs-utils");
    var moveSync    = fsUtils.moveSync;

    // move file or folders
    moveSync(__dirname + "/source", "./destination-path", function (err, cache) {
        if (!err) {
            console.log("Moved !");
        } else {
            console.error("Error", err)
        }
    });

    // move files and skip errors
    moveSync(__dirname + "/source", "./destination-path", function (errors, cache) {
        if (!errors.length) {
            console.log("Moved !");
        } else {
            errors.forEach(function (err) {
                console.error("Error", err)
            });
        }
    }, {
        skipErrors  : true
    });

```

## copy
> copy file of folders or links

### options for copy function:

- `symlinksNormalize` - specify how to treat symlinks
    specify if is needed link normalizing
    accepted values: `"auto"`, `"none"`, `"relative"`, `"absolute"`
    `"auto"`, `"none"` or `"absolute"`  - uses absolute path
    `"relative"`                        - uses relative paths for links
    **P.S** `"auto"` will be dynamic in future, will try to use relative if it is posible
 -  `symlinksKeep` - specify if is needed to keep simplinks or to copy files or folders
    accepted values: *"file", "directory", "all"*
 -  `linkFiles`         - for files linking instead of coping
    accepted values: *"auto", "none", "relative", "absolute"*
 -  `symbolicLinks` - treat symbolic links as files ( default `true` )
 -  `countFolders` - counts and folder inode size ( default `true` )
 -  `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
 -  `logErrors` - log all error in an array ( default `false` )
 -  `skipErrors` - skip errors just log them ( default `false` )
    **P.S.** if is `true` the errors will be an array

### copy examples:

### copySync examples:

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // copy file or folders
    fsUtils.copy(__dirname + "/source", "./destination-path", function (err, cache) {
        if (!err) {
            console.log("Copied !");
        } else {
            console.error("Error", err)
        }
    });

    // copy files and skip errors
    fsUtils.copy(__dirname + "/source", "./destination-path", function (errors, cache) {
        if (!errors.length) {
            console.log("Copied !");
        } else {
            errors.forEach(function (err) {
                console.error("Error", err)
            });
        }
    }, {
        skipErrors  : true
    });

    // link files instead of copying
    fsUtils.copy(__dirname + "/source", "./destination-path", function (err, cache) {
        if (!err) {
            console.log("Files were linked !");
        } else {
            console.error("Error", err)
        }
    }, {
        linkFiles   : "relative"
    });

```

## copySync

> synchronous version for copy function

### copySync examples:

```javascript
    var fsUtils = require("nodejs-fs-utils");
    var copySync    = fsUtils.copySync;

    // copy file or folders
    copySync(__dirname + "/source", "./destination-path", function (err, cache) {
        if (!err) {
            console.log("Copied !");
        } else {
            console.error("Error", err)
        }
    });

    // copy files and skip errors
    copySync(__dirname + "/source", "./destination-path", function (errors, cache) {
        if (!errors.length) {
            console.log("Copied !");
        } else {
            errors.forEach(function (err) {
                console.error("Error", err)
            });
        }
    }, {
        skipErrors  : true
    });

    // link files instead of copying
    copySync(__dirname + "/source", "./destination-path", function (err, cache) {
        if (!err) {
            console.log("Files were linked !");
        } else {
            console.error("Error", err)
        }
    }, {
        linkFiles   : "relative"
    });

```

## walk - walk throuth files folder and links ( advanced configurations )

> optional can be send *fs* module in `"fs"` option
> cache reference can be used for storing data while walking

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // walk througth a list of files and folders in a folder
    fsUtils.walk("./videos", function (err, path, stats, next, cache) {
        // callback code
        // ...
        // stats.isDirectory()
        // 
        // cache.errors is array of errors 
        // continue walk
        next();
    });

    // walk througth a list of files and folders in a folder
    fsUtils.walk("./videos", function (err, path, stats, next, cache) {
        // callback code
        // ...
        // stats.isDirectory()
        // 
        // cache.errors is array of errors 
        // continue walk
        next();
    }, function (cache) {
        console.log("Walk is finished");
    });


    // treat the symbolic links as folders if these links to directories
    fsUtils.walk("newfolder/folder/symbolic-link/subfolder", {
        symbolicLinks : false
    }, function (err, path, stats, next, cache) {
        // callback code
        next();
    });


    // don't stop scanning on errors
    fsUtils.walk("newfolder/folder/symbolic-link/subfolder", {
        skipErrors : true
    }, function (err, path, stats, next, cache) {
        // callback code
        next();
    });


    // don't stop scanning on errors
    // return an array of all errors in cache reference
    fsUtils.walk("newfolder/folder/symbolic-link/subfolder", {
        skipErrors  : true,
        logErrors   : true
    }, function (err, path, stats, next, cache) {
        // callback code
        next();
    }, function (cache) {
        if (cache.errors.length) {
            console.log("Errors: ", cache.errors);
        } else {
            console.log("No errors found");
        }
    });

```

## walkSync - walk sync throuth files folder and links ( advanced configurations )

> `walkSync` has same api as `walk`, but it is synchronous

```javascript
    var fsUtils = require("nodejs-fs-utils");

    // walk througth a list of files and folders in a folder
    fsUtils.walkSync("./videos", function (err, path, stats, next, cache) {
        // callback code
        // ...
        // stats.isDirectory()
        // 
        // cache.errors is array of errors 
        // continue walk
        next();
    });

    // walk througth a list of files and folders in a folder
    fsUtils.walkSync("./videos", function (err, path, stats, next, cache) {
        // callback code
        // ...
        // stats.isDirectory()
        // 
        // cache.errors is array of errors 
        // continue walk
        next();
    }, function (cache) {
        console.log("Walk is finished");
    });


    // treat the symbolic links as folders if these links to directories
    fsUtils.walkSync("newfolder/folder/symbolic-link/subfolder", {
        symbolicLinks : false
    }, function (err, path, stats, next, cache) {
        // callback code
        next();
    });


    // don't stop scanning on errors
    fsUtils.walkSync("newfolder/folder/symbolic-link/subfolder", {
        skipErrors : true
    }, function (err, path, stats, next, cache) {
        // callback code
        next();
    });


    // don't stop scanning on errors
    // return an array of all errors in cache reference
    fsUtils.walkSync("newfolder/folder/symbolic-link/subfolder", {
        skipErrors  : true,
        logErrors   : true
    }, function (err, path, stats, next, cache) {
        // callback code
        next();
    }, function (cache) {
        if (cache.errors.length) {
            console.log("Errors: ", cache.errors);
        } else {
            console.log("No errors found");
        }
    });
```

## walk - examples

> getArray of folders in a array

```javascript
    var fsUtils = require("nodejs-fs-utils");
    // getArray of folders in a array
    var folders = [];
    fsUtils.walkSync("newfolder/folder/symbolic-link/subfolder", {
        skipErrors  : true,
        logErrors   : true
    }, function (err, path, stats, next, cache) {
        if (!err && stats.isDirectory()) {
            folders.push(path);
        }
        next();
    });
```

> remove folders with name "tmp"

```javascript
    var fsUtils = require("nodejs-fs-utils");
    var fs      = require("fs");

    // synchronous
    fsUtils.walkSync("newfolder/folder/symbolic-link/subfolder", {
        skipErrors  : true,
        logErrors   : true
    }, function (err, path, stats, next, cache) {
        if (!err && stats.isDirectory() && path.match(/\/tmp$/)) {
            fs.unlinkSync(path);
        } else {
            next();
        }
    });

    // asynchronous
    fsUtils.walk("newfolder/folder/symbolic-link/subfolder", {
        skipErrors  : true,
        logErrors   : true
    }, function (err, path, stats, next, cache) {
        if (!err && stats.isDirectory() && path.match(/\/tmp$/)) {
            fs.unlinkSync(path);

            // for async to tell that step is done
            // without this row onend callback will not be trigered
            cache.count++;
        } else {
            next();
        }
    }, function (cache) { // optional
        console.log("Finished")
    });
```
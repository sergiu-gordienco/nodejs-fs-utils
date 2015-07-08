# nodejs-fs-utils

> NodeJs FileSystem (FS) extra utilities

![build-passing](https://img.shields.io/badge/build-passing-brightgreen.svg) ![dependencies: up-to-date](https://img.shields.io/badge/dependencies-up--to--date-brightgreen.svg) ![status: stable](https://img.shields.io/badge/status-stable-brightgreen.svg) ![downloads: 3k / month](https://img.shields.io/badge/downloads-3k%2Fmonth-brightgreen.svg)

![mail-sergiu.gordienco@gmail.com](https://img.shields.io/badge/author-sergiu.gordienco@gmail.com-blue.svg)

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
    - `symbolicLinks` - treat symbolic links as files ( default `true` )
    - `skipErrors` - skip errors just log them ( default `false` )
 * [fsize](#fsize-advanced-file-size-scan-for-links-folders-or-files) - count file or folder size, has additional options
    - `symbolicLinks` - treat symbolic links as files ( default `true` )
    - `countFolders` - counts and folder inode size ( default `true` )
    - `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
    - `logErrors` - log all error in an array ( default `false` )
    - `skipErrors` - skip errors just log them ( default `false` )
 * [fsizeSync](#fsizesync-file-or-folder-size-synchronous) - _synchronous version of_ **fsize**
 * [move](#move)                 - move files or folders
 * [moveSync](#movesync)         - _synchronous version of_ **move**
    - `symlinksKeep`      - specify how to treat symlinks
        -     accepted values: *"file", "directory", "all"*
    - `symlinksNormalize` - specify if is needed link normalizing
        -     accepted values: *"auto", "none", "relative", "absolute"*
    - `linkFiles`         - for files linking instead of coping
        -     accepted values: *"auto", "none", "relative", "absolute"*
    - `symbolicLinks` - treat symbolic links as files ( default `true` )
    - `countFolders` - counts and folder inode size ( default `true` )
    - `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
    - `logErrors` - log all error in an array ( default `false` )
    - `skipErrors` - skip errors just log them ( default `false` )
 * [copy](#copy)                 - copy files or folders
 * [copySync](#copysync)         - _synchronous version of_ **copy**
    - `symlinksKeep`      - specify how to treat symlinks
        -     accepted values: *"file", "directory", "all"*
    - `symlinksNormalize` - specify if is needed link normalizing
    -     accepted values: *"auto", "none", "relative", "absolute"*
    - `linkFiles`         - for files linking instead of coping
        -     accepted values: *"auto", "none", "relative", "absolute"*
    - `symbolicLinks` - treat symbolic links as files ( default `true` )
    - `countFolders` - counts and folder inode size ( default `true` )
    - `countSymbolicLinks` - counts symbolic links inode size ( default `true` )
    - `logErrors` - log all error in an array ( default `false` )
    - `skipErrors` - skip errors just log them ( default `false` )
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
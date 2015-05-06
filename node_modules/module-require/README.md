# nodejs-module-require

> nodejs-module-require is a custom module loader

returns a {function} that is loading classes and storing them in a object,
also giving some extra functionalities

## How to use:

```javascript
	var mrequire	= require("module-require");
```

### Loading express library

```javascript
	var express	= mrequire("express");
```

### Loading a custom module and use it with a short name

```javascript
	// loading module
	mrequire("myChoosedModuleName1", "http://www......./file.js");

	// use custom module
	var m1	= mrequire("myChoosedModuleName");
```
>	also can be used relative source "./file.js"

### Link a nodejs module with onother name

```javascript
	// link "express" server to "server-module"
	mrequire("server-module", "express");
	// Using renamed module
	var server	= mrequire("server-module");
```


### Prepare a nodejs custom module with a function

```javascript
	// prepare a express server instance and store it as mrequire("express-server");
	mrequire("express-server", function (mrequire, library) {
		// library is "express-server"
		var express = require('express');
		var cookieParser = require('cookie-parser');
		
		var app = express();
		app.use(cookieParser());

		app.get('/', function(req, res) {
			console.log("Cookies: ", req.cookies)
		});

		return app;
	});
	
	// using our server
	mrequire("express-server").get('/', function(req, res) {
		console.log("Cookies: ", req.cookies);
	});
	mrequire("express-server").listen(8080);
```


### Prepare a nodejs custom module constructor with a function

```javascript
	// prepare a express server instance and store it as mrequire("express-server");
	mrequire("express-server-builder", function (mrequire, library) {
		return function () {
			// library is "express-server"
			var express = require('express');
			var cookieParser = require('cookie-parser');
			
			var app = express();
			app.use(cookieParser());

			app.get('/', function(req, res) {
				console.log("Cookies: ", req.cookies)
			});

			return app;
		}
	});
	
	// build server-1 instance using our server builder
	mrequire("server-1", function (mrequire) {
		return mrequire("express-server-builder")();
	});

	// build server-2 instance using our server builder
	mrequire("server-2", function (mrequire) {
		return mrequire("express-server-builder")();
	});

	// user server 1
	mrequire("server-1").get('/', function(req, res) {
		console.log(" Server 1 » Cookies: ", req.cookies);
	});
	mrequire("server-1").listen(8080);


	// user server 2
	mrequire("server-2").get('/', function(req, res) {
		console.log(" Server 2 » Cookies: ", req.cookies);
	});
	mrequire("server-2").listen(8181);
```
/**
 * Classes loader
 * @return {function}   that is loading classes and storing thwem in a object
 *
 * How to use:
 *
 * Loading express library
 * 		__classes("express")
 *
 * Loading a custom module
 * 		__classes("myChoosedModuleName", "http://.w....../file.js");
 * Using curtom module
 * 		__classes("myChoosedModuleName");
 *
 * Link a nodejs module with onother name
 * 		__classes("server-module", "express");
 * Using renamed module
 * 		__classes("server-module")
 */
var __classes	= ((function () {
	var __cache	= {};
	var __load	= function (library, library_source) {
		if (library === true) {
			if (!library_source)
				return __cache;
		} else {
			if (!(library in __cache)) {
				if (typeof(library_source) === "function") {
					__cache[library]	= library_source(__load, library);
				} else {
					__cache[library]	= require(library_source || library);
				}
			}
			return __cache[library];
		}
	};
	return __load;
})());

if (typeof(module) === "object" && module) {
	module.exports	= __classes;
}

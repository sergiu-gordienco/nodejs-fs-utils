var fsu	= require("./index.js");

fsu.removeSync('dtest', {
	skipErrors	: true
});
fsu.removeSync('dtest-moved', {
	skipErrors	: true
});
fsu.removeSync('dtest-sync', {
	skipErrors	: true
});
fsu.removeSync('dtest-sync-moved', {
	skipErrors	: true
});

fsu.copy('./node_modules', './dtest', function (err) {
	if (err) {
		console.error(err);
	} else {
		console.log('[dtest] copied...');
		fsu.move('./dtest', './dtest-moved', function (err) {
			if (err) {
				console.error(err);
			} else {
				console.log('[dtest] moved...');
				fsu.fsize('./dtest-moved', function (err, size) {
					if (err) {
						console.error(err);
					} else {
						console.log('dtest-sync-moved Size:', size);
						fsu.remove('dtest-moved', function (err) {
							if (err) {
								console.error(err);
							} else {
								console.log('[dtest-moved] removed...');
								fsu.createFile("dtest-moved/file", function (err) {
									if (err) {
										console.error(err);
									} else {
										console.log("[dtest-moved/file] created file...");
										fsu.isEmpty('dtest-moved', function (err, state) {
											if (err) {
												console.log(err);
											} else {
												console.log('[dtest-moved] isEmpty ? ', state);
												fsu.emptyDir('dtest-moved', function (err) {
													if (err) {
														console.log(err);
													} else {
														console.log('[dtest-moved] removed contents using emptydir...');
														fsu.isEmpty('dtest-moved', function (err, state) {
															if (err) {
																console.log(err);
															} else {
																console.log('[dtest-moved] isEmpty ? ', state);
																fsu.remove('dtest-moved', function (err) {
																	if (err) {
																		console.error(err);
																	} else {
																		console.log("dtest-moved removed...");
																	}
																});
															}
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	}
});
var err;
try {
	fsu.copySync('./node_modules', './dtest-sync', function (err) {
		if (err) {
			console.error(err);
		} else {
			console.log('[dtest] copied...');
		}
	});
	fsu.moveSync('./dtest-sync', './dtest-sync-moved', function (err) {
		if (err) {
			console.error(err);
		} else {
			console.log('[dtest] moved...');
		}
	});
	console.log('dtest-sync-moved Size:', fsu.fsizeSync('dtest-sync-moved'));

	fsu.removeSync('dtest-sync-moved');
	console.log('[dtest-sync-moved] removed...');

	fsu.createFileSync("dtest-sync-moved/file");
	console.log("[dtest-sync-moved/file] created file...");
	console.log('[dtest-sync-moved] isEmpty ? ', fsu.isEmptySync('dtest-sync-moved'));

	fsu.emptyDirSync('dtest-sync-moved');
	console.log('[dtest-sync-moved] removed contents using emptydir...');
	console.log('[dtest-sync-moved] isEmpty ? ', fsu.isEmptySync('dtest-sync-moved'));
	fsu.removeSync('dtest-sync-moved');
	console.log("dtest-sync-moved removed...")
} catch (err) {
	console.error(err);
}

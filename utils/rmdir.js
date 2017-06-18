const fs = require("fs");

var
	rmdir = function (target, parent) {

		var path = parent ? parent + "\\" + target : target;

		console.log(path);

		if (!fs.existsSync(path)) {
			console.log('path "' + path + '" does not exist.')
			return;
		}

		var stat = fs.statSync(path);

		if (stat.isFile()) {
			fs.unlinkSync(path);
			return;
		}

		if (stat.isDirectory()) {

			var items = fs.readdirSync(path);

			items.forEach(function (item) {
				rmdir(item, path);
			});

			fs.rmdirSync(path);
		}
	};

exports.sync = rmdir;

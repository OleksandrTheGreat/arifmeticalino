const fs = require('fs');

var
	mkdir = function(path){
		
		if (fs.existsSync(path))
			return;
		
		fs.mkdirSync(path);
	},
	
	mkdirs = function(parts, parent){
		
		if (!parts || !parts.length)
			return;
	
		var path = parent ? parent + "\\" + parts[0] : parts[0];
	
		mkdir(path);
	
		if (parts.length == 1)
			return;
		
		mkdirs(parts.slice(1), path);		
	},
	
	sync = function(path){
		
		var parts = path.replace(/\\/g, "/").split("/");
		
		mkdirs(parts);
	};
	
exports.sync = sync	;

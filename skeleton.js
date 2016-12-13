var fs = require('fs');
var skeleton = ['./scr', './scr/scripts', './scr/styles', './scr/fonts', './scr/views'];


/*
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
*/

create_skeleton();

function create_skeleton() {
	//forEach, implicit parameters item, index, array
	skeleton.forEach(function(item) {
		if (!fs.existsSync(item)) {
			fs.mkdirSync(item);
		}
	});

}

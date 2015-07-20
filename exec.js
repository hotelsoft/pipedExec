var studentData = [
	{"name": "akash", "marks": {"hindi": 98, "english": 90, "math": 81, "programming": 56}},
	{"name": "narendra", "marks": {"hindi": 64, "english": 40, "math": 88, "programming": 75}},
	{"name": "deepak", "marks": {"hindi": 28, "english": 32, "math": 31, "programming": 79}},
	{"name": "chetan", "marks": {"hindi": 48, "english": 98, "math": 47, "programming": 44}},
	{"name": "ravi", "marks": {"hindi": 55, "english": 6, "math": 56, "programming": 30}},
	{"name": "mahesh", "marks": {"hindi": 98, "english": 41, "math": 58, "programming": 75}},
	{"name": "narendra", "marks": {"hindi": 64, "english": 40, "math": 88, "programming": 75}},
	{"name": "deepak", "marks": {"hindi": 28, "english": 32, "math": 31, "programming": 79}}
];


var vm = require('vm');

var fs = require('fs');

function executeFiles(filesName, context) {
	fs.readFile(filesName, function (err, data) {
		if (err) throw err;
		var code = data.toString();
		console.log(vm.runInNewContext(code, context));
	});
}


function RunTask(dir, studentData) {
	console.log("req", studentData.length);
	var context = {
		console: console,
		require: require,
		executor: {
			data: studentData,
			onceDataAvailable: function (res) {
				console.log("res", res.length)
			}
		}
	};
	fs.readdir(__dirname + "/" + dir, function (err, files) {
		if (err) return;

		var taskFiles = [];
		files.forEach(function (f) {
			console.log('Files: ' + f);
			//run files
			taskFiles.push(dir + "/" + f);

		});

		executeFiles(taskFiles, context);
	});
}

console.log(RunTask("./tasks", studentData));
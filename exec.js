var SerialRunner = require("./SerialRunner.js");

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


function RunTask(dir, studentData) {
	console.log("Input Data -> ", studentData);
	var context = {
		console: console,
		executor: {
			data: studentData
		}
	};
	var runner = new SerialRunner({
		dir: dir,
		context: context,
		callback: function (err, finalData) {
			if (err) {
				//something fails
				return console.log(err);
			}
			//All data comes
			console.log("============");
			console.log("Topper details is -> ", finalData);
		}
	});
	runner.start();
}

RunTask("./tasks", studentData);
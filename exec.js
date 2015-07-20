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
		vm.runInNewContext(code, context);
	});
}

//This is kind of async reducer !

function SerialRunner(Obj) {
	this.currentIndex = -1;
	this.run = Obj.run;
	this.initialData = Obj.initialData;
	this.callback = Obj.callback;
	this.dir = Obj.dir;
};

SerialRunner.prototype = {
	constructor: SerialRunner,
	next: function (inData, callback) {
		var self = this;
		this.currentIndex = this.currentIndex + 1;
		if (this.currentIndex <= this.list.length) {
			this.run(this.list[this.currentIndex], inData, function (err, outData) {
				//Success Handler
				if (err) {
					callback(err);
				}
				if (self.currentIndex + 1 === self.list.length) {
					//It is the last is the chain
					callback(null, outData);

				} else {
					//or Pass to next script.
					self.next(outData, callback);
				}
			});
		}
		return inData;
	},
	start: function () {
		var self = this;
		fs.readdir(__dirname + "/" + this.dir, function (err, files) {
			if (err) return;
			var taskFiles = [];
			files.forEach(function (f) {
				taskFiles.push(self.dir + "/" + f);
			});
			self.list = taskFiles;
			self.next(self.initialData, self.callback);
		});
	}
};

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
		initialData: studentData,
		run: function (fileName, inData, callback) {
			context.executor.data = inData;
			context.executor.callback = callback;
			executeFiles(fileName, context);
		},
		callback: function (err, finalData) {
			if (err) {
				//something fails
				console.log(err);
			}
			//All data comes
			console.log("============");
			console.log("Topper details is -> ", finalData);
		}
	});
	runner.start();
}

RunTask("./tasks", studentData);
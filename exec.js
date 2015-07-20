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
	this.list = Obj.list;
	this.run = Obj.run;
	this.initialData = Obj.initialData;
	this.successCallback = Obj.success;
	this.failCallback = Obj.fail;
};

SerialRunner.prototype = {
	constructor: SerialRunner,
	next: function (inData, successCallback, failCallback) {
		var self = this;
		this.currentIndex = this.currentIndex + 1;
		if (this.currentIndex <= this.list.length) {
			this.run(this.list[this.currentIndex], inData, function (outData) {
				//Success Handler
				if (self.currentIndex + 1 === self.list.length) {
					//It is the last is the chain
					successCallback(outData);

				} else {
					//or Pass to next script.
					self.next(outData, successCallback, failCallback);
				}

			}, function (ex) {
				//Failure
				failCallback(ex);
			});
		}
		return inData;
	},
	start: function () {
		this.next(this.initialData, this.successCallback, this.failCallback);
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
	fs.readdir(__dirname + "/" + dir, function (err, files) {
		if (err) return;
		var taskFiles = [];
		files.forEach(function (f) {
			taskFiles.push(dir + "/" + f);
		});

		var runner = new SerialRunner({
			list: taskFiles,
			initialData: studentData,
			run: function (fileName, inData, successCallback, failCallback) {
				context.executor.data = inData;
				context.executor.successCallback = successCallback;
				context.executor.failCallback = failCallback;
				executeFiles(fileName, context);
			},
			success: function (finalData) {
				//All data comes
				console.log("============");
				console.log("Topper details is -> ", finalData);
			},
			fail: function (ex) {
				//something fails
				console.log(ex);
			}
		});
		runner.start();
	});
}

RunTask("./tasks", studentData);
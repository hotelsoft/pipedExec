var vm = require('vm');
var fs = require('fs');

//This is kind of async reducer !


function executeFiles(filesName, context) {
	fs.readFile(filesName, function (err, data) {
		if (err) throw err;
		var code = data.toString();
		vm.runInNewContext(code, context);
	});
}


function SerialRunner(Obj) {
	this.currentIndex = -1;
	this.run = Obj.run;
	this.initialData = Obj.initialData;
	this.callback = Obj.callback;
	this.dir = Obj.dir;
	this.context = Obj.context;
};

SerialRunner.prototype = {
	constructor: SerialRunner,
	next: function (inData, callback) {
		var self = this;
		this.currentIndex = this.currentIndex + 1;
		if (this.currentIndex <= this.list.length) {
			var c = function (err, outData) {
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
			};
			//this.run(this.list[this.currentIndex], inData, c);

			this.context.executor.data = inData;
			this.context.executor.callback = c;
			executeFiles(this.list[this.currentIndex], this.context);
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
			self.next(self.context.executor.data, self.callback);
		});
	}
};

module.exports = SerialRunner;
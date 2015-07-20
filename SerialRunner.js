var vm = require('vm');
var fs = require('fs');

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

module.exports = SerialRunner;
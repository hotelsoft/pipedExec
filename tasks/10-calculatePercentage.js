// It accept array of Objects. It remove Duplicates
function calculatePercentage(data) {
	var newData = [];
	data.map(function (v, i) {
		var v = JSON.parse(JSON.stringify(v));
		var total = 0;
		Object.keys(v.marks).map(function (key, i) {
			total = total + v.marks[key];
		});
		v.total = total;
		newData.push(v);
	});
	return newData;
};
if (module === undefined) {
	var module = {};
}
module.exports = {
	execute: function () {
		try {
			var data1 = calculatePercentage(executor.data);
			executor.successCallback(data1);
		} catch (ex) {
			executor.failCallback(ex);
			//throw ex;
		}
	}
};
module.exports.execute();
// It accept array of Objects. It remove Final Topper Student
function findTopper(data) {
	var highestTotalIndex = 0;
	data.map(function (v, i, A) {
		if (v.total > A[highestTotalIndex].total) {
			highestTotalIndex = i;
		}
	});
	return JSON.parse(JSON.stringify(data[highestTotalIndex]));
};

if (module === undefined) {
	var module = {};
}
module.exports = {
	execute: function () {
		try {
			var data1 = findTopper(executor.data);
			executor.successCallback(data1);
		} catch (ex) {
			executor.failCallback(ex);
			//throw ex;
		}
	}
};
module.exports.execute();
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

(function () {
	try {
		var data1 = findTopper(executor.data);
		executor.callback(null, data1);
	} catch (ex) {
		executor.callback(ex);
		//throw ex;
	}
})();
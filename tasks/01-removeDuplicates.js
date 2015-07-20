// It accept array of Objects. It remove duplicate entries based on identical name;
function removeDuplicate(data) {
	var newData = [];
	var keys = {};
	data.map(function (v, i) {
		if (keys[v.name] === undefined) {
			keys[v.name] = "";
			newData.push(v);
		}
	});
	return newData;
};
if (module === undefined) {
	var module = {};
}
module.exports = {
	execute: function () {
		try {
			/*global.console.log = function () {
			 break;
			 };*/

			var data1 = removeDuplicate(executor.data);
			executor.callback(null, data1);
		} catch (ex) {
			executor.callback(ex);
			//throw ex;
		}
	}
};

module.exports.execute();